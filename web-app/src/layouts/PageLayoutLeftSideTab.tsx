import { JSX, MutableRefObject, PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo_full from "../assets/images/logo_full.png";
import { FooterVertical } from "../components/base/footers";
import { IconX } from "../components/icons";

export type TabOption = {
  iconElement: JSX.Element,
  label: string
}

type Props = PropsWithChildren<{
  tabSelected: TabOption["label"],
  tabOptions: TabOption[],
  onClickTabOption: (tabLabel: TabOption["label"]) => void,
  openCallerRef:  MutableRefObject<() => void>
}>
export function PageLayoutLeftSideTab(props: Props) {
  const translation = useTranslation()
  const [isOpenOnSmallScreen, setIsOpenOnSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    props.openCallerRef.current = setIsOpenOnSmallScreen.bind(undefined, true)
  }, [props.openCallerRef]);



  return <div className={"w-full h-full bg-surface flex flex-row"}>
    {isOpenOnSmallScreen && <div className={"sm:none bg-black absolute top-0 left-0 w-screen h-screen opacity-40"}></div>}
    <div className={"absolute top-0 left-0 sm:flex sm:relative sm:w-full max-w-[260px] h-full bg-white flex-col justify-between " + (isOpenOnSmallScreen ? "w-full" : "w-0 hidden")}>
      <div>
        <div
          className={"flex flex-row items-center mx-4 mt-6 justify-between sm:justify-start"}>
          <img className="w-[150px] cursor-pointer" src={logo_full} alt="logo_full"/>
          <div className={"block sm:hidden p-2 bg-gray-100 rounded-full cursor-pointer"}>
            <IconX onClick={setIsOpenOnSmallScreen.bind(undefined, false)} />
          </div>
        </div>
        <div className={"mt-10"}>
          <p className={"ml-4 h-10 uppercase font-bold"}>{translation.t('OVERVIEW')}</p>
          {props.tabOptions.map(tabOption => <TabOption
            key={tabOption.label}
            isOpen={tabOption.label === props.tabSelected}
            iconElement={tabOption.iconElement}
            label={tabOption.label}
            onClick={props.onClickTabOption}
          />)}

        </div>
      </div>
      <div className={"w-full p-4"}>
        {isOpenOnSmallScreen && <FooterVertical/>}
      </div>
    </div>
    {props.children}
  </div>
}

type TabOptionProps = TabOption & {
  isOpen: boolean,
  onClick: (tabLabel: TabOption["label"]) => void,
}

function TabOption(props: TabOptionProps) {
  const translation = useTranslation()
  return <div className={"h-[50px] px-4 py-2"}>
    <div
      onClick={props.onClick.bind(undefined, props.label)}
      className={"w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " + (props.isOpen ? "bg-gray-300" : "")}
    >
      <div className={"hidden sm:block"}>
        {props.iconElement}
      </div>
      <span>{translation.t(props.label)}</span>
    </div>
  </div>
}
