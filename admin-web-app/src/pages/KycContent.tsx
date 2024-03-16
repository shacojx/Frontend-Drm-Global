import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridValueGetterParams
} from "@mui/x-data-grid";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {}

export function KycContent(props: Props) {
  const translation = useTranslation()
  const [kycCount, setKycCount] = useState<number>()
  const sampleRow = {
    id: 1,
    kycStatus: 1,
  }
  const [tableData, setTableData] = useState([sampleRow]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  // TODO: add i18n for columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'kycStatus',
      headerName: 'Status',
      sortable: false,
      type: 'string',
      width: 80,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.kycStatus ? 'Enable' : 'Disable',
      cellClassName: (params: GridCellParams) => {
        if (params.value === 'Enable') {
          return 'text-success';
        }
        return 'text-danger';
      },
    },
    {
      field: 'name',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      type: 'string',
      width: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.codePhone || ''} ${params.row.phone || ''}`,
    },
    {
      field: 'requestAt',
      headerName: 'Requested on',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'photos',
      headerName: 'Photos',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      type: 'string',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return <div className={"flex flex-row gap-3"}>
          <div className={"p-1 bg-red-100 text-danger"}>Reject</div>
          <div>Approved</div>
        </div>
      }
    },
  ];

  return <div className={"w-full grow flex flex-col p-3"}>
    <div
      className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      <p className={"text-h4 w-full text-start mb-6"}>{translation.t('User Management')}</p>
      <div className={"w-full grow"} key={tableData.map(value => value.id).join("_")}>
        <DataGrid
          paginationMode="server"
          rows={tableData}
          columns={columns}
          pageSizeOptions={[25]}
          rowCount={kycCount || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
    </div>
  </div>;
}
