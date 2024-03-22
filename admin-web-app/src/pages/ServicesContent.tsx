import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceFilter } from '../components/ServiceFilter';
import { ServiceSearchFilter } from '../types/serviceSearchFilter';
import { Service } from '../types/service';
import { StatusBadge } from '../components/StatusBadge';
import { DialogContainer } from '../components/DialogContainer';
import { ServiceDetailDialog } from '../components/ServiceDetailDialog';
import { callApiGetServiceDetail } from '../api/serviceManagement';
import { callApiLViewUser } from '../api/userManagement';

type Props = {};

export function ServicesContent(props: Props) {
  const translation = useTranslation();

  const [servicesCount, setServicesCount] = useState<number>();
  const [tableData, setTableData] = useState<Service[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  const [isShowServiceDetailDialog, setIsShowServiceDetailDialog] =
    useState(false);
  const [selectService, setSelectService] = useState<Service | null>(null);

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
      field: 'phoneNumber',
      headerName: 'Phone number',
      sortable: false,
      type: 'string',
      width: 120,
    },
    {
      field: 'customerEmail',
      headerName: 'Email',
      sortable: false,
      type: 'string',
      width: 200,
    },
    {
      field: 'pic',
      headerName: 'PIC',
      sortable: false,
      type: 'string',
      width: 120,
    },
  ];

  useEffect(() => {
    search();
  }, []);

  async function search(data?: ServiceSearchFilter) {
    console.log('service search filter ==>', data);
    // TODO: Implement API Search Service here
    const output = await callApiGetServiceDetail(data);
    setTableData(output);

    async function getUsers() {
      const output = await callApiLViewUser(param);
    }
  }

  function showServiceDetail(data: Service) {
    console.log(data);
    setIsShowServiceDetailDialog(true);
    setSelectService(data);
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
            onRowClick={(param: GridRowParams<Service>) =>
              showServiceDetail(param.row)
            }
          />
        </div>
        {isShowServiceDetailDialog && (
          <DialogContainer
            handleClickOverlay={() => {
              setIsShowServiceDetailDialog(false);
            }}
            isCloseOnClickOverlay
            isFullSize
            isAutoSize
            panelClassName={'max-w-[1200px]'}
          >
            <ServiceDetailDialog service={selectService} />
          </DialogContainer>
        )}
      </div>
    </div>
  );
}
