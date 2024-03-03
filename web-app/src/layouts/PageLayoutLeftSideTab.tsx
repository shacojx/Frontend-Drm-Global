import { JSX, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import logo_full from "../assets/images/logo_full.png";
import { FooterVertical } from "../components/base/footers";
import { IconCollapse } from "../components/icons";

export type TabOption = {
  iconElement: JSX.Element,
  label: string
}

type Props = PropsWithChildren<{
  tabSelected: TabOption["label"],
  tabOptions: TabOption[],
  onClickTabOption: (tabLabel: TabOption["label"]) => void,
}>
export function PageLayoutLeftSideTab(props: Props) {
  const translation = useTranslation()
  const [isFullTabSide, setIsFullTabSide] = useState<boolean>(true)

  return <div className={"w-full h-full bg-surface flex flex-row"}>
    <div className={"max-w-[260px] bg-white flex flex-col justify-between " + (isFullTabSide ? "w-full" : "w-fit")}>
      <div>
        <div
          className={"flex flex-row items-center mx-4 mt-6 " + (isFullTabSide ? "justify-between" : "justify-center")}>
          {isFullTabSide && <img className="w-[150px] cursor-pointer" src={logo_full} alt="logo_full"/>}
          <IconCollapse className={"cursor-pointer"} onClick={setIsFullTabSide.bind(undefined, v => !v)}/>
        </div>
        <div className={"mt-10"}>
          <p className={"ml-4 h-10 uppercase font-bold"}>{isFullTabSide && translation.t('OVERVIEW')}</p>
          {props.tabOptions.map(tabOption => <TabOption
            key={tabOption.label}
            isOpen={tabOption.label === props.tabSelected}
            isFullTabSize={isFullTabSide}
            iconElement={tabOption.iconElement}
            label={tabOption.label}
            onClick={props.onClickTabOption}
          />)}

        </div>
      </div>
      <div className={"w-full p-4"}>
        {isFullTabSide && <FooterVertical/>}
      </div>
    </div>
    {props.children}
  </div>
}

type TabOptionProps = TabOption & {
  isOpen: boolean,
  isFullTabSize: boolean,
  onClick: (tabLabel: TabOption["label"]) => void,
}

function TabOption(props: TabOptionProps) {
  const translation = useTranslation()
  return <div className={"h-[50px] px-4 py-2"}>
    <div
      onClick={props.onClick.bind(undefined, props.label)}
      className={"w-full h-full flex flex-row gap-3 px-3 items-center rounded-md cursor-pointer hover:bg-gray-300 " + (props.isOpen ? "bg-gray-300" : "")}
    >
      {props.iconElement}
      {props.isFullTabSize && <span>{translation.t(props.label)}</span>}
    </div>
  </div>
}
