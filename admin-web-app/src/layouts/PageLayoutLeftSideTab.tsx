import { JSX, PropsWithChildren, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { callApiLogout } from "../api/account";
import logo_full from "../assets/images/logo_full.png";
import { I18nLanguage } from "../components/I18nLanguage";
import { IconAccountCircle, IconLogout, IconX } from "../components/icons";
import { AuthContext } from "../contexts/AuthContextProvider";
import { removeAuthInfo } from "../services-business/api/authentication";
import { RoutePaths } from "../pages/router";

export type TabOption<TabId> = {
  iconElement: JSX.Element,
  id: TabId,
  label: string
}

type Props<T> = PropsWithChildren<{
  tabIdSelected: TabOption<T>["id"],
  tabOptions: TabOption<T>[],
  onClickTabOption: (tabId: TabOption<T>["id"]) => void,
}>
export function PageLayoutLeftSideTab<T extends string>(props: Props<T>) {
  const translation = useTranslation()
  const [isOpenOnSmallScreen, setIsOpenOnSmallScreen] = useState<boolean>(false)
  const navigate = useNavigate()
  const {user, removeAuthUser} = useContext(AuthContext)

  function handleClickLogout() {
    navigate(RoutePaths.login)
    callApiLogout().catch(e => console.error(e))
    removeAuthInfo()
    removeAuthUser()
  }

  function handleClickAccount() {
    // @ts-ignore
    props.onClickTabOption('myAccount')
  }

  return <div className={"w-full h-full bg-surface flex flex-row"}>
    {isOpenOnSmallScreen && <div className={"lg:none bg-black absolute z-50 top-0 left-0 w-screen h-screen opacity-40"}></div>}
    <div className={"absolute top-0 left-0 z-50 lg:shrink-0 lg:flex lg:relative lg:w-full max-w-[260px] min-h-screen h-full bg-white flex-col justify-between " + (isOpenOnSmallScreen ? "w-full flex" : "w-0 hidden")}>
      <div className={"grow"}>
        <div
          className={"flex flex-row items-center mx-4 mt-6 justify-between lg:justify-start"}>
          <img className="w-[150px] cursor-pointer" src={logo_full} alt="logo_full"/>
          <div className={"block lg:hidden p-2 bg-gray-100 rounded-full cursor-pointer"}>
            <IconX onClick={setIsOpenOnSmallScreen.bind(undefined, false)} />
          </div>
        </div>
        <div className={"mt-10"}>
          <p className={"ml-4 h-10 uppercase font-bold"}>{translation.t('OVERVIEW')}</p>
          {props.tabOptions.filter(tab => tab.id !== 'myAccount').map(tabOption => <TabOption
            key={tabOption.id}
            id={tabOption.id}
            isOpen={tabOption.id === props.tabIdSelected}
            iconElement={tabOption.iconElement}
            label={tabOption.label}
            onClick={props.onClickTabOption}
          />)}

        </div>
      </div>
      <div className={"w-full p-4"}>
        <I18nLanguage />
        <div className={"flex flex-row justify-between items-center mt-4"}>
          <div className={"flex flex-row items-center gap-2 cursor-pointer"} onClick={handleClickAccount}>
            <IconAccountCircle className={"w-10 h-10"} />
            <span className={"font-bold"}>{user?.lastName}</span>
          </div>
          <IconLogout className={"h-6 w-6 cursor-pointer"} onClick={handleClickLogout} />
        </div>
      </div>
    </div>
    {props.children}
  </div>
}

type TabOptionProps<T> = TabOption<T> & {
  isOpen: boolean,
  onClick: (tabLabel: TabOption<T>["id"]) => void,
}

function TabOption<T>(props: TabOptionProps<T>) {
  const translation = useTranslation()
  return <div className={"h-[50px] px-4 py-2"}>
    <div
      onClick={props.onClick.bind(undefined, props.id)}
      className={"w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " + (props.isOpen ? "bg-gray-300" : "")}
    >
      <div className={"hidden lg:block"}>
        {props.iconElement}
      </div>
      <span>{translation.t(props.label)}</span>
    </div>
  </div>
}
