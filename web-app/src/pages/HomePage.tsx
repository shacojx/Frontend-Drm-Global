import { ChangeEvent, useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  callApiChangeUserPassword,
  callApiChangeUserProfile,
  callApiLogout
} from "../api/account";
import { callCreateOrder } from "../api/payment";
import { ApiChangeUserPassword, ApiChangeUserProfile, ApiCreateOrderParam, Currency } from "../api/types";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { FormFieldPassword } from "../components/FormFieldPassword";
import { FormFieldPhoneNumber } from "../components/FormFieldPhoneNumber";
import { FormFieldText } from "../components/FormFieldText";
import {
  IconAccountCircle,
  IconCheck, IconDangerCircle,
  IconLogout, IconMyCompany,
  IconMyService, IconRefreshCircle,
  IconSelectCard,
  IconService,
  IconSpinner,
  IconThreeLines, IconUpload, IconUploadFile,
  IconUser, IconX
} from "../components/icons";
import { NATION_INFOS } from "../constants/SelectionOptions";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useClickOutside } from "../hooks-ui/useClickOutside";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { PageLayoutLeftSideTab, TabOption } from "../layouts/PageLayoutLeftSideTab";
import { removeAuthInfo } from "../services-business/api/authentication";
import { extractPhone, generatePhone, RNPhoneValue } from "../services-business/api/generate-api-param/account";
import { generateTransactionId } from "../services-business/api/generate-api-param/payment";
import { FormStatus } from "../types/common";
import { RoutePaths } from "./router";

type HomeTab = 'services' | 'myServices' | 'myCompany'
type HomeContent = HomeTab | 'myAccount' | 'KYCUpload'
const TabOptionGroup: Record<HomeTab, TabOption<HomeTab>> = {
  services: {
    iconElement: <IconService/>,
    id: "services",
    label: 'Services',
  },
  myServices: {
    id: "myServices",
    iconElement: <IconMyService/>,
    label: 'My Services',
  },
  myCompany: {
    id: "myCompany",
    iconElement: <IconMyCompany />,
    label: 'My Company',
  },
}

export function HomePage() {
  const translation = useTranslation()
  const navigate = useNavigate()
  const {user, removeAuthUser} = useContext(AuthContext)
  const [homeContent, setHomeContent] = useState<HomeContent>('myAccount')
  const openCallerRef = useRef<()=>void>(()=>{})
  const [isShowAccountPopup, setIsShowAccountPopup] = useState<boolean>(false)
  const ref = useClickOutside(() => setIsShowAccountPopup(false));

  function handleChangeTab(tabLabel: HomeContent) {
    setHomeContent(tabLabel)
  }

  function handleClickAccountOnPopUp() {
    handleChangeTab('myAccount')
    setIsShowAccountPopup(false)
  }

  function handleClickLogout() {
    navigate(RoutePaths.login)
    callApiLogout().catch(e => console.error(e))
    removeAuthInfo()
    removeAuthUser()
  }

  return <div className="w-screen h-screen bg-cover flex flex-col overflow-hidden">
    <PageLayoutLeftSideTab tabOptions={Object.values(TabOptionGroup)} onClickTabOption={handleChangeTab} tabIdSelected={homeContent} openCallerRef={openCallerRef}>
      <div className={"w-full h-full flex flex-col"}>
        <div className={"w-full h-20 shrink-0 bg-white flex justify-between lg:justify-end items-center px-6"}>
          <IconThreeLines className={"block lg:hidden w-5 h-5 cursor-pointer"} onClick={openCallerRef.current} />
          <IconAccountCircle className={"w-10 h-10 cursor-pointer"} onClick={setIsShowAccountPopup.bind(undefined, value => !value)} />
        </div>
        <div className={"w-full flex grow relative overflow-y-scroll"}>
          {isShowAccountPopup && <div ref={ref} className={"absolute z-10 top-3 right-8 flex flex-col gap-3 items-center bg-[#E9EEF6] rounded-3xl p-3"}>
            <div onClick={setIsShowAccountPopup.bind(undefined, false)} className={"absolute top-2 right-2 p-2 bg-gray-300 rounded-full cursor-pointer"}>
                <IconX />
            </div>
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
          {homeContent === TabOptionGroup.services.id && <ServicesContent key={TabOptionGroup.services.id} />}
          {homeContent === TabOptionGroup.myServices.id && <MyServicesContent key={TabOptionGroup.myServices.id} />}
          {homeContent === TabOptionGroup.myCompany.id && <MyCompanyContent key={TabOptionGroup.myCompany.id} />}
          {homeContent === 'myAccount' && <MyAccountContent onClickVerifyKYC={setHomeContent.bind(undefined, 'KYCUpload')} key="KYCUpload" />}
          {homeContent === 'KYCUpload' && <KYCUploadContent backToMyAccount={setHomeContent.bind(undefined, 'myAccount')} key="myAccount" />}
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

// TODO: fetch from api
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

  function handleClickCancelPayment() {
    setStepIndex(SelectServiceStepIndex)
  }

  const hasSelected = bunchOfServiceIdSelected.length > 0
  const selectedService = Services.filter(service => bunchOfServiceIdSelected.includes(service.id))
  let totalPrice = 0
  const nationName = NATION_INFOS.find(nation => nation.value === user?.llcInNation)?.label
  Services.forEach(service => totalPrice += service.price)

  return <div className={"w-full grow flex flex-col"}>
    <div className={"flex p-3 grow overflow-hidden"}>
      {stepIndex === SelectServiceStepIndex && <div className={"p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden space-y-8"}>
        {user?.companyType && <div
          className={"text-cXl w-full text-start"}>{translation.t("Since you launch your new in", {companyType: user.companyType})}
          <span
            className={"text-cLg font-bold text-primary"}>{nationName}</span> <span
            className={"text-h4"}>...</span></div>}
        <div className={"flex flex-col gap-3"}>
          {Services.map(service =>
            <ServiceCard
              key={service.id}
              isSelected={bunchOfServiceIdSelected.includes(service.id)}
              service={service}
              onSelect={handleSelectService}
            />
          )}
        </div>
      </div>}
      {stepIndex === PayServiceStepIndex && <div className={"flex flex-col sm:flex-row grow gap-3 overflow-y-scroll  overflow-x-hidden"}>
        <div className={"sm:w-1/2 flex flex-col bg-white grow shrink-0 rounded-lg overflow-y-scroll overflow-x-hidden"}>
          <div className={"p-6 grow flex gap-8 flex-col"}>
            <div className={"flex flex-col gap-y-2 w-fit"}>
              <p className={"text-cXl font-bold"}>{translation.t('Order summary')}</p>
              <div className={"h-[2px] bg-black w-1/2"}></div>
            </div>
            {selectedService.map((service, index) => <div key={service.id} className={"flex justify-between"}>
              <span className={"space-x-2"}><span>{index + 1}.</span><span>{service.label}</span></span>
              <span className={"text-orange text-cLg font-bold"}>{service.currency}{service.price}</span>
            </div>)}
          </div>
          <div className={"bg-primary_light p-6 font-bold flex justify-between items-center"}>
            <p className={""}>{translation.t('Total in')}: </p>
            <p className={"text-h4"}>{totalPrice}</p>
          </div>
        </div>
        <div className={"sm:w-1/2 bg-white grow shrink-0 rounded-lg flex"}>
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
    <div className={"w-full flex justify-end py-5 pr-8 bg-white gap-2"}>
      {stepIndex === SelectServiceStepIndex && <button
        disabled={!hasSelected}
        className={"flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 " + (hasSelected ? "bg-primary" : "bg-gray-500")}
        onClick={handleClickProceedPayment}
      >
        <span>{translation.t('Proceed payment')}</span>
      </button>}
      {stepIndex === PayServiceStepIndex && <>
        <button
          disabled={!hasSelected}
          className={"flex justify-center items-center gap-2 font-semibold rounded-lg px-6 py-4 border text-gray-600"}
          onClick={handleClickCancelPayment}
        >
          <span>{translation.t('Cancel')}</span>
        </button>
        <button
          disabled={!hasSelected}
          className={"flex justify-center items-center gap-2 text-white font-semibold rounded-lg px-6 py-4 bg-primary"}
          onClick={handleClickFinishPayment}
        >
          <span>{translation.t('Pay now')}</span>
        </button>
      </>}
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
    className={"relative pl-8 sm:pl-14 w-full flex cursor-pointer border rounded-2xl " + (props.isSelected ? 'border-primary' : 'border-gray-300')}
    onClick={props.onSelect.bind(undefined, props.service.id)}
  >
    {props.isSelected && <IconSelectCard className={"absolute -top-[1px] left-0"}/>}
    <div className={"flex flex-col grow py-6 gap-3"}>
      <p className={"text-cLg sm:text-h4 font-bold"}>{props.service.label}</p>
      <div>
        <div>
          <p className={"sm:text-lg"}>{props.service.description}</p>
          <ul className={"flex flex-col sm:flex-row gap-2 sm:gap-12 list-disc text-violet pl-8"}>
            {props.service.agents.map((agent, index) => <li key={agent + index}><span>{agent}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
    <div className={"p-6 text-orange flex items-center justify-center shrink-0"}>
      <span className={"text-h4 font-bold"}>{props.service.currency}{props.service.price}</span>
    </div>
  </div>
}

function MyServicesContent() {
  return <>
    <div>My Services Content</div>
  </>
}

function MyCompanyContent() {
  return <>
    <div>My Company Content</div>
  </>
}

type MyAccountContentProps = {
  onClickVerifyKYC: () => void
}

function MyAccountContent(props: MyAccountContentProps) {
  const {user} = useContext(AuthContext)
  const translation = useTranslation()

  return <div className={"w-full grow flex flex-col p-3"}>
    <div className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <div>
        {user?.avatar
          ? <img src={user?.avatar} alt=""/>
          : <IconAccountCircle className={"w-16 h-16"} />
        }
      </div>
      <p className={"font-bold text-h4 my-3"}>{translation.t("Hello")} {user?.lastName}</p>
      <p>{translation.t('Manage your information, privacy and security so DRMGlobal works for you')}.</p>
      <div className={"flex flex-col md:flex-row mt-8 gap-2 grow w-full"}>
        <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
          <GeneralInformationForm />
        </div>
        <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
          <ChangePasswordForm/>
        </div>
        <div className={"border rounded-lg grow md:w-1/3 p-6 flex flex-col"}>
          <KYCBox onClickVerify={props.onClickVerifyKYC}/>
        </div>
      </div>
    </div>
  </div>
}

function GeneralInformationForm() {
  const translation = useTranslation()
  const {user} = useContext(AuthContext)
  const {validateCaller, validateAll} = useValidateCaller()
  const [phone, setPhone] = useState<RNPhoneValue | undefined>(generatePhone(user?.codePhone || '+84', user?.phone.slice(user?.codePhone?.length) || ''))
  const [firstName, setFirstName] = useState<string>(user?.firstName || '')
  const [lastName, setLastName] = useState<string>(user?.lastName || '')
  const [status, setStatus] = useState<FormStatus>('typing')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  function handleChangePhone(phone: RNPhoneValue) {
    setPhone(phone)
    setStatus("typing")
  }
  function handleChangeFirstName(firstName: string) {
    setFirstName(firstName)
    setStatus("typing")
  }
  function handleChangeLastName(lastName: string) {
    setLastName(lastName)
    setStatus("typing")
  }
  async function handleClickSave() {
    if (!user?.email || !phone || !firstName || !lastName || !validateAll()) {
      return
    }
    setStatus('requesting')
    const {nationPhone, localPhone} = extractPhone(phone)
    const param: ApiChangeUserProfile = {
      email: user.email,
      codePhone: nationPhone,
      phone: localPhone,
      firstName: firstName,
      lastName: lastName
    }
    try {
      await callApiChangeUserProfile(param)
      setStatus('success')
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  return <>
    <div className={"mb-8 space-y-1"}>
      <p className={"font-bold"}>{translation.t('General information')}</p>
      <div className={"h-[2px] w-[70px] bg-primary"}></div>
    </div>
    <div className={"space-y-6"}>
      <FormFieldEmail value={user?.email} id={'email'} isRequired validateCaller={validateCaller} onChange={() => {
      }} isFixedValue/>
      <FormFieldPhoneNumber
        id={"phoneNumber"}
        placeholder={"Input number"}
        isRequired
        value={phone}
        onChange={handleChangePhone}
        validateCaller={validateCaller}
      />
      <div className={"w-full flex gap-4"}>
        <FormFieldText
          id={"FirstName"}
          isRequired
          label="First Name"
          value={firstName}
          onChange={handleChangeFirstName}
          placeholder="Enter first name"
          validateCaller={validateCaller}
        />
        <FormFieldText
          id={"LastName"}
          isRequired
          label="Last Name"
          value={lastName}
          onChange={handleChangeLastName}
          placeholder="Enter last name"
          validateCaller={validateCaller}
        />
      </div>
    </div>
    <div className={"flex justify-end"}>
      <button
        onClick={handleClickSave}
        className="py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
      >
        {translation.t('Save')}
        {status === "requesting" && <IconSpinner />}
      </button>
    </div>
    {status === "failure" && <p className={"text-danger"}>{errorMessage}</p>}
  </>
}

function ChangePasswordForm() {
  const translation = useTranslation()
  const {validateCaller, validateAll} = useValidateCaller()
  const [password, setPassword] = useState<string>('')
  const [rePassword, setRePassword] = useState<string>('')
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true)
  const [status, setStatus] = useState<FormStatus>('typing')
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  function handleChangeRePassword(rePass: string) {
    setRePassword(rePass)
    setIsPasswordMatch(true)
  }

  async function handleClickSave() {
    if (password !== rePassword) {
      setIsPasswordMatch(false)
      return
    }
    if (!password || !rePassword || !isPasswordMatch || !validateAll()) {
      return
    }
    setStatus('requesting')
    const param: ApiChangeUserPassword = {
      newPass: password,
      reNewPass: rePassword,
    }
    try {
      await callApiChangeUserPassword(param)
      setStatus('success')
      setPassword('')
      setRePassword('')
      setStatus('typing')
    } catch (e: unknown) {
      setStatus("failure")
      setErrorMessage(e?.toString())
      console.error(e)
    }
  }

  return <>
    <div className={"mb-8 space-y-1"}>
      <p className={"font-bold"}>{translation.t('Change password')}</p>
      <div className={"h-[2px] w-[70px] bg-primary"}></div>
    </div>
    <div className={"space-y-6 grow"}>
      <FormFieldPassword
        id={"password"}
        label={"New password"}
        placeholder={"Enter new password"}
        isRequired
        value={password}
        onChange={setPassword}
        validateCaller={validateCaller}
      />
      <div className={"space-y-2"}>
        <FormFieldPassword
          id={"rePassword"}
          label={"Re-enter password"}
          placeholder={"Re-type new password"}
          isRequired
          value={rePassword}
          onChange={handleChangeRePassword}
          validateCaller={validateCaller}
        />
        {!isPasswordMatch && <p className={"text-danger"}>{translation.t("The entered passwords do not match")}!</p>}
      </div>
    </div>
    <div className={"flex justify-end"}>
      <button
        disabled={status === 'requesting'}
        onClick={handleClickSave}
        className="py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
      >
        {translation.t('Save')}
        {status === "requesting" && <IconSpinner />}
      </button>
    </div>
    {status === "failure" && <p className={"text-danger"}>{errorMessage}</p>}
  </>
}

type KYCBoxProps = {
  onClickVerify: () => void
}
function KYCBox(props: KYCBoxProps) {
  const translation = useTranslation()
  const {user} = useContext(AuthContext)

  return <>
    <div className={"flex flex-row justify-between mb-8"}>
      <div className={"space-y-1"}>
        <p className={"font-bold"}>{translation.t('KYC')}</p>
        <div className={"h-[2px] w-[70px] bg-primary"}></div>
      </div>
      <div className={"flex flex-row gap-3 items-center"}>
        <span>{translation.t('Status')}:</span>
        {user?.kycStatus === 'pending' && <div className={"flex flex-row gap-1 items-center bg-[#5D50C626] p-2 rounded-lg"}>
          <IconDangerCircle className={"shrink-0 text-black w-5 h-5"}/>
          <span className={"font-bold"}>{translation.t('Pending')}</span>
        </div>}
        {user?.kycStatus === "inProgress" && <div className={"flex flex-row gap-1 items-center bg-[#FF572240] p-2 rounded-lg"}>
          <IconRefreshCircle className={"shrink-0 text-black w-5 h-5"}/>
          <span className={"font-bold"}>{translation.t('In-progress')}</span>
        </div>}
        {user?.kycStatus === "approved" && <div className={"flex flex-row gap-1 items-center bg-success p-2 rounded-lg"}>
          <IconCheck className={"shrink-0 text-white w-5 h-5"}/>
          <span className={"font-bold text-white"}>{translation.t('Approved')}</span>
        </div>}
      </div>
    </div>
    <div className={"space-y-6 grow"}>
      {user?.kycStatus === "pending" && <div className={"flex flex-row gap-4 items-center p-2 bg-red-200 rounded-lg"}>
        <IconDangerCircle className={"shrink-0 text-danger"}/>
        <p>{translation.t('You have not verified your account. Please verify for the best experience')}.</p>
      </div>}
    </div>
    {user?.kycStatus === "pending" && <div className={"flex justify-end"}>
      <button
        onClick={props.onClickVerify}
        className="py-4 px-6 mt-8 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
      >
        {translation.t('Verify now')}
      </button>
    </div>}
  </>
}

type KYCUploadContentProps = {
  backToMyAccount: () => void,
}

function KYCUploadContent(props: KYCUploadContentProps) {
  const translation = useTranslation()
  const {user} = useContext(AuthContext)
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>()

  function handleClickSend() {
    // TODO: integrate with api
  }

  const isDisableSend = !file || !file2
  return <>
    <div className={"w-full grow flex flex-col p-3"}>
      <div className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4"}>
        <div className={"w-full max-w-[800px] flex flex-col gap-y-6"}>
          <div className={"flex flex-row justify-between"}>
            <div className={"space-y-1"}>
              <p className={"font-bold"}>{translation.t('KYC')}</p>
              <div className={"h-[2px] w-[70px] bg-primary"}></div>
            </div>
            <div className={"flex flex-row gap-3 items-center"}>
              <span>{translation.t('Status')}:</span>
              {user?.kycStatus === 'pending' &&
                <div className={"flex flex-row gap-1 items-center bg-[#5D50C626] p-2 rounded-lg"}>
                  <IconDangerCircle className={"shrink-0 text-black w-5 h-5"}/>
                  <span className={"font-bold"}>{translation.t('Pending')}</span>
                </div>}
              {user?.kycStatus === "inProgress" &&
                <div className={"flex flex-row gap-1 items-center bg-[#FF572240] p-2 rounded-lg"}>
                  <IconRefreshCircle className={"shrink-0 text-black w-5 h-5"}/>
                  <span className={"font-bold"}>{translation.t('In-progress')}</span>
                </div>}
              {user?.kycStatus === "approved" &&
                <div className={"flex flex-row gap-1 items-center bg-success p-2 rounded-lg"}>
                  <IconCheck className={"shrink-0 text-white w-5 h-5"}/>
                  <span className={"font-bold text-white"}>{translation.t('Approved')}</span>
                </div>}
            </div>
          </div>
          <p className={"font-bold"}>1. {translation.t('Upload your Passport')}</p>
          <TakeOrUploadPhoto onUpload={setFile} />
          <p className={"font-bold"}>2. {translation.t('Upload your picture holding the passport')}</p>
          <TakeOrUploadPhoto onUpload={setFile2} />
          <div className={"flex flex-row justify-end gap-4"}>
            <button
              className={"flex justify-center items-center gap-2 font-semibold rounded-lg py-4 px-6 border text-gray-600"}
              onClick={props.backToMyAccount}
            >
              <span className={"font-bold"}>{translation.t('Cancel')}</span>
            </button>
            <button
              disabled={isDisableSend}
              onClick={handleClickSend}
              className={"py-4 px-6 flex flex-row justify-center items-center gap-2 text-white font-semibold rounded-lg " + (isDisableSend ? " bg-primary_25" : " bg-primary")}
            >
              <span className={"font-bold"}>{translation.t('Send')}</span>
              {status === 'requesting' && <IconSpinner/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

type TakeOrUploadPhotoProps = {
  onUpload: (file: File | null) => void;
}

function TakeOrUploadPhoto(props: TakeOrUploadPhotoProps) {
  const translation = useTranslation()
  const uploadFileRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState<string>()

  function handleClickUpload() {
    if (uploadFileRef) {
      uploadFileRef.current?.click()
    }
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name)
      props.onUpload(file)
    }
  }

  return <div className={"w-full flex flex-col items-center border border-primary_light rounded-xl px-2 py-6"}>
    {!fileName
      ? <div className={"rounded-full bg-primary_light p-4"}>
        <IconUploadFile/>
      </div>
      : <div className={"flex flex-row gap-2 items-center"}>
        <IconCheck className={"w-14 h-14 text-success"}/>
        <p className={"text-h4"}>{fileName}</p>
      </div>
    }
    <div className={"flex flex-row gap-4 my-4"}>
      {/*<div className={"py-4 px-6 flex flex-row gap-3 border rounded-lg cursor-pointer"}>*/}
      {/*  <IconCamera className={"text-gray-400"}/>*/}
      {/*  <p className={"font-bold"}>{translation.t('Take a photo')}</p>*/}
      {/*</div>*/}
      <div className={"py-4 px-6 flex flex-row gap-3 bg-primary rounded-lg cursor-pointer"} onClick={handleClickUpload}>
        <IconUpload className={"text-white"}/>
        <input ref={uploadFileRef} className={"hidden"} type="file" accept="application/pdf" onChange={handleChange}/>
        <p className={"text-white font-bold"}>{translation.t('Upload file')}</p>
      </div>
    </div>
    <ul className={"list-disc flex flex-col items-center"}>
      <li>{translation.t('All corners of the passport are visible against the backdrop')}</li>
      <li>{translation.t('All passport data is legible')}</li>
      <li>{translation.t('The photo is in color and should be a valid file (PDF)')}</li>
      <li>{translation.t('Maximum allowed size is 10MB')}</li>
    </ul>
  </div>
}
