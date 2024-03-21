import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FormFieldSelect } from "src/components/FormFieldSelect";
import TitleContent from "src/components/TitleContent";
import {
  BuildingIcon,
  DocumentIcon,
  IdentityIcon,
  MoneyIcon
} from "src/components/icons";
import { useLLCServiceDetailApi } from "src/hook/apis/useLLCServiceApi";
import { useValidateCaller } from "src/hooks-ui/useValidateCaller";
import { RoutePaths } from "../router";
import ContentFillingService from "./components/ContentFillingService";
import StepService from "./components/StepService";
import TabService from "./components/TabService";
import TagService from "./components/TagService";
import { LLCMyServiceContext } from "./context/llcMyServiceContext";
import { ServiceType, TabType } from "./types/my-service.type";

export default function LLCMyServiceContent() {
  const { t } = useTranslation();
  const [cycle, setCycle] = useState<string>();
  const { validateCaller } = useValidateCaller();
  const { setDetailFilling } = useContext(LLCMyServiceContext);

  const resLLCService = useLLCServiceDetailApi(1);

  const dataService = resLLCService?.data?.data;

  // set step mặc định 1
  useEffect(() => {
    if (dataService) {
      setDetailFilling(dataService.step[0]);
    }
  }, [dataService]);

  const navigator = useNavigate();

  const dataTab: TabType[] = [
    {
      icon: <DocumentIcon className="w-6 h-6" />,
      header: t("Contract"),
      deatail: t("Click here to start KYC >"),
      status: ServiceType.Pending,
      color: "#094B72",
      id: 1,
      clickable: true,
      onClick: () => {
        // Clickable: download file tương ứng, mở tự động tại tab mới của trình duyệt.
      },
    },
    {
      icon: <IdentityIcon className="w-6 h-6" />,
      header: t("KYC"),
      deatail: t("Click here to start KYC >"),
      status: ServiceType.InProgress,
      color: "#FF5722",
      id: 2,
      onClick: () => {
        // Hệ thống chuyển sang màn hình Chi tiết tài khoản.
        navigator(RoutePaths.profile);
      },
    },
    {
      icon: <MoneyIcon className="w-6 h-6" />,
      header: t("Payment"),
      deatail: t("Click here to view payment >"),
      status: ServiceType.Issued,
      color: "#FFC327",
      id: 3,
      clickable: false,
    },
    {
      icon: <BuildingIcon className="w-6 h-6" />,
      header: t("Corporation profile"),
      deatail: t("Click to view >"),
      status: ServiceType.InProgress,
      color: "#5D50C6",
      id: 4,
      onClick: () => {
        // Chọn để hiển thị Màn hình chi tiết Công ty.
        navigator(RoutePaths.myCompany);
      },
    },
  ];

  const onChangeCycle = (value: string) => {
    setCycle(value);
  };
  
  const CYCLE_INFOS = [
    { id: 1, value: "1", label: "1" },
    { id: 2, value: "2", label: "2" },
  ];

  if (resLLCService.isFetching) {
    return <>loading...</>;
  }

  return (
    <div className="w-full flex grow relative overflow-y-scroll">
      <div className="w-full grow flex flex-col p-3">
        {dataService && (
          <div className="p-5 md:p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden ">
            <div className="flex gap-4 flex-col md:flex-row justify-between">
              <TitleContent label="LLC Formation Services" />
              <div className="flex justify-between md:justify-normal gap-md">
                <div className="flex gap-md items-center">
                  <div>{t("Cycle")}:</div>
                  <FormFieldSelect
                    id={"cycleSelect"}
                    isRequired
                    placeholder={"--"}
                    value={cycle}
                    optionInfos={CYCLE_INFOS}
                    onChange={onChangeCycle}
                    validateCaller={validateCaller}
                  />
                </div>
                <TagService status={dataService.status as ServiceType} />
              </div>
            </div>
            <div className="hidden bg-[#5D50C6]/25 bg-[#094B72]/25  bg-[#FFC327]/25  bg-[#FF5722]/25 "></div>
            {/* tab */}
            <div className="mt-xl">
              <div className="grid gap-md grid-cols-12">
                {dataTab.map((item, index) => (
                  <TabService item={item} />
                ))}
              </div>
            </div>

            {/* content */}
            <>
              <div className="flex flex-col md:flex-row gap-8 md:gap-3 mt-6">
                {/* step */}
                <div className="flex flex-col gap-md">
                  {dataService?.step?.map((item) => (
                    <StepService item={item} />
                  ))}
                </div>
                <ContentFillingService />
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
}
