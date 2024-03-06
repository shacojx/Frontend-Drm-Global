import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconAccountCircle,
  IconLogout,
  IconMyService,
  IconService,
  IconThreeLines,
  IconUser
} from "../components/icons";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useClickOutside } from "../hooks-ui/useClickOutside";
import { PageLayoutLeftSideTab, TabOption } from "../layouts/PageLayoutLeftSideTab";

type Props = {}

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
  const {user, removeAuthUser} = useContext(AuthContext)
  const [tabSelected, setTabSelected] = useState<TabOption["label"]>(TabOptionGroup.myAccount.label)
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

  return <div className="w-screen h-screen bg-cover flex flex-col">
    <PageLayoutLeftSideTab tabOptions={Object.values(TabOptionGroup)} onClickTabOption={handleChangeTab} tabSelected={tabSelected} openCallerRef={openCallerRef}>
      <div className={"w-full h-full flex flex-col"}>
        <div className={"w-full h-20 bg-white flex justify-between sm:justify-end items-center px-6"}>
          <IconThreeLines className={"block sm:hidden w-5 h-5 cursor-pointer"} onClick={openCallerRef.current} />
          <IconAccountCircle className={"w-10 h-10 cursor-pointer"} onClick={setIsShowAccountPopup.bind(undefined, value => !value)} />
        </div>
        <div className={"p-3 w-full h-full relative"}>
          {isShowAccountPopup && <div ref={ref} className={"absolute top-3 right-8 flex flex-col gap-3 items-center bg-[#E9EEF6] rounded-3xl p-3"}>
            <p className={"text-gray-700 text-cLg"}>{user?.email}</p>
            <IconAccountCircle className={"w-14 h-14 mb-3"}/>
            <p className={"font-bold text-cLg"}>{translation.t("Hello")} {user?.lastName},</p>
            <div onClick={handleClickAccountOnPopUp} className={"flex flex-row gap-2 w-[290px] bg-white px-6 py-4 mt-3 rounded-xl cursor-pointer"}>
              <IconUser />
              <span className={"font-bold"}>{translation.t("Account")}</span>
            </div>
            <div onClick={removeAuthUser} className={"flex flex-row gap-2 w-[290px] bg-white px-6 py-4 rounded-xl cursor-pointer"}>
              <IconLogout/>
              <span className={"font-bold"}>{translation.t("Log out")}</span>
            </div>
          </div>}
          <div className={"w-full h-full p-6 bg-white flex flex-col items-center rounded"}>
            {tabSelected === TabOptionGroup.services.label && <ServicesContent />}
            {tabSelected === TabOptionGroup.myServices.label && <MyServicesContent />}
            {tabSelected === TabOptionGroup.myAccount.label && <MyAccountContent />}
          </div>

        </div>
      </div>
    </PageLayoutLeftSideTab>
  </div>
}

function ServicesContent() {
  return <>
    <div>Services Content</div>
  </>
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
