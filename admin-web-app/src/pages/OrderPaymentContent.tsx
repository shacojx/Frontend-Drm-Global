import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiSearchUserParam, ApiViewUserParam, RawRegisterServicesResult, ViewedUser } from "../api/types";
import { callApiSearchUser, callApiLViewUser } from "../api/userManagement";
import { DialogContainer } from "../components/DialogContainer";
import { FormCreateAdminAccount } from "../components/FormCreateAdminAccount";
import { FormFieldEmail } from "../components/FormFieldEmail";
import { useValidateCaller } from "../hooks-ui/useValidateCaller";
import { extractPhone, RNPhoneValue } from "../services-business/api/generate-api-param/account";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowEventLookup,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { generateFormatDate } from "../services-ui/date";
import { useApiApproveOrder, useApiGetOrders } from "../hooks/api/order-payment";
import { DialogSuccessFullscreen } from "../components/DialogFormStatusFullscreen";
import { toast } from "react-toastify";

type Props = {}

export function OrderPaymentContent(props: Props) {
  // TODO: update api
  const translation = useTranslation()
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const { data } = useApiGetOrders({page: paginationModel.page})
  const { orders } = data ?? {}

  const { mutateAsync: approveOrder } = useApiApproveOrder({
    onSuccess: () => {
      setShowSuccessDialog(true)
    },
    onError: error => {
      toast.error(error.message)
    }
  })

  async function handleClickSearch() {  
  }

  function handleRowClick(params: GridRowEventLookup['rowClick']['params']) {
  }

  
  // TODO: add i18n for columns
  const orderPaymentColumns: GridColDef<RawRegisterServicesResult['content'][number]>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'statusPayment',
      headerName: 'Status',
      sortable: false,
      type: 'string',
      width: 80,
    },
    {
      field: 'name',
      headerName: 'Customer Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'serviceId',
      headerName: 'Service Id',
      sortable: false,
      type: 'string',
      width: 160,
    },
    {
      field: 'serviceName',
      headerName: 'Service Name',
      sortable: false,
      type: 'string',
      width: 200,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'amountUSD',
      headerName: 'Amount in USD ($)',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'amountLocal',
      headerName: 'Amount in other currency',
      sortable: false,
      type: 'string',
      width: 120,
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
      field: 'createdAt',
      headerName: 'Created on',
      sortable: false,
      type: 'string',
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${generateFormatDate(new Date(params.row.createdAt))}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      type: 'string',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className={'flex flex-row gap-3'}>
            <button
              onClick={() => approveOrder(params.row.id)}
              className={
                'py-2 px-3 rounded-lg cursor-pointer bg-green-100 hover:bg-green-200 text-success'
              }
            >
              Approved
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className={'w-full grow flex flex-col p-3'}>
        <div
          className={
            'flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8'
          }
        >
          <p className={'text-h4 w-full text-start mb-6'}>{translation.t('User Management')}</p>
          <div className={'w-full flex flex-row justify-between items-center gap-10 mb-4'}>
            {/* <div className={"w-full flex flex-row justify-start items-end gap-10 mb-4"}>
          <FormFieldEmail id={"email"} validateCaller={validateCaller} onChange={setEmail} value={email}/>
          <button onClick={handleClickSearch}
                  className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg">
            {translation.t('Search')}
          </button>
        </div> */}
          </div>
          <div className={'w-full grow'}>
            <DataGrid
              paginationMode="server"
              rows={orders ?? []}
              columns={orderPaymentColumns}
              pageSizeOptions={[25]}
              rowCount={100}
              paginationModel={paginationModel}
              onPaginationModelChange={(model) => setPaginationModel(model)}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>

      {showSuccessDialog && <DialogSuccessFullscreen title="Order Approved" onClose={() => setShowSuccessDialog(false)} />}
    </>
  );
}
