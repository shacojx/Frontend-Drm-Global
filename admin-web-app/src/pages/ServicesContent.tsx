import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridValueGetterParams
} from "@mui/x-data-grid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewedUser } from "../api/types";

type Props = {}

export function ServicesContent(props: Props) {
  const translation = useTranslation()
  const [servicesCount, setServicesCount] = useState<number>()
  const [tableData, setTableData] = useState<ViewedUser[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  // TODO: add i18n for columns
  const serviceColumns: GridColDef<ViewedUser>[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      type: 'string',
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.enable ? 'Active' : 'Inactive',
      cellClassName: (params: GridCellParams) => {
        if (params.value === 'Active') {
          return 'text-success';
        }
        return 'text-danger';
      },
    },
    {
      field: 'kycStatus',
      headerName: 'KYC',
      sortable: false,
      width: 120,
    },
    {
      field: 'corporationProfile',
      headerName: 'Corporation profile',
      sortable: false,
      type: 'string',
      width: 150,
    },
    {
      field: 'payment',
      headerName: 'Payment',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'serviceName',
      headerName: 'Service Name',
      sortable: false,
      type: 'string',
      width: 160,
    },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      sortable: false,
      type: 'string',
      width: 160,
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'pic',
      headerName: 'PIC',
      sortable: false,
      type: 'string',
      width: 120,
    },
  ];


  return <div className={"w-full grow flex flex-col p-3"}>
    <div
      className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <p className={"text-h4 w-full text-start mb-6"}>{translation.t('Services Management')}</p>
      <div className={"w-full grow"} key={tableData.map(value => value.id).join("_")}>
        <DataGrid
          paginationMode="server"
          rows={tableData}
          columns={serviceColumns}
          pageSizeOptions={[25]}
          rowCount={servicesCount || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
    </div>
  </div>;
}
