import { Grid, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCycle } from '../../api/types';
import { FormFieldText } from '../FormFieldText';
import { IconTrash } from '../icons';
import { useValidateCaller } from '../../hooks-ui/useValidateCaller';

export type ServiceCycleTableProps = {
  serviceCycle: ServiceCycle[];
  isSubmitted: boolean;
  onUpdateServiceCycleFee: (id: number, value: string) => void;
  onRemoveServiceCycleFee: (id: number) => void;
  onAddMoreServiceSCycleFee: (id: number) => void;
};

export function ServiceCycleTable(props: ServiceCycleTableProps) {
  const onChangeItem = React.useCallback(
    (cycleId: number, value: string) => {
      props.onUpdateServiceCycleFee(cycleId, value);
    },
    [props.onUpdateServiceCycleFee],
  );
  const onRemoveItem = React.useCallback(
    (id: number) => {
      props.onRemoveServiceCycleFee(id);
    },
    [props.onRemoveServiceCycleFee],
  );
  const translation = useTranslation();
  const { validateCaller } = useValidateCaller();
  const masterServiceColumns: GridColDef<ServiceCycle>[] = [
    {
      field: 'cycleNumber',
      headerName: translation.t('masterService.cycleNumber'),
      sortable: false,
      type: 'string',
      width: 450,
      renderCell: (row) => {
        if (isNaN(Number(row.id))) {
          return (
            <button className="font-bold">
              {translation.t('masterService.addMoreCycle')}
            </button>
          );
        }

        return row.value;
      },
    },
    {
      field: 'pricePerCycle',
      sortable: false,
      type: 'string',
      width: 450,
      renderHeader: () => {
        return (
          <>
            {translation.t('masterService.pricePerCycle')}{' '}
            <span className="text-danger ml-2">*</span>
          </>
        );
      },
      renderCell: (row) => {
        if (isNaN(Number(row.id))) {
          return (
            <button
              className="bg-gray-200 px-4 py-2 rounded-2xl font-bold"
              onClick={() => props.onAddMoreServiceSCycleFee(Number(row.id))}
            >
              + {translation.t('masterService.nextCycle')}
            </button>
          );
        }

        return (
          <FormFieldText
            id={String(row.id)}
            value={row.value}
            validateCaller={validateCaller}
            placeholder={translation.t('masterService.priceCyclePlaceholder')}
            isRequired={true}
            isError={!row.value && props.isSubmitted}
            onChange={(v) => onChangeItem(Number(row?.id), v)}
          />
        );
      },
    },
    {
      field: 'index',
      headerName: translation.t('masterService.option'),
      sortable: false,
      type: 'string',
      width: 100,
      renderCell: (row) => {
        if (isNaN(Number(row.id)) || !props?.serviceCycle?.length) {
          return <></>;
        }
        return (
          <button
            onClick={() => onRemoveItem(Number(row.id))}
            {...(props?.serviceCycle?.length < 2 && {
              disabled: true,
              className: 'disabled',
            })}
          >
            <Tooltip
              placement="top"
              title={translation.t('masterService.delete')}
            >
              <IconTrash />
            </Tooltip>
          </button>
        );
      },
    },
  ];

  const tableData = [
    ...props.serviceCycle,
    {
      id: NaN,
      cycleNumber: props.serviceCycle.length + 1,
      pricePerCycle: 0,
    } as ServiceCycle,
  ];

  // Note: REMOVE THIS IF LOGIC REMOVE
  // const [month, setMonth] = React.useState("");
  // const optionDayList = React.useMemo(() => {
  //   if (DAY_IN_MONTH_SELECT) {
  //     return (DAY_IN_MONTH_SELECT ?? [])?.find((item) => item?.value === month)
  //       ?.items as [] as OptionInfo<number>[];
  //   }

  //   return [] as OptionInfo<number>[];
  // }, [month, DAY_IN_MONTH_SELECT]);

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
        <Grid item md={12}>
          <DataGrid
            paginationMode="server"
            rows={tableData}
            columns={masterServiceColumns}
            pageSizeOptions={[25]}
            onRowClick={() => {}}
          />
        </Grid>
      </Grid>
    </div>
  );
}
