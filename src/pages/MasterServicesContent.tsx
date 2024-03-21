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
} from "../api/masterServiceManagement";
import {
  ApiSearchMasterServiceParam,
  ApiViewMasterServiceParam,
  ServiceCycle,
  ServiceStep,
  ViewedMasterService,
} from "../api/types";
import { DialogContainer } from "../components/DialogContainer";
import { FormFieldSelect } from "../components/FormFieldSelect";
import { FormFieldText } from "../components/FormFieldText";
import { FormUpdateMasterService } from "../components/FormUpdateMasterService";
import { IconEdit, IconReload, IconSetting } from "../components/icons";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { FormCreateMasterService } from "../components/FormCreateMasterService";
import { NATION_INFOS } from "../constants/SelectionOptions";

type Props = {};

export function MasterServiceContent(props: Props) {
  const translation = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [serviceId, setServiceId] = useState<number>();
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
      setTableData(rawResult.content);
      setMasterServiceCount(rawResult.totalElements);
    };

    fetchData().catch((e) => console.log(e));
  }, [paginationModel]);

  async function handleClickSearch() {
    const param: ApiSearchMasterServiceParam = {
      serviceId: String(serviceId),
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
    setServiceId(NaN);
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
    const updatedMasterServiceClicked = rawResult.content.find(
      (masterService) => masterService.id === masterServiceClicked?.id
    );
    if (updatedMasterServiceClicked) {
      setMasterServiceClicked(updatedMasterServiceClicked);
    }
  }

  async function handleCreated() {
    const param: ApiViewMasterServiceParam = {
      page: paginationModel.page,
      size: paginationModel.pageSize,
    };
    const rawResult = await callApiViewMasterService(param);
    setTableData(rawResult.content);
  }
  // TODO: add i18n for columns
  const masterServiceColumns: GridColDef<ViewedMasterService>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "serviceId",
      headerName: "Service ID",
      sortable: false,
      type: "string",
      width: 80,
    },
    {
      field: "serviceName",
      headerName: "Service Name",
      sortable: false,
      type: "string",
      width: 200,
    },
    {
      field: "applyNation",
      headerName: "Apply Nation",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220,
    },
    {
      field: "enable",
      headerName: "Status",
      sortable: false,
      type: "string",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.enable
          ? translation.t("masterService.active")
          : translation.t("masterService.deactive"),
      cellClassName: (params: GridCellParams) => {
        console.log(`param: ${params.row.enable}`);
        if (params.row.enable === 1) {
          return "text-[#62AA79] bg=[#EBFCF3] p-2";
        }
        return "text-[#DF383D] bg=[#FCF2F1] p-2";
      },
    },
    {
      field: "serviceStep",
      headerName: "No of steps",
      sortable: false,
      type: "string",
      width: 80,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.serviceStep.length > 10
          ? params.row.serviceStep.length
          : `0${params.row.serviceStep.length}`,
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
          className=" rounded bg-primary px-10 py-1"
          onClick={() => {
            setServiceId(Number(row.id));
            setShouldShowUpdateMasterService(true);
          }}
        >
          <IconEdit className="fill-white" />
        </button>
      ),
    },
  ];

  const selectItem = React.useMemo(() => {
    return (
      tableData.find((item) => item.id === serviceId) ??
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
        <div
          className={
            "w-full flex flex-row justify-between items-center gap-10 mb-4"
          }
        >
          <div
            className={
              "w-full flex flex-row justify-start items-end gap-10 mb-4"
            }
          >
            <Grid container columnGap={2}>
              <Grid md={2.5}>
                <FormFieldText
                  id={"searchId"}
                  validateCaller={validateCaller}
                  label={translation.t("masterService.serviceId")}
                  onChange={(v) => setServiceId(Number(v))}
                  value={String(serviceId ?? "")}
                  placeholder="Service ID..."
                />
              </Grid>
              <Grid md={2.5}>
                <FormFieldText
                  id={"searchName"}
                  validateCaller={validateCaller}
                  label={translation.t("masterService.searchName")}
                  onChange={setServiceName}
                  value={serviceName}
                  placeholder="Service Name..."
                />
              </Grid>
              <Grid md={2.5}>
                <FormFieldSelect
                  id={"status"}
                  validateCaller={validateCaller}
                  label={translation.t("masterService.status")}
                  onChange={setStatus}
                  value={status}
                  optionInfos={[
                    { label: translation.t("all"), value: "" },
                    { label: translation.t("active"), value: "active" },
                    { label: translation.t("deActive"), value: "deActive" },
                  ]}
                />
              </Grid>
              <Grid md={2.5}>
                <FormFieldSelect
                  id={"appliedNation"}
                  label={translation.t("masterService.appliedNation")}
                  validateCaller={validateCaller}
                  onChange={setAppliedNation}
                  value={appliedNation}
                  placeholder={"Input number"}
                  optionInfos={NATION_INFOS}
                />
              </Grid>
            </Grid>

            <div className="flex absolute right-20">
              <button
                onClick={handleResearch}
                className="h-[52px] px-6 flex justify-center items-center gap-2 font-semibold rounded-lg text-primary"
              >
                <IconReload className={"text-primary"} />
                {translation.t("masterService.reload")}
              </button>
              <button
                onClick={handleClickSearch}
                className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
              >
                {translation.t("Search")}
              </button>
            </div>
          </div>
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
                cycleFee={selectItem.serviceCycle as ServiceCycle[]}
                serviceStep={selectItem.serviceStep as ServiceStep[]}
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
                onCreated={handleCreated}
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
                cycleFee={
                  [
                    { id: 0, cycleNumber: 0, pricePerCycle: 0 },
                  ] as ServiceCycle[]
                }
                serviceStep={
                  [
                    {
                      id: 0,
                      stepNo: 0,
                      name: "",
                      estimatedCompletionTime: "",
                      description: "",
                      documentRequired: [{ documentRequired: "", id: 0 }],
                      result: [{ result: "", id: 0 }],
                    },
                  ] as ServiceStep[]
                }
                serviceDescription={""}
                appliedCompanyType={""}
                appliedNation={""}
                serviceName={""}
                serviceType={""}
                enable={false}
                serviceId={tableData.length}
                onCreated={handleEdit}
                onCancelModal={() => setShouldShowCreateMasterService(false)}
              />
            </div>
          </div>
        </DialogContainer>
      )}
    </div>
  );
}
