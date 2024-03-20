import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceFilter } from '../components/ServiceFilter';
import { ServiceSearchFilter } from '../types/serviceSearchFilter';
import { Service } from '../types/service';
import { StatusBadge } from '../components/StatusBadge';

type Props = {};

export function ServicesContent(props: Props) {
  const translation = useTranslation();
  const [servicesCount, setServicesCount] = useState<number>();
  const [tableData, setTableData] = useState<Service[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  // TODO: add i18n for columns
  const serviceColumns: GridColDef<Service>[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value}></StatusBadge>;
      },
    },
    {
      field: 'kyc',
      headerName: 'KYC',
      sortable: false,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value}></StatusBadge>;
      },
    },
    {
      field: 'corporationProfile',
      headerName: 'Corporation profile',
      sortable: false,
      type: 'string',
      width: 160,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value}></StatusBadge>;
      },
    },
    {
      field: 'payment',
      headerName: 'Payment',
      sortable: false,
      type: 'string',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value}></StatusBadge>;
      },
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

  function search(data: ServiceSearchFilter) {
    console.log('service search filter ==>', data);
    // TODO: Implement API Search Service here
    setTableData([
      {
        id: '1',
        status: 'PENDING',
        kyc: 'PENDING',
        corporationProfile: 'PENDING',
        payment: 'PENDING',
        serviceName: 'PENDING',
        customerName: 'PENDING',
        phoneNumber: 'PENDING',
        customerEmail: 'PENDING',
      },
      {
        id: '2',
        status: 'IN_PROGRESS',
        kyc: 'PENDING',
        corporationProfile: 'PENDING',
        payment: 'PENDING',
        serviceName: 'PENDING',
        customerName: 'PENDING',
        phoneNumber: 'PENDING',
        customerEmail: 'PENDING',
      },
      {
        id: '3',
        status: 'APPROVED',
        kyc: 'PENDING',
        corporationProfile: 'PENDING',
        payment: 'PENDING',
        serviceName: 'PENDING',
        customerName: 'PENDING',
        phoneNumber: 'PENDING',
        customerEmail: 'PENDING',
      },
    ]);
  }

  return (
    <div className={'w-full grow flex flex-col p-3'}>
      <div
        className={
          'flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8'
        }
      >
        <p className={'text-h4 w-full text-start mb-6'}>
          {translation.t('Services Management')}
        </p>
        <ServiceFilter onSubmit={search} />
        <div
          className={'w-full grow'}
          key={tableData.map((value) => value.id).join('_')}
        >
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
    </div>
  );
}
