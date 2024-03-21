import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceCycle } from "../../api/types";
import { OptionInfo } from "../../types/common";
import { DAY_IN_MONTH_SELECT } from "../../utils/date";
import { FormFieldSelect } from "../FormFieldSelect";
import { FormFieldText } from "../FormFieldText";
import { IconTrash } from "../icons";

export type ServiceCycleTableProps = {
  cycleFee: ServiceCycle[];
  onUpdateServiceCycle: (value: ServiceCycle[]) => void;
  onRemoveServiceSCycleFee: (id: number) => void;
  onAddMoreServiceSCycleFee: (id: number) => void;
};

export function ServiceCycleTable(props: ServiceCycleTableProps) {
  const [cycleDataList, setCycleDataList] = React.useState(props.cycleFee);
  const onChangeItem = React.useCallback(
    (cycleId: number, value: string) => {
      setCycleDataList((cycleDataList) =>
        cycleDataList.map((item) => {
          if (item.id === cycleId) {
            return {
              ...item,
              pricePerCycle: Number(value),
            };
          }

          return item;
        })
      );
    },
    [cycleDataList]
  );
  const onRemoveItem = React.useCallback((id: number) => {
    setCycleDataList((cycleDataList) =>
      cycleDataList.filter((item) => item.id !== id)
    );
  }, []);
  const translation = useTranslation();
  const masterServiceColumns: GridColDef<ServiceCycle>[] = [
    {
      field: "cycleNumber",
      headerName: translation.t("masterService.cycleNumber"),
      sortable: false,
      type: "string",
      width: 450,
      renderCell: (row) => {
        if (isNaN(Number(row.id))) {
          return (
            <button className="font-bold">
              {translation.t("masterService.addMoreCycle")}
            </button>
          );
        }

        return row.value;
      },
    },
    {
      field: "pricePerCycle",
      headerName: translation.t("masterService.pricePerCycle"),
      sortable: false,
      type: "string",
      width: 450,
      renderCell: (row) => {
        if (isNaN(Number(row.id))) {
          return (
            <button
              className="bg-gray-200 px-4 py-2 rounded-2xl font-bold"
              onClick={() => props.onAddMoreServiceSCycleFee(Number(row.id))}
            >
              + {translation.t("masterService.nextCycle")}
            </button>
          );
        }

        return (
          <FormFieldText
            id={String(row.id)}
            value={row.value}
            validateCaller={{}}
            onChange={(v) => onChangeItem(Number(row.id), v)}
          />
        );
      },
    },
    {
      field: "index",
      headerName: translation.t("masterService.option"),
      sortable: false,
      type: "string",
      width: 100,
      renderCell: (row) => {
        if (isNaN(Number(row.id))) {
          return <></>;
        }

        return (
          <button onClick={() => onRemoveItem(Number(row.id))}>
            <IconTrash />
          </button>
        );
      },
    },
  ];
  const tableData = cycleDataList;

  React.useEffect(() => {
    props.onUpdateServiceCycle(cycleDataList);
  }, [cycleDataList]);

  React.useEffect(() => {
    setCycleDataList(props.cycleFee);
  }, [props.cycleFee]);

  const [month, setMonth] = React.useState("");
  const optionDayList = React.useMemo(() => {
    if (DAY_IN_MONTH_SELECT) {
      return (DAY_IN_MONTH_SELECT ?? [])?.find((item) => item?.value === month)
        ?.items as [] as OptionInfo<number>[];
    }

    return [] as OptionInfo<number>[];
  }, [month, DAY_IN_MONTH_SELECT]);

  return (
    <div className="px-5">
      <Grid container columnSpacing={2}>
        {/* <Grid md={3}>
          <div className="pr-4">
            <FormFieldSelect
              id={""}
              label={translation.t("masterService.serviceCycle")}
              validateCaller={{}}
              onChange={(e) => {}}
              optionInfos={[]}
            />
            <FormFieldSelect
              optionInfos={DAY_IN_MONTH_SELECT}
              id={"month"}
              value={""}
              label={translation.t("masterService.paymentReminderDay")}
              validateCaller={{}}
              onChange={(e) => {
                setMonth(e);
              }}
            />
            <FormFieldSelect
              id={"day"}
              optionInfos={optionDayList ?? ([] as OptionInfo<number>[])}
              label={translation.t("masterService.paymentChoseMonth")}
              validateCaller={{}}
              onChange={(e) => {}}
            />
          </div>
        </Grid> */}
        <Grid md={12}>
          <DataGrid
            paginationMode="server"
            rows={[
              ...tableData,
              { id: NaN, cycleNumber: 0, pricePerCycle: 0 } as ServiceCycle,
            ]}
            columns={masterServiceColumns}
            pageSizeOptions={[25]}
            onRowClick={() => {}}
          />
        </Grid>
      </Grid>
    </div>
  );
}
