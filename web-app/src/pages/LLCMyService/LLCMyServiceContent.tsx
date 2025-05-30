import { useContext, useEffect, useMemo, useState } from "react";
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
import { MyServiceType, MyServiceStepType, CompanyDetail } from "src/api/types";
import { getFile } from "src/api/upload";
import { AuthContext } from "src/contexts/AuthContextProvider";
import { DialogFailureFullscreen, DialogRequestingFullscreen } from "src/components/DialogFormStatusFullscreen";
import { useApiGetMyCompanyDetail } from "src/hooks-api/useMyCompany";
import {
  validateCompanyInfo,
  validateMailingAddress,
  validateOwnersInfo,
  validateResponseParty,
} from "src/services-business/myCompany";

export default function LLCMyServiceContent() {
  const { t } = useTranslation();
  const [cycle, setCycle] = useState<string>();
  const { validateCaller } = useValidateCaller();
  const { setDetailFilling } = useContext(LLCMyServiceContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const resLLCService = useApiLLCServiceDetail(Number(id));

  const dataService = resLLCService?.data;

  // set step mặc định 1
  useEffect(() => {
    if (dataService) {
      setDetailFilling(dataService?.serviceStep?.[0]);
    }
  }, [id, dataService]);

  const navigator = useNavigate();

  //TODO: api công ty theo user
  // @ts-ignore
  const resCompanyId = useApiGetMyCompanyDetail();

  const companyDetail = resCompanyId.data;

  const statusCorporationProfile = useMemo(() => {
    try {
      if (
        companyDetail &&
        validateCompanyInfo(companyDetail.companyInfo) &&
        validateOwnersInfo(companyDetail.owners) &&
        validateResponseParty(companyDetail.responseParty) &&
        validateMailingAddress(companyDetail.mailingAddress)
      ) {
        return ServiceStatusType.Confirmed;
      }
    } catch (error) {
      console.error('error: ', error);
    }
    return ServiceStatusType.Pending;
  }, [companyDetail]);

  const dataTab: TabType[] = [
    {
      icon: <DocumentIcon className="w-6 h-6" />,
      header: t("Contract"),
      detail: t("Click here to start KYC >"),
      status: dataService?.statusContract as ServiceStatusType,
      color: "#094B72",
      id: 1,
      clickable: true,
      onClick: () => {
        // Clickable: download file tương ứng, mở tự động tại tab mới của trình duyệt.
        if (dataService?.contractFile) {
          getFile(dataService?.contractFile);
        }
      },
    },
    {
      icon: <IdentityIcon className="w-6 h-6" />,
      header: t("KYC"),
      detail: t("Click here to start KYC >"),
      status: user?.kycStatus as ServiceStatusType,
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
      detail: t("Click here to view payment >"),
      status: dataService?.statusPayment as ServiceStatusType,
      color: "#FFC327",
      id: 3,
      clickable: false,
    },
    {
      icon: <BuildingIcon className="w-6 h-6" />,
      header: t("Corporation profile"),
      detail: t("Click to view >"),
      status: statusCorporationProfile as ServiceStatusType,
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
          value: dataService?.cycleNumber?.toString(),
          label: dataService?.cycleNumber?.toString(),
        },
      ];
      setCycleList(arrCycle);
      setCycle(dataService?.cycleNumber?.toString());
    }
  }, [id, dataService]);

  const handleClickSubmitLLCService = () => {
    resLLCService.refetch();
  };

  const handleClickSubmitCompanyId = () => {
    resCompanyId.refetch();
  };

  return (
    <>
      {(resLLCService.isFetching || resCompanyId.isFetching) && (
        <DialogRequestingFullscreen />
      )}
      {resLLCService.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resLLCService?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitLLCService}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t("Try again")}</span>
            </button>
          }
        />
      )}

      {resCompanyId.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resCompanyId?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitCompanyId}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t("Try again")}</span>
            </button>
          }
        />
      )}

      <div className="w-full flex grow relative overflow-y-scroll border border-l border-stroke">
        <div className="w-full grow flex flex-col p-3">
          {dataService && (
            <div className="p-5 lg:p-6 bg-white rounded grow overflow-y-scroll overflow-x-hidden ">
              <div className="flex gap-4 flex-col lg:flex-row justify-between">
                <TitleContent label={dataService.serviceName} />
                <div className="flex justify-between lg:justify-normal gap-md">
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
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-3 mt-6">
                  {/* step */}
                  <div className="flex flex-col w-full lg:w-[247px] gap-md">
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
    </>
  );
}
