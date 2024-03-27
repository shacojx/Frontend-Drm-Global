import { useRef, useState } from "react";
import {
  IconFaceScan,
  IconMyCompany,
  IconMyService,
  IconService, IconSetting, IconSupportPhone,
  IconUser,
} from "../components/icons";
import { PageLayoutLeftSideTab, TabOption } from "../layouts/PageLayoutLeftSideTab";
import { KycContent } from "./KycContent";
import { MyAccountContent } from "./MyAccountContent";
import { OrderPaymentContent } from "./OrderPaymentContent";
import { ServicesContent } from "./ServicesContent";
import { UsersContent } from "./UsersContent";
import { MasterServiceContent } from "./MasterServicesContent";
import { useSearchParams } from "react-router-dom";

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
  const openCallerRef = useRef<()=>void>(()=>{})
  const [searchParams, setSearchParams] = useSearchParams()
  const homeContent = (searchParams.get('tab') ?? 'KYCRequest') as HomeContent || TabOptionGroup.services.id

  function handleChangeTab(tabId: HomeContent) {
    setSearchParams({
      tab: tabId
    })
  }

  return <div className="w-screen h-screen bg-cover flex flex-col overflow-hidden">
    <PageLayoutLeftSideTab tabOptions={Object.values(TabOptionGroup)} onClickTabOption={handleChangeTab} tabIdSelected={homeContent} >
      <div className={"w-full h-full flex flex-col overflow-x-hidden"}>
        <div className={"w-full flex grow relative overflow-y-scroll overflow-x-hidden"}>
          {homeContent === TabOptionGroup.KYCRequest.id && <KycContent key={TabOptionGroup.KYCRequest.id} />}
          {homeContent === TabOptionGroup.orderPayment.id && <OrderPaymentContent key={TabOptionGroup.user.id} />}
          {homeContent === TabOptionGroup.services.id && <ServicesContent key={TabOptionGroup.services.id} />}
          {homeContent === TabOptionGroup.user.id && <UsersContent key={TabOptionGroup.user.id} />}
          {homeContent === TabOptionGroup.configuration.id && <MasterServiceContent key={TabOptionGroup.configuration.id} />}
          {homeContent === 'myAccount' && <MyAccountContent key="myAccount" />}
        </div>
      </div>
    </PageLayoutLeftSideTab>
  </div>
}
