import { Button, Grid } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRowEventLookup,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  callApiViewMasterService,
  callApiSearchMasterService,
  callApiMasterServiceDetail,
} from "../api/masterServiceManagement";
import {
  ApiSearchMasterServiceParam,
  ApiViewMasterServiceParam,
  AppliedNation,
  ServiceCycle,
  ServiceStep,
  ViewedMasterService,
} from "../../src/api/types";
import { DialogContainer } from "../../src/components/DialogContainer";
import { FormFieldSelect } from "../../src/components/FormFieldSelect";
import { FormFieldText } from "../../src/components/FormFieldText";
import { FormUpdateMasterService } from "../components/FormUpdateMasterService";
import { IconPen, IconReload, IconSetting } from "../../src/components/icons";
import { useValidateCaller } from "../../src/hooks-ui/useValidateCaller";
import { FormCreateMasterService } from "../../src/components/FormCreateMasterService";
import { NATION_INFOS } from "../../src/constants/SelectionOptions";

type Props = {};

export function MasterServiceContent(props: Props) {
  const translation = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [serviceId, setServiceId] = useState<string>();
  const [serviceName, setServiceName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [appliedNation, setAppliedNation] = useState<string>("");
  const [tableData, setTableData] = useState<ViewedMasterService[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [masterServiceCount, setMasterServiceCount] = useState<number>();
  const [masterServiceClicked, setMasterServiceClicked] =
    useState<ViewedMasterService>();
  const [shouldShowCreateMasterService, setShouldShowCreateMasterService] =
    useState<boolean>(false);

  const [shouldShowUpdateMasterService, setShouldShowUpdateMasterService] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const param: ApiViewMasterServiceParam = {
        page: paginationModel.page,
        size: paginationModel.pageSize,
      };
      const rawResult = await callApiViewMasterService(param);
      setTableData(rawResult.content.sort((i1, i2) => i1.id - i2.id));
      setMasterServiceCount(rawResult.totalElements);
    };

    fetchData().catch((e) => console.log(e));
  }, [paginationModel]);
  const fetchServiceDetail = () => {
    const fetchData = async () => {
      const rawResult = await callApiMasterServiceDetail(Number(serviceId));
      console.log(rawResult);
    };
  };

  async function handleClickSearch() {
    const param: ApiSearchMasterServiceParam = {
      serviceId: String(serviceId ?? ""),
      serviceName,
      status,
      appliedNation,
    };
    const rawResult = await callApiSearchMasterService(param);
    if (rawResult) {
      setTableData([rawResult]);
      setMasterServiceCount(1);
    }
  }

  async function handleResearch() {
    setServiceId("");
    setServiceName("");
    setStatus("");
    setServiceName("");
    setAppliedNation("");
    const rawResult = await callApiSearchMasterService(
      {} as ApiSearchMasterServiceParam
    );
    if (rawResult) {
      setTableData([rawResult]);
      setMasterServiceCount(1);
    }
  }

  function handleRowClick(params: GridRowEventLookup["rowClick"]["params"]) {
    setMasterServiceClicked(params.row);
  }

  async function handleEdit() {
    const param: ApiViewMasterServiceParam = {
      page: paginationModel.page,
      size: paginationModel.pageSize,
    };
    const rawResult = await callApiViewMasterService(param);
    setTableData(rawResult.content);
    let lastSelectId = serviceId;
    setServiceId("");
    const updatedMasterServiceClicked = rawResult.content.find(
      (masterService) => masterService.id === masterServiceClicked?.id
    );
    if (updatedMasterServiceClicked) {
      setMasterServiceClicked(updatedMasterServiceClicked);
    }
    setServiceId(serviceId);
  }

  async function handleCreated() {
    const param: ApiViewMasterServiceParam = {
      page: paginationModel.page,
      size: paginationModel.pageSize,
    };
    const rawResult = await callApiViewMasterService(param);
    setShouldShowCreateMasterService(false);
    setTableData(rawResult.content);
  }
  // TODO: add i18n for columns
  const masterServiceColumns: GridColDef<ViewedMasterService>[] = [
    {
      field: "serviceId",
      headerName: "Service ID",
      sortable: false,
      type: "string",
      width: 80,
      renderCell: (params: GridCellParams) => {
        return params.row.id;
      },
    },
    {
      field: "serviceName",
      headerName: "Service Name",
      sortable: false,
      type: "string",
      width: 200,
    },
    {
      field: "appliedNation",
      headerName: "Applied Nation",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220,
      renderCell: (params: GridCellParams) => {
        return params.row.appliedNation?.map((item: AppliedNation) => item?.nation).join(", ");
      },
    },
    {
      field: "enable",
      headerName: "Status",
      sortable: false,
      type: "string",
      width: 120,
      renderCell: (params: GridCellParams) => {
        console.log(`param: ${params.row.enable}`);
        const value = params.row.enable
          ? translation.t("masterService.active")
          : translation.t("masterService.inactive");

        if (params.row.enable === 1) {
          return (
            <div className="text-[#62AA79] bg-[#EBFCF3] px-4 py-2 rounded-2xl font-bold">
              {value}
            </div>
          );
        }

        return (
          <div className="text-[#DF383D] bg-[#FCF2F1] px-4 py-2 rounded-2xl font-bold">
            {value}
          </div>
        );
      },
    },
    {
      field: "step",
      headerName: "No. of steps",
      sortable: false,
      type: "string",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => 
        params.row.serviceStep.length > 10 ? params.row.serviceStep.length : `0${params.row.serviceStep.length}`,
    },
    {
      field: "createdAt",
      headerName: "Create on",
      sortable: false,
      type: "string",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row.createdAt).format("DD/MM/YYYY"),
      // cellClassName: (params: GridCellParams) => {
      //   if (params.value === "Enable") {
      //     return "text-success";
      //   }
      //   return "text-danger";
      // },
    },
    {
      field: "Option",
      headerName: "Option",
      sortable: false,
      type: "string",
      width: 120,
      renderCell: (row) => (
        <button
          className=" rounded bg-primary px-10 py-1 svg-white"
          onClick={() => {
            setServiceId(String(row.id));
            setShouldShowUpdateMasterService(true);
          }}
        >
          <IconPen className="fill-white" />
        </button>
      ),
    },
  ];

  const selectItem = React.useMemo(() => {
    return (
      tableData.find((item) => String(item.id) === serviceId) ??
      ({
        id: NaN,
        serviceType: "",
      } as ViewedMasterService)
    );
  }, [tableData, serviceId]);

  return (
    <div className={"w-full grow flex flex-col p-3"}>
      <div
        className={
          "flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"
        }
      >
        <p className={"text-h4 w-full text-start mb-6"}>
          {translation.t("Service Master Data")}
        </p>
        <div className={"w-full mb-4"}>
          <Grid container spacing={2}>
            <Grid item md={2.4}>
              <FormFieldText
                id={"searchId"}
                validateCaller={validateCaller}
                label={translation.t("masterService.serviceId")}
                onChange={(v) => setServiceId(v)}
                placeholder={translation.t("masterService.serviceIdPlaceholder")}
                value={serviceId}
              />
            </Grid>
            <Grid item md={2.4}>
              <FormFieldText
                id={"searchName"}
                validateCaller={validateCaller}
                label={translation.t("masterService.searchName")}
                onChange={setServiceName}
                value={serviceName}
                placeholder={translation.t("masterService.searchNamePlaceholder")}
              />
            </Grid>
            <Grid item md={2.4}>
              <FormFieldSelect
                id={"status"}
                validateCaller={validateCaller}
                label={translation.t("masterService.status")}
                placeholder={translation.t("masterService.statusPlaceholder")}
                onChange={setStatus}
                value={status}
                optionInfos={[
                  { label: translation.t("all"), value: "" },
                  { label: translation.t("active"), value: "active" },
                  { label: translation.t("deActive"), value: "deActive" },
                ]}
              />
            </Grid>
            <Grid item md={2.4}>
              <FormFieldSelect
                id={"appliedNation"}
                label={translation.t("masterService.appliedNation")}
                validateCaller={validateCaller}
                onChange={setAppliedNation}
                value={appliedNation}
                placeholder={translation.t("masterService.appliedNationPlaceholder")}
                optionInfos={NATION_INFOS}
              />
            </Grid>
            <Grid item md={2.4}>
              <div className="flex pt-10 justify-end items-bottom">
                <button
                  onClick={handleResearch}
                  className="h-[52px] px-6 flex justify-center items-center gap-2 font-semibold rounded-lg text-primary full-primary "
                >
                  <IconReload className="fill-primary" />
                  {translation.t("masterService.reload")}
                </button>
                <button
                  onClick={handleClickSearch}
                  className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
                >
                  {translation.t("Search")}
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="w-full flex justify-end mb-2">
          <button
            onClick={setShouldShowCreateMasterService.bind(undefined, true)}
            className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
          >
            {translation.t("Create new")}
          </button>
        </div>
        <div
          className={"w-full grow"}
          key={tableData.map((value) => value.id).join("_")}
        >
          <DataGrid
            paginationMode="server"
            rows={tableData}
            columns={masterServiceColumns}
            pageSizeOptions={[25]}
            rowCount={masterServiceCount || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => setPaginationModel(model)}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      {shouldShowUpdateMasterService && (
        <DialogContainer
          isAutoSize
          handleClickOverlay={(shouldOpen: boolean) =>
            !shouldOpen && setShouldShowUpdateMasterService(false)
          }
        >
          <div className="w-full max-w-[1600px] min-w-[800px] justify-center items-center py-8 px-4 flex flex-col">
            <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
              <FormUpdateMasterService
                serviceCycle={selectItem.serviceCycle as ServiceCycle[]}
                serviceStep={selectItem.serviceStep}
                serviceDescription={selectItem.serviceDescription}
                appliedCompanyType={
                  selectItem.appliedCompanyType?.at(0)?.companyType ?? ""
                }
                appliedNation={selectItem.appliedNation?.at(0)?.nation ?? ""}
                serviceName={selectItem.serviceName ?? ""}
                serviceType={selectItem.serviceType ?? ""}
                name={selectItem.serviceName ?? ""}
                enable={Boolean(selectItem?.enable)}
                serviceId={Number(selectItem?.id)}
                onSubmitted={handleEdit}
                onCancelModal={() => setShouldShowUpdateMasterService(false)}
              />
            </div>
          </div>
        </DialogContainer>
      )}
      {shouldShowCreateMasterService && (
        <DialogContainer
          isAutoSize
          handleClickOverlay={(shouldOpen: boolean) =>
            setShouldShowCreateMasterService(false)
          }
        >
          <div className="w-full max-w-[1600px] min-w-[800px] justify-center items-center py-8 px-4 flex flex-col">
            <div className="w-full mx-4 flex justify-center items-center flex-col gap-y-8">
              <FormCreateMasterService
                name={""}
                serviceCycle={
                  [
                    { id: 1, cycleNumber: 1, pricePerCycle: 0 },
                  ] as ServiceCycle[]
                }
                serviceStep={
                  [
                    {
                      id: 1,
                      stepNo: 1,
                      name: "",
                      estimatedCompletionTime: "",
                      description: "",
                      documentRequired: [{ documentRequired: "", id: 0 }],
                      result: [{ result: "", id: 0 }],
                    },
                  ] as ServiceStep[]
                }
                serviceDescription={""}
                serviceName={""}
                appliedCompanyType={[] as string[]}
                appliedNation={[] as string[]}
                serviceType={''}
                enable={false}
                serviceId={tableData.length}
                onCreated={handleCreated}
                onCancelModal={() => setShouldShowCreateMasterService(false)}
              />
            </div>
          </div>
        </DialogContainer>
      )}
    </div>
  );
}
