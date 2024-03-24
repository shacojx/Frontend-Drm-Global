import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/constants/routerPaths";

import ContentFillingService from "./components/ContentFillingService";
import StepService from "./components/StepService";
import TabService from "./components/TabService";
import TagService from "./components/TagService";
import { LLCMyServiceContext } from "./context/llcMyServiceContext";
import { ServiceStatusType, TabType } from "./types/my-service.type";
import { useValidateCaller } from "../../hooks-ui/useValidateCaller";
import { useApiLLCServiceDetail } from "../../hooks-api/useLlcService";
import {
  BuildingIcon,
  DocumentIcon,
  IdentityIcon,
  MoneyIcon,
} from "../../components/icons";
import TitleContent from "../../components/TitleContent";
import { FormFieldSelect } from "../../components/FormFieldSelect";
import { MyServiceType, MyServiceStepType } from "src/api/types";
import { getFile } from "src/api/upload";
import { AuthContext } from "src/contexts/AuthContextProvider";

export default function LLCMyServiceContent() {
  const { t } = useTranslation();
  const [cycle, setCycle] = useState<string>();
  const { validateCaller } = useValidateCaller();
  const { setDetailFilling } = useContext(LLCMyServiceContext);
  const {user}  = useContext(AuthContext)
  const { id } = useParams();

  const resLLCService = useApiLLCServiceDetail(Number(id));

  const dataService = resLLCService?.data;

  // const dataService: MyServiceType = {
  //   updatedAt: "2024-03-24T16:14:15.000+00:00",
  //   createdAt: "2024-03-24T16:14:15.000+00:00",
  //   id: 1,
  //   userId: 2,
  //   serviceId: 1,
  //   ServiceStatusType: "Based",
  //   serviceName: "Dev MS 1",
  //   serviceDescription: "Dev create for dev",
  //   statusService: "Pending" as ServiceStatusType,
  //   cycleNumber: 1,
  //   pricePerCycle: 1000,
  //   transitionId: 1711296855259,
  //   statusPayment: "Pending" as ServiceStatusType,
  //   statusContract: "Pending" as ServiceStatusType,
  //   contractFile: "avt-default.jpg",
  //   pic: null,
  //   serviceStep: [
  //     {
  //       id: 1,
  //       stepNo: 1,
  //       stepName: "Step 1",
  //       statusStep: "Pending",
  //       estimatedCompletionTime: "2 to 4 days",
  //       description: "Step 1 des",
  //       adminRemark: null,
  //       customerDocument: [
  //         {
  //           id: 1,
  //           requiredDocument: "Doc 1",
  //           fileDocument: null,
  //         },
  //       ],
  //       result: [
  //         {
  //           id: 1,
  //           requiredDocument: "Doc 1 Result",
  //           fileDocument: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       stepNo: null,
  //       stepName: "Step 2",
  //       statusStep: "In-Progress",
  //       estimatedCompletionTime: "1 to 2 days",
  //       description: "Last step without doc required",
  //       adminRemark: null,
  //       customerDocument: [
  //         {
  //           id: 1,
  //           requiredDocument: "Step 2 Result",
  //           fileDocument: null,
  //         },
  //         {
  //           id: 2,
  //           requiredDocument: "none",
  //           fileDocument: null,
  //         },
  //         {
  //           id: 3,
  //           requiredDocument: "Step 2 Result",
  //           fileDocument: null,
  //         },
  //       ],
  //       result: [
  //         {
  //           id: 1,
  //           requiredDocument: "Step 2 Result",
  //           fileDocument: "avt-default.jpg",
  //         },
  //         {
  //           id: 2,
  //           requiredDocument: "none",
  //           fileDocument: "avt-default.jpg",
  //         },
  //         {
  //           id: 3,
  //           requiredDocument: "Step 2 Result",
  //           fileDocument: null,
  //         },
  //       ],
  //     },
  //     {
  //       id: 1,
  //       stepNo: 1,
  //       stepName: "Step 1",
  //       statusStep: "Issued",
  //       estimatedCompletionTime: "2 to 4 days",
  //       description: "Step 1 des",
  //       adminRemark: null,
  //       customerDocument: [
  //         {
  //           id: 1,
  //           requiredDocument: "Doc 1",
  //           fileDocument: null,
  //         },
  //       ],
  //       result: [
  //         {
  //           id: 1,
  //           requiredDocument: "Doc 1 Result",
  //           fileDocument: null,
  //         },
  //       ],
  //     },
  //   ],
  // };

  // set step mặc định 1
  useEffect(() => {
    if (dataService) {
      setDetailFilling(dataService?.serviceStep?.[0]);
    }
  }, [id, dataService]);

  const navigator = useNavigate();

  const dataTab: TabType[] = [
    {
      icon: <DocumentIcon className="w-6 h-6" />,
      header: t("Contract"),
      deatail: t("Click here to start KYC >"),
      status: dataService?.statusContract as ServiceStatusType,
      color: "#094B72",
      id: 1,
      clickable: true,
      onClick: () => {
        // Clickable: download file tương ứng, mở tự động tại tab mới của trình duyệt.
        if (dataService?.contractFile){
          getFile(dataService?.contractFile)
        }
      },
    },
    {
      icon: <IdentityIcon className="w-6 h-6" />,
      header: t("KYC"),
      deatail: t("Click here to start KYC >"),
      status: (user?.kycStatus as ServiceStatusType),
      color: "#FF5722",
      id: 2,
      clickable: true,
      onClick: () => {
        // Hệ thống chuyển sang màn hình Chi tiết tài khoản.
        navigator(RoutePaths.myAccount);
      },
    },
    {
      icon: <MoneyIcon className="w-6 h-6" />,
      header: t("Payment"),
      deatail: t("Click here to view payment >"),
      status: dataService?.statusPayment as ServiceStatusType ,
      color: "#FFC327",
      id: 3,
      clickable: false,
    },
    {
      icon: <BuildingIcon className="w-6 h-6" />,
      header: t("Corporation profile"),
      deatail: t("Click to view >"),
      status: ServiceStatusType.InProgress as ServiceStatusType ,
      color: "#5D50C6",
      id: 4,
      clickable: true,
      onClick: () => {
        // Chọn để hiển thị Màn hình chi tiết Công ty.
        navigator(RoutePaths.myCompany);
      },
    },
  ];

  const onChangeCycle = (value: string) => {
    setCycle(value);
  };

  type CycleListType = {
    value: string;
    label: string;
  };
  const [cycleList, setCycleList] = useState<CycleListType[]>([]);

  useEffect(() => {
    if (dataService) {
      let arrCycle: CycleListType[] = [
        {
          value: dataService.cycleNumber.toString(),
          label: dataService.cycleNumber.toString(),
        },
      ];
      setCycleList(arrCycle);
      setCycle(dataService.cycleNumber.toString());
    }
  }, [id]);

  if (resLLCService.isFetching) {
    return <>loading...</>;
  }

  return (
    <div className="w-full flex grow relative overflow-y-scroll">
      <div className="w-full grow flex flex-col p-3 bg-white border-t border-l border-solid">
        {dataService && (
          <div className="p-5 md:p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden ">
            <div className="flex gap-4 flex-col md:flex-row justify-between">
              <TitleContent label={dataService.serviceName} />
              <div className="flex justify-between md:justify-normal gap-md">
                <div className="flex gap-md items-center">
                  <div>{t("Cycle")}:</div>
                  <FormFieldSelect
                    id={"cycleSelect"}
                    isRequired
                    placeholder={"--"}
                    value={cycle}
                    optionInfos={cycleList}
                    onChange={onChangeCycle}
                    validateCaller={validateCaller}
                  />
                </div>
                <TagService
                  status={dataService.statusService as ServiceStatusType}
                />
              </div>
            </div>
            <div className="hidden bg-[#5D50C6]/25 bg-[#094B72]/25  bg-[#FFC327]/25  bg-[#FF5722]/25 "></div>
            {/* tab */}
            <div className="mt-xl">
              <div className="grid gap-md grid-cols-12">
                {dataTab.map((item, index) => (
                  <TabService key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* content */}
            <>
              <div className="flex flex-col md:flex-row gap-8 md:gap-3 mt-6">
                {/* step */}
                <div className="flex flex-col gap-md">
                  {dataService?.serviceStep?.map((item: any) => (
                    <StepService key={item.id} item={item} />
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
