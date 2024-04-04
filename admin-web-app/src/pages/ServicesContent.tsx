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
import { EMPTY_SEARCH, Service } from '../types/service';
import { DialogContainer } from '../components/DialogContainer';
import { ServiceDetailDialog } from '../components/ServiceDetailDialog';
import {
  ApiSearchPaidServiceType,
  CompanyDetail,
  ViewedUser,
} from '../api/types';
import { StatusBadge } from '../components/StatusBadge';
import {
  useApiGetServiceDetail,
  useApiSearchPaidService,
  useApicalGetListService,
} from '../hooks-api/useServiceApi';
import {
  DialogFailureFullscreen,
  DialogRequestingFullscreen,
} from '../components/DialogFormStatusFullscreen';
import { Status } from '../constants/StatusBadge';
import { useApiUserSearchByRole } from '../hooks/api/user';
import { useApiGetMyCompanyDetail } from '../hooks-api/useMyCompany';

export function ServicesContent() {
  const { t } = useTranslation();
  const [dataSearch, setDataSearch] = useState<ApiSearchPaidServiceType>(EMPTY_SEARCH);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const [isShowServiceDetailDialog, setIsShowServiceDetailDialog] = useState(false);
  const [selectService, setSelectService] = useState<Service | null>(null);
  const resSearchService = useApiSearchPaidService(dataSearch, {
    enabled: Boolean(dataSearch.email) || Boolean(dataSearch.pic),
  });
  const resGetListService = useApicalGetListService({
    page: paginationModel.page,
    size: paginationModel.pageSize
  }, {
    enabled: !(Boolean(dataSearch.email) || Boolean(dataSearch.pic)),
  });
  const resUserByRole = useApiUserSearchByRole({ role: 'mod' });

  const tableData = resSearchService.data || resGetListService.data?.content || []
  const servicesCount = resSearchService.data ? resSearchService.data.length : resGetListService.data?.totalElements || 0
  const listUserPIC: ViewedUser[] = resUserByRole.data || []

  // TODO: add i18n for columns
  const serviceColumns: GridColDef<Service>[] = [
    {
      field: 'paidServiceId',
      headerName: t('Paid service Id'),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'serviceId',
      headerName: t('Master Service Id'),
      width: 130,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'statusService',
      headerName: t('Status'),
      sortable: false,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value as Status}></StatusBadge>;
      },
    },
    {
      field: 'kycStatus',
      headerName: t('KYC'),
      sortable: false,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value as Status}></StatusBadge>;
      },
    },
    {
      field: 'corporationProfileStatus',
      headerName: t('Corporation profile'),
      sortable: false,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value as Status}></StatusBadge>;
      },
    },
    {
      field: 'statusPayment',
      headerName: t('Payment'),
      sortable: false,
      type: 'string',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        return <StatusBadge status={params.value}></StatusBadge>;
      },
    },
    {
      field: 'serviceName',
      headerName: t('Service Name'),
      sortable: false,
      type: 'string',
      width: 300,
    },
    {
      field: 'customerName',
      headerName: t('Customer Name'),
      sortable: false,
      width: 200,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => {
        let name = `${params.row?.firstName} ${params.row?.lastName}`;
        return <>{name}</>;
      },
    },
    {
      field: 'phone',
      headerName: t('Phone number'),
      sortable: false,
      width: 120,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => {
        return <> {params.row?.codePhone} {params.row?.phone}</>;
      },

    },
    {
      field: 'email',
      headerName: t('Email'),
      sortable: false,
      width: 200,
      type: 'string',
    },
    {
      field: 'pic',
      headerName: t('PIC'),
      sortable: false,
      type: 'string',
      width: 200,
    },
  ];

  //TODO: search funtion
  const search = (data?: Partial<ApiSearchPaidServiceType>) => {
    setDataSearch(data as ApiSearchPaidServiceType);
  };

  const onResetFilter = () => {
    resGetListService.refetch();
  };

  //TODO: api service by id
  const [serviceDetail, setServiceDetail] = useState<Service | null>(null);

  // @ts-ignore
  const resGetServiceId = useApiGetServiceDetail(selectService?.id, {
    enabled: Boolean(selectService?.id),
  });

  useEffect(() => {
    if (resGetServiceId.data) {
      setServiceDetail(resGetServiceId.data);
      setIsShowServiceDetailDialog(true);
    }
  }, [resGetServiceId.data, resGetServiceId.isFetching]);

  //TODO: api công ty theo user
  const [companyDetail, setCompanyDetail] = useState<CompanyDetail | null>(
    null,
  );

  // @ts-ignore
  const resCompanyId = useApiGetMyCompanyDetail(serviceDetail?.userId, {
    enabled: Boolean(serviceDetail?.userId),
  });

  useEffect(() => {
    if (resCompanyId.data) {
      setCompanyDetail(resCompanyId.data);
    }
  }, [resCompanyId.data, resCompanyId.isFetching]);

  async function onClickDetail(data: Service) {
    setSelectService(data);
  }

  //TODO: xử lý lỗi
  const handleClickSubmitSearchService = () => {
    resSearchService.refetch();
  };

  const handleClickSubmitGetListService = () => {
    resGetListService.refetch();
  };

  const handleClickSubmitGetServiceId = () => {
    resGetServiceId.refetch();
  };

  const handleClickSubmitGetMyCompanyDetail = () => {
    resCompanyId.refetch();
  };

  const handleClickSubmitGetUserByRole = () => {
    resUserByRole.refetch();
  };

  return (
    <div className={'w-full grow flex flex-col p-3'}>
      {(        resGetServiceId.isFetching ||
        resUserByRole.isFetching ||
        resCompanyId.isFetching) && <DialogRequestingFullscreen />}

      {resSearchService.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resSearchService?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitSearchService}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Try again')}</span>
            </button>
          }
        />
      )}
      {resGetListService.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resGetListService?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitGetListService}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Try again')}</span>
            </button>
          }
        />
      )}

      {resGetServiceId.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resGetServiceId?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitGetServiceId}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Try again')}</span>
            </button>
          }
        />
      )}

      {resUserByRole.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resUserByRole?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitGetUserByRole}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Try again')}</span>
            </button>
          }
        />
      )}

      {resCompanyId.isError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={resCompanyId?.error?.message}
          actionElement={
            <button
              onClick={handleClickSubmitGetMyCompanyDetail}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Try again')}</span>
            </button>
          }
        />
      )}

      <div
        className={
          'flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8'
        }
      >
        <p className={'text-h4 w-full text-start mb-6'}>
          {t('Services Management')}
        </p>
        <ServiceFilter
          onSubmit={search}
          onReset={onResetFilter}
          loading={resSearchService.isFetching}
        />
        <div className={'w-full grow'}>
          <DataGrid
            paginationMode="server"
            rows={tableData ?? []}
            columns={serviceColumns}
            pageSizeOptions={[25]}
            rowCount={servicesCount || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => setPaginationModel(model)}
            onRowClick={(param: GridRowParams<Service>) =>
              onClickDetail(param.row)
            }
            loading={
              resSearchService.isFetching || resGetListService.isFetching
            }
          />
        </div>
        {isShowServiceDetailDialog && (
          <DialogContainer
            onClose={(shouldOpen) => {
              setIsShowServiceDetailDialog(false);
              setSelectService(null);
              resGetListService.refetch();
            }}
            isCloseOnClickOverlay
            isFullSize
            isAutoSize
            panelClassName={'max-w-[1200px]'}
          >
            <ServiceDetailDialog
              service={serviceDetail}
              resGetServiceId={resGetServiceId}
              listUserPIC={listUserPIC}
              companyDetail={companyDetail}
              resSearchService={resSearchService}
              resGetListService={resGetListService}
            />
          </DialogContainer>
        )}
      </div>
    </div>
  );
}
