import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "src/components/Button";
import { FormFieldSelect } from "src/components/FormFieldSelect";
import TitleConent from "src/components/TitleConent";
import {
  BuildingIcon,
  DiplomaVerifiedIcon,
  DocumentIcon,
  IconCheck,
  IconRefreshCircle,
  IconUpload,
  IdentityIcon,
  MoneyIcon,
  NotificationUnreadLinesIcon,
} from "src/components/icons";
import { useValidateCaller } from "src/hooks-ui/useValidateCaller";
import { cn } from "src/utils/cn.util";
import {
  StepType,
  TabType,
  statusStep,
  ServiceType,
} from "./types/my-service.type";
import TabService from "./components/TabService";
import StepService from "./components/StepService";
import images from "src/assets/images/images";
import useLLCServiceApi from "src/hook/apis/useLLCServiceApi";
import InputFile from "src/components/InputFile";

export default function LLCMyService() {
  const { t } = useTranslation();
  const [cycle, setCycle] = useState<string>();
  const { validateCaller, validateAll } = useValidateCaller();
  const [file, setFile] = useState<File>()

  const resLLCService = useLLCServiceApi();

  const dataService = resLLCService?.data?.data;

  const dataTab: TabType[] = [
    {
      icon: <DocumentIcon className="w-6 h-6" />,
      header: t("Contract"),
      deatail: t("Click here to start KYC >"),
      status: ServiceType.Pending,
      color: "#094B72",
      id: 1,
    },
    {
      icon: <IdentityIcon className="w-6 h-6" />,
      header: t("KYC"),
      deatail: t("Click here to start KYC >"),
      status: ServiceType.InProgress,
      color: "#FF5722",
      id: 2,
    },
    {
      icon: <MoneyIcon className="w-6 h-6" />,
      header: t("Payment"),
      deatail: t("Click here to view payment >"),
      status: ServiceType.Issued,
      color: "#FFC327",
      id: 3,
    },
    {
      icon: <BuildingIcon className="w-6 h-6" />,
      header: t("Corporation profile"),
      deatail: t("Click to view >"),
      status: ServiceType.InProgress,
      color: "#5D50C6",
      id: 4,
    },
  ];

  const dataStep: StepType[] = [
    {
      header: "State Filings",
      deatail: "2 - 5 days",
      status: statusStep.draf,
      id: 1,
    },
    {
      header: "Communication",
      deatail: "2 - 5 days",
      status: statusStep.peding,
      id: 2,
    },
    {
      header: "EIN",
      deatail: "2 - 5 days",
      status: statusStep.success,
      id: 3,
    },
    {
      header: "Bank account",
      deatail: "2 - 5 days",
      status: statusStep.peding,
      id: 4,
    },
  ];
  const onChangeCycle = (value: string) => {
    setCycle(value);
  };

  const arrStatusService = {
    1: t("Pending"),
    2: t("InProgress"),
    3: t("Issued"),
  };

  const CYCLE_INFOS = [
    { id: 1, value: "1", label: "1" },
    { id: 2, value: "2", label: "2" },
  ];

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };
  if (resLLCService.isFetching) {
    return <>loading...</>;
  }

  return (
    <div className="w-full flex grow relative overflow-y-scroll">
      <div className="w-full grow flex flex-col p-3">
        {dataService && (
          <div className="p-5 md:p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden ">
            <div className="flex gap-4 flex-col md:flex-row justify-between">
              <TitleConent label="LLC Formation Services" />
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
                <div className="flex gap-md items-center">
                  <div>{t("Status")}:</div>
                  <div
                    className={cn(
                      "flex  p-[6px] gap-[6px] rounded-lg",
                      {
                        "bg-[#5D50C6]/15":
                          dataService.status === ServiceType.Pending,
                      },
                      {
                        "bg-[#FF5722]/25":
                          dataService.status === ServiceType.InProgress,
                      },
                      {
                        "bg-priamry text-white":
                          dataService.status === ServiceType.Issued,
                      }
                    )}
                  >
                    <div>
                      <IconRefreshCircle />
                    </div>
                    <div>
                      {
                        arrStatusService[
                          dataService.status as keyof typeof arrStatusService
                        ]
                      }
                    </div>
                  </div>
                </div>
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
            {dataService.status === ServiceType.Pending && (
              <>
                <div className="mt-md flex flex-col justify-center items-center h-[368px]">
                  <div>
                    <img src={images.NotFound} />
                  </div>
                  <div className="text-lg font-bold mt-[10px]">
                    {t("It's empty here")}
                  </div>
                  <div className="mt-[10px]">
                    {t("We will notify when the service is ready!")}
                  </div>
                </div>
              </>
            )}

            {(dataService.status === ServiceType.InProgress ||
              dataService.status === ServiceType.Issued) && (
              <>
                <div className="flex flex-col md:flex-row gap-8 md:gap-3 mt-6">
                  {/* step */}
                  <div className="flex flex-col gap-md">
                    {dataStep.map((item, index) => (
                      <StepService item={item} />
                    ))}
                  </div>
                  <div className="border border-primary_25 rounded-xl py-lg px-xl flex-grow">
                    <div className="flex justify-between flex-grow mb-md">
                      <TitleConent label="State filling" />
                      <div>
                        <div className="flex gap-md items-center">
                          <div>{t("Status")}:</div>
                          <div className="flex bg-success p-[6px] gap-[6px] rounded-lg text-white">
                            <div>
                              <IconCheck />
                            </div>
                            <div>{t("Issued")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-start py-md">
                        <DiplomaVerifiedIcon className="mr-4 self-center" />
                        <div className="flex-1">
                          <div>
                            {t(
                              "State filings are done in the state you picked for your formation. We take care of registered agents in the state and all necessary filings with the Secretary of State."
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-rootRootPadding">
                      <div className="flex items-start border border-primary_25 bg-primary/10 p-md rounded-lg">
                        <NotificationUnreadLinesIcon className="mr-4 self-center" />
                        <div className="flex-1">
                          <div>
                            {t(
                              "You don't have to upload any paper, we will do all the paper work of this step"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-rootRootPadding">
                      <div className="text-base font-bold leading-6">
                        {t("Customer document")}
                      </div>
                      <div className="border rounded-md border-primary_25 mt-md">
                        <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
                          <div className="px-md text-center">{t("Required document")}</div>
                          <div className="px-md text-center">{t("Uploaded document")}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-md items-center py-md">
                          <div className="px-md text-[#3B3F48]/85 text-center">{t("None")}</div>
                          <div className="px-md text-center flex justify-center">
                            <InputFile
                              label={t("Upload")}
                              onChange={handleChangeFile}
                              file={file}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-rootRootPadding">
                      <div className="text-base font-bold leading-6">
                        {t("Service Result")}
                      </div>
                      <div className="border rounded-md border-primary_25 mt-md">
                        <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
                          <div className="px-md text-center">{t("Required document")}</div>
                          <div className="px-md text-center">{t("Uploaded document")}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-md items-center py-md">
                          <div className="text-[#3B3F48]/85 px-md text-center">
                            1. State Filling Information
                          </div>
                          <div className="px-md text-center">
                            <a
                              href="#"
                              className="text-primary font-bold hover:underline"
                            >
                              1. EEE Company_State Filling Information.pdf
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
