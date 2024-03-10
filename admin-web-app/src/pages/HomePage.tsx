import { useRef, useState } from "react";
import {
  IconFaceScan,
  IconMyCompany,
  IconMyService,
  IconService, IconSetting, IconSupportPhone,
  IconUser,
} from "../components/icons";
import { PageLayoutLeftSideTab, TabOption } from "../layouts/PageLayoutLeftSideTab";
import { MyAccountContent } from "./MyAccountContent";
import { ServicesContent } from "./ServicesContent";
import { UsersContent } from "./UsersContent";

export type HomeContent = 'services' | 'orderPayment' | 'KYCRequest' | 'support' | 'user' | 'configuration' | 'myAccount'
const TabOptionGroup: Record<HomeContent, TabOption<HomeContent>> = {
  services: {
    iconElement: <IconService/>,
    id: "services",
    label: 'Services',
  },
  orderPayment: {
    id: "orderPayment",
    iconElement: <IconMyService/>,
    label: 'Order Payment',
  },
  KYCRequest: {
    id: "KYCRequest",
    iconElement: <IconFaceScan />,
    label: 'KYC Request',
  },
  support: {
    id: "support",
    iconElement: <IconSupportPhone />,
    label: 'Support',
  },
  user: {
    id: "user",
    iconElement: <IconUser />,
    label: 'User',
  },
  configuration: {
    id: "configuration",
    iconElement: <IconSetting />,
    label: 'Configuration',
  },
  myAccount: {
    id: "myAccount",
    iconElement: <IconMyCompany />,
    label: 'Configuration',
  },
}

export function HomePage() {
  const [homeContent, setHomeContent] = useState<HomeContent>('user')
  const openCallerRef = useRef<()=>void>(()=>{})

  function handleChangeTab(tabId: HomeContent) {
    setHomeContent(tabId)
  }

  return <div className="w-screen h-screen bg-cover flex flex-col overflow-hidden">
    <PageLayoutLeftSideTab tabOptions={Object.values(TabOptionGroup)} onClickTabOption={handleChangeTab} tabIdSelected={homeContent} >
      <div className={"w-full h-full flex flex-col"}>
        <div className={"w-full flex grow relative overflow-y-scroll"}>
          {homeContent === TabOptionGroup.services.id && <ServicesContent key={TabOptionGroup.services.id} />}
          {homeContent === TabOptionGroup.user.id && <UsersContent key={TabOptionGroup.user.id} />}
          {homeContent === 'myAccount' && <MyAccountContent key="myAccount" />}
        </div>
      </div>
    </PageLayoutLeftSideTab>
  </div>
}
