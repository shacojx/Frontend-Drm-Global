import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowEventLookup,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { DialogSuccessFullscreen } from '../components/DialogFormStatusFullscreen';
import {
  useApiApproveOrder,
  useApiGetOrders,
} from '../hooks/api/order-payment';
import { generateFormatDate } from '../services-ui/date';
import { FormFieldEmail } from '../components/FormFieldEmail';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { FormFieldText } from '../components/FormFieldText';
import styled from '@emotion/styled';

const Table = styled(DataGrid)`
  .MuiDataGrid-cell {
    overflow: visible !important;
  }
` as typeof DataGrid;

type Props = {};

export function OrderPaymentContent(props: Props) {
  // TODO: update api
  const translation = useTranslation();
  const { validateCaller } = useValidateCaller();

  const [email, setEmail] = useState<string>();
  const [pic, setPic] = useState<string>();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { data, refetch } = useApiGetOrders({
    page: paginationModel.page,
    pic,
    email,
  });
  const { orders } = data ?? {};

  const { mutateAsync: approveOrder } = useApiApproveOrder({
    onSuccess: () => {
      setShowSuccessDialog(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClickSearch = () => {
    refetch();
  };

  function handleRowClick(params: GridRowEventLookup['rowClick']['params']) {}

  console.table(orders);
  // TODO: add i18n for columns
  const orderPaymentColumns: GridColDef<NonNullable<typeof orders>[number]>[] =
    [
      {
        field: 'rowIndex',
        headerName: 'No.',
        width: 100,
        valueGetter: ({ row }) => row.rowIndex + 1,
      },
      { field: 'transitionId', headerName: 'Transaction ID', width: 150 },
      {
        field: 'statusPayment',
        headerName: 'Status',
        sortable: false,
        type: 'string',
        width: 100,
        cellClassName: (params: GridCellParams) => {
          const status = params.row.statusPayment;
          if (status === 'Approved') {
            return 'text-green-500';
          }

          if (status === 'Pending') {
            return 'text-purple-500';
          }

          return '';
        },
        valueGetter: (params: GridValueGetterParams) => {
          const status = params.row.statusPayment;

          if (status === 'Approved') {
            return 'Approved';
          }

          return status;
        },
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
        field: 'paidServiceId',
        headerName: 'Service Id',
        sortable: false,
        type: 'string',
        width: 160,
        renderCell: (params) => {
          return (
            <div className="w-full relative group">
              <div className="absolute hidden group-hover:block bg-white rounded p-3 z-50 shadow top-6">
                <table className="table-auto border-collapse border border-slate-500 rounded">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 p-2">
                        Service ID
                      </th>
                      <th className="border border-slate-300 p-2">
                        Service Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.row.services.map(({ id, name }) => (
                      <tr key={id}>
                        <td className="border border-slate-300 p-2">{id}</td>
                        <td className="border border-slate-300 p-2">{name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="line-clamp-1 overflow-hidden">
                {params.row.services.map((item) => item.id).join(', ')}
              </div>
            </div>
          );
        },
      },
      {
        field: 'serviceName',
        headerName: 'Service Name',
        sortable: false,
        type: 'string',
        width: 200,
        renderCell: (params) => {
          return (
            <div className="w-full relative group">
              <div className="absolute hidden group-hover:block bg-white rounded p-3 z-50 shadow top-6">
                <table className="table-auto border-collapse border border-slate-500 rounded">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 p-2">
                        Service ID
                      </th>
                      <th className="border border-slate-300 p-2">
                        Service Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {params.row.services.map(({ id, name }) => (
                      <tr key={id}>
                        <td className="border border-slate-300 p-2">{id}</td>
                        <td className="border border-slate-300 p-2">{name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="line-clamp-1 overflow-hidden">
                {params.row.services.map((item) => item.name).join(', ')}
              </div>
            </div>
          );
        },
      },
      {
        field: 'paymentMethod',
        headerName: 'Payment Method',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
      },
      {
        field: 'pricePerCycle',
        headerName: 'Amount in USD ($)',
        sortable: false,
        type: 'string',
        width: 150,
        renderCell: ({ row }) => {
          return (
            <div className="text-right w-full pr-4">
              {new Intl.NumberFormat('en-IN', {
                maximumSignificantDigits: 3,
              }).format(row.pricePerCycle)}{' '}
              $
            </div>
          );
        },
      },
      // {
      //   field: "amountLocal",
      //   headerName: "Amount in other currency",
      //   sortable: false,
      //   type: "string",
      //   width: 180,
      // },
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
        valueGetter: (params: GridValueGetterParams) =>{
          const createdDate = 
            params.row.orderId
              ? `${params?.row?.orderId?.slice(2, 10)}`
              : ''

          const [d, m, y] = createdDate.split('/')
          return `${d}/${m}/20${y}`
        },
      },
      {
        field: 'actions',
        headerName: 'Options',
        sortable: false,
        type: 'string',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
          const status = params.row.statusPayment;

          if (status === 'Confirmed') {
            return '';
          }

          return (
            <div className="flex flex-row gap-3">
              <button
                onClick={async () => {
                  await approveOrder(params.row.transitionId);
                  await refetch();
                }}
                className={
                  'py-2 px-3 rounded-lg cursor-pointer bg-green-100 hover:bg-green-200 text-success'
                }
              >
                Approve Payment
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
          <p className={'text-h4 w-full text-start mb-6'}>
            {translation.t('Order Payment Management')}
          </p>
          <div
            className={
              'w-full flex flex-row justify-between items-center gap-10 mb-4'
            }
          >
            <div
              className={
                'w-full flex flex-row justify-start items-end gap-10 mb-4'
              }
            >
              <FormFieldEmail
                id="email"
                validateCaller={validateCaller}
                onChange={setEmail}
                value={email}
              />
              <FormFieldText
                label="PIC"
                id="pic"
                validateCaller={validateCaller}
                onChange={setPic}
                value={pic}
                placeholder="Enter PIC"
              />
              <button
                onClick={handleClickSearch}
                className="h-[52px] px-6 flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
              >
                {translation.t('Search')}
              </button>
            </div>
          </div>
          <div className={'w-full grow'}>
            <Table
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

      {showSuccessDialog && (
        <DialogSuccessFullscreen
          title="Order Approved"
          onClose={() => setShowSuccessDialog(false)}
        />
      )}
    </>
  );
}
