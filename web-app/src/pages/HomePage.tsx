import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { callApiLogout } from "../api/account";
import { callCreateOrder } from "../api/payment";
import { ApiCreateOrderParam, Currency } from "../api/types";
import {
  IconAccountCircle,
  IconLogout,
  IconMyService,
  IconSelectCard,
  IconService,
  IconThreeLines,
  IconUser
} from "../components/icons";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useClickOutside } from "../hooks-ui/useClickOutside";
import { PageLayoutLeftSideTab, TabOption } from "../layouts/PageLayoutLeftSideTab";
import { removeAuthInfo } from "../services-business/api/authentication";
import { generateTransactionId } from "../services-business/api/generate-api-param/payment";
import { RoutePaths } from "./router";

type HomeTab = 'services' | 'myServices' | 'myAccount'
const TabOptionGroup: Record<HomeTab, TabOption> = {
  services: {
    iconElement: <IconService/>,
    label: 'Services',
  },
  myServices: {
    iconElement: <IconMyService/>,
    label: 'My Services',
  },
  myAccount: {
    iconElement: <IconAccountCircle/>,
    label: 'My Account',
  },
}

export function HomePage() {
  const translation = useTranslation()
  const navigate = useNavigate()
  const {user, removeAuthUser} = useContext(AuthContext)
  const [tabSelected, setTabSelected] = useState<TabOption["label"]>(TabOptionGroup.services.label)
  const openCallerRef = useRef<()=>void>(()=>{})
  const [isShowAccountPopup, setIsShowAccountPopup] = useState<boolean>(false)
  const ref = useClickOutside(() => setIsShowAccountPopup(false));

  function handleChangeTab(tabLabel: TabOption["label"]) {
    setTabSelected(tabLabel)
  }

  function handleClickAccountOnPopUp() {
    handleChangeTab(TabOptionGroup.myAccount.label)
    setIsShowAccountPopup(false)
  }

  function handleClickLogout() {
    navigate(RoutePaths.login)
    callApiLogout().catch(e => console.error(e))
    removeAuthInfo()
    removeAuthUser()
  }

  return <div className="w-screen h-screen bg-cover flex flex-col">
    <PageLayoutLeftSideTab tabOptions={Object.values(TabOptionGroup)} onClickTabOption={handleChangeTab} tabSelected={tabSelected} openCallerRef={openCallerRef}>
      <div className={"w-full h-full flex flex-col"}>
        <div className={"w-full h-20 shrink-0 bg-white flex justify-between sm:justify-end items-center px-6"}>
          <IconThreeLines className={"block sm:hidden w-5 h-5 cursor-pointer"} onClick={openCallerRef.current} />
          <IconAccountCircle className={"w-10 h-10 cursor-pointer"} onClick={setIsShowAccountPopup.bind(undefined, value => !value)} />
        </div>
        <div className={"w-full flex grow relative overflow-y-scroll"}>
          {isShowAccountPopup && <div ref={ref} className={"absolute top-3 right-8 flex flex-col gap-3 items-center bg-[#E9EEF6] rounded-3xl p-3"}>
            <p className={"text-gray-700 text-cLg"}>{user?.email}</p>
            <IconAccountCircle className={"w-14 h-14 mb-3"}/>
            <p className={"font-bold text-cLg"}>{translation.t("Hello")} {user?.lastName},</p>
            <div onClick={handleClickAccountOnPopUp} className={"flex flex-row gap-2 w-[290px] bg-white px-6 py-4 mt-3 rounded-xl cursor-pointer"}>
              <IconUser />
              <span className={"font-bold"}>{translation.t("Account")}</span>
            </div>
            <div onClick={handleClickLogout} className={"flex flex-row gap-2 w-[290px] bg-white px-6 py-4 rounded-xl cursor-pointer"}>
              <IconLogout/>
              <span className={"font-bold"}>{translation.t("Log out")}</span>
            </div>
          </div>}
          {tabSelected === TabOptionGroup.services.label && <ServicesContent />}
          {tabSelected === TabOptionGroup.myServices.label && <MyServicesContent />}
          {tabSelected === TabOptionGroup.myAccount.label && <MyAccountContent />}
        </div>
      </div>
    </PageLayoutLeftSideTab>
  </div>
}

type Service = {
  id: string,
  label: string,
  description: string,
  agents: string[],
  price: number,
  currency: Currency,
}
const Services: Service[] = [
  {
    id: '1',
    label: "LLC Formation desk",
    description: "Service Description",
    agents: ['Registered Agent', 'Registered Agent', 'Registered Agent'],
    price: 5.99,
    currency: 'USD'
  },
  {
    id: '2',
    label: "LLC Formation desk",
    description: "Service Description",
    agents: ['Registered Agent', 'Registered Agent', 'Registered Agent'],
    price: 6.99,
    currency: 'USD'
  },
  {
    id: '3',
    label: "LLC Formation desk",
    description: "Service Description",
    agents: ['Registered Agent', 'Registered Agent', 'Registered Agent'],
    price: 7.99,
    currency: 'USD'
  },
]

function ServicesContent() {
  const translation = useTranslation()
  const {user} = useContext(AuthContext)
  const [bunchOfServiceIdSelected, setBunchOfServiceIdSelected] = useState<string[]>([])
  const [stepIndex, setStepIndex] = useState<number>(1)
  const [errorMessageConfirm, setErrorMessageConfirm] = useState<string | undefined>()

  const SelectServiceStepIndex = 1
  const PayServiceStepIndex = 2

  function handleSelectService(id: string) {
    if (!bunchOfServiceIdSelected.includes(id)) {
      setBunchOfServiceIdSelected(bunchOfServiceIdSelected.concat([id]))
    } else {
      setBunchOfServiceIdSelected(bunchOfServiceIdSelected.filter(i => i != id))
    }
  }

  function handleClickProceedPayment() {
    setStepIndex(PayServiceStepIndex)
  }

  async function handleClickPaypalConfirm() {
    if (!user) {
      return
    }
    const body: ApiCreateOrderParam = {
      transactionId: generateTransactionId(user.email),
      currency: 'USD',
      amount: totalPrice,
      orderType: "PAYPAL"
    }
    try {
      const rawResult = await callCreateOrder(body)
      console.log('handleClickPaypalConfirm: ', rawResult)
    } catch (e: unknown) {
      setErrorMessageConfirm(e?.toString())
      console.error(e)
    }
  }

  function handleClickFinishPayment() {

  }

  const hasSelected = bunchOfServiceIdSelected.length > 0
  const selectedService = Services.filter(service => bunchOfServiceIdSelected.includes(service.id))
  let totalPrice = 0
  Services.forEach(service => totalPrice += service.price)
  return <div className={"w-full grow flex flex-col"}>
    <div className={"flex p-3 grow overflow-hidden"}>
      {stepIndex === SelectServiceStepIndex && <div className={"p-6 bg-white rounded grow overflow-y-scroll space-y-8"}>
        <div className={"text-cXl w-full text-start"}>{translation.t("Since you launch your new LLC in")} <span
          className={"text-cLg font-bold text-primary"}>{user?.llcInNation || 'United States'}</span> <span
          className={"text-h4"}>...</span></div>
        <div className={"flex flex-col gap-3"}>
          {Services.map(service =>
            <ServiceCard isSelected={bunchOfServiceIdSelected.includes(service.id)} service={service}
                         onSelect={handleSelectService}/>
          )}
        </div>
      </div>}
      {stepIndex === PayServiceStepIndex && <div className={"flex grow gap-3"}>
        <div className={"w-1/2 flex flex-col bg-white grow rounded-lg overflow-hidden"}>
          <div className={"p-6 grow flex gap-8 flex-col"}>
            <div className={"flex flex-col gap-y-2 w-fit"}>
              <p className={"text-cXl font-bold"}>{translation.t('Order summary')}</p>
              <div className={"h-[2px] bg-black w-1/2"}></div>
            </div>
            {selectedService.map((service, index) => <div className={"flex justify-between"}>
              <span className={"space-x-2"}><span>{index + 1}.</span><span>{service.label}</span></span>
              <span className={"text-orange text-cLg font-bold"}>{service.currency}{service.price}</span>
            </div>)}
          </div>
          <div className={"bg-primary_light p-6 font-bold flex justify-between items-center"}>
            <p className={""}>{translation.t('Total in')}: </p>
            <p className={"text-h4"}>{totalPrice}</p>
          </div>
        </div>
        <div className={"w-1/2 bg-white grow rounded-lg flex"}>
          <div className={"p-6 grow flex flex-col"}>
            <div className={"flex flex-col gap-y-2 w-fit"}>
              <p className={"text-cXl font-bold"}>{translation.t('Please select a payment method')}</p>
              <div className={"h-[2px] bg-black w-1/2"}></div>
            </div>
            <div className={"flex grow justify-center items-center"}>
              <button
                disabled={!hasSelected}
                className={"flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 bg-primary"}
                onClick={handleClickPaypalConfirm}
              >
                <span>{translation.t('Confirm')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
    <div className={"w-full flex justify-end py-5 pr-8 bg-white"}>
      {stepIndex === SelectServiceStepIndex && <button
        disabled={!hasSelected}
        className={"flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 " + (hasSelected ? "bg-primary" : "bg-gray-500")}
        onClick={handleClickProceedPayment}
      >
        <span>{translation.t('Proceed payment')}</span>
      </button>}
      {stepIndex === PayServiceStepIndex && <button
        disabled={!hasSelected}
        className={"flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 " + (hasSelected ? "bg-primary" : "bg-gray-500")}
        onClick={handleClickFinishPayment}
      >
        <span>{translation.t('Finish payment')}</span>
      </button>}
    </div>
  </div>
}

type ServiceCardProps = {
  isSelected: boolean,
  service: Service,
  onSelect: (id: string) => void
}

function ServiceCard(props: ServiceCardProps) {
  return <div
    className={"w-full flex cursor-pointer border rounded-2xl " + (props.isSelected ? 'border-primary' : 'border-gray-300')}
    onClick={props.onSelect.bind(undefined, props.service.id)}
  >
    <div className={"w-[52px] shrink-0"}>
      {props.isSelected && <IconSelectCard className={"translate-y-[-1px]"} />}
    </div>
    <div className={"flex flex-col grow py-6 gap-3"}>
      <p className={"text-cLg font-bold"}>{props.service.label}</p>
      <p className={""}>{props.service.description}</p>
      <ul className={"flex gap-12 list-disc text-violet pl-8"}>
        {props.service.agents.map(agent => <li><span>{agent}</span></li>)}
      </ul>
    </div>
    <div className={"p-6 text-orange flex items-center justify-center"}>
      <span className={"text-cXl font-bold"}>{props.service.currency}{props.service.price}</span>
    </div>
  </div>
}

function MyServicesContent() {
  return <>
    <div>My Services Content</div>
  </>
}

function MyAccountContent() {
  return <>
    <div>My Account Content</div>
  </>
}
