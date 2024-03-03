import { useState } from "react";
import { IconAccountCircle, IconMyService, IconService } from "../components/icons";
import { PageLayoutLeftSideTab, TabOption } from "../layouts/PageLayoutLeftSideTab";

type Props = {}

const TabOptions: TabOption[] = [
  {
    iconElement: <IconService />,
    label: 'Services',
  },
  {
    iconElement: <IconMyService />,
    label: 'My Services',
  },
  {
    iconElement: <IconAccountCircle />,
    label: 'My Account',
  },
]

export function HomePage(props: Props) {
  const [tabSelected, setTabSelected] = useState<TabOption["label"]>(TabOptions[2].label)

  function handleChangeTab(tabLabel: TabOption["label"]) {
    setTabSelected(tabLabel)
  }

  return <div className="w-screen h-screen bg-cover flex flex-col">
    <PageLayoutLeftSideTab tabOptions={TabOptions} onClickTabOption={handleChangeTab} tabSelected={tabSelected}>
      <div className={"w-full h-full flex flex-col"}>
        <div className={"w-full h-20 bg-white flex justify-end items-center px-6"}>
          <IconAccountCircle className={"w-10 h-10"}/>
        </div>
        <div className={"p-3 w-full h-full"}>
          <div className={"w-full h-full p-6 bg-white flex flex-col items-center rounded"}>
            {tabSelected === "Services" && <ServicesContent />}
            {tabSelected === "My Services" && <MyServicesContent />}
            {tabSelected === "My Account" && <MyAccountContent />}
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
