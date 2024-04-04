import { UseQueryResult } from '@tanstack/react-query';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  CompanyDetail,
  RawResult,
  ViewedUser
} from '../api/types';
import { uploadFile } from '../api/upload';
import { Status } from '../constants/StatusBadge';
import {
  useApiServiceStatusUpdate,
  useApiServiceUpdatePic,
} from '../hooks-api/useServiceApi';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import {
  validateCompanyInfo,
  validateMailingAddress,
  validateOwnersInfo,
  validateResponseParty,
} from '../services-business/myCompany';
import { OptionInfo } from '../types/common';
import { Service, ServiceStep } from '../types/service';
import { cn } from '../utils/cn.util';
import { DialogContainer } from './DialogContainer';
import { FormFieldSelect } from './FormFieldSelect';
import { ServiceStepContent } from './ServiceStepContent';
import { IconCheck, IconMyService, IconUser } from './icons';
import { MyCompanyDetailPage } from './service/my-company/MyCompanyDetailPage';
import { StatusBadge } from './StatusBadge';

type Props = {
  service: Service | null;
  resGetServiceId?: UseQueryResult<Service, Error>;
  listUserPIC: ViewedUser[];
  companyDetail: CompanyDetail | null;
  resSearchService: UseQueryResult<Service[], Error>;
  resGetListService: UseQueryResult<RawResult<Service[]>, Error>;
};

type TabType = {
  id: number;
  icon: JSX.Element;
  header: string;
  detail?: string;
  status: Status;
  color: string;
  clickable?: boolean;
  onClick?: () => void;
};

export const SERVICE_STEP_STATUS = [
  {
    value: Status.PENDING,
    label: Status.PENDING,
  },
  {
    value: Status.IN_PROGRESS,
    label: Status.IN_PROGRESS,
  },
  {
    value: Status.ISSUED,
    label: Status.ISSUED,
  }
 ];

export function ServiceDetailDialog({
  service,
  resGetServiceId,
  listUserPIC,
  companyDetail,
  resSearchService,
  resGetListService,
}: Props) {
  const { t } = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [showCompanyDetailDialog, setShowCompanyDetailDialog] = useState(false);
  const [cycle, setCycle] = useState<number>();
  const [serviceStep, setServiceStep] = useState<ServiceStep | null>(null);

  const uploadFileRef = useRef<HTMLInputElement | null>(null);

  const cycleOptions: OptionInfo<number>[] = [{ value: 1, label: '1' }];

  const PIC_OPTION = useMemo(() => {
    return listUserPIC.map((item) => {
      return { value: item.email, label: item.email };
    });
  }, [listUserPIC]);

  useEffect(() => {
    const defaultServiceStep = service?.serviceStep[0] ?? null;
    const serviceStep = service?.serviceStep.find(
      (item) => item.statusStep === Status.IN_PROGRESS,
    );
    setCycle(service?.cycleNumber);
    setServiceStep(serviceStep ?? defaultServiceStep);
  }, [service]);

  const mutateUpdatePic = useApiServiceUpdatePic();

  const handleChangePic = (value: any) => {
    mutateUpdatePic.mutate(
      { id: service?.id as number, email: value ?? '' },
      {
        onSuccess: (data) => {
          toast.success(t('Update PIC successfully'));
        },
        onError: (error) => {
          toast.error(String(error));
        },
        onSettled: () => {
          resGetServiceId?.refetch();
          resGetListService?.refetch();
          resSearchService?.refetch();
        },
      },
    );
  };

  async function uploadContractFile(files: FileList | null) {
    if (files && files?.length > 0) {
      try {
        const res= await uploadFile(
          files[0],
          { id: service?.id?.toString() ?? '' },
          '/api/file/upload-final-contract',
        );
        if (res){
          toast.success(t('Upload contract file successfully'));
          resGetServiceId?.refetch();
        }
      } catch (error) {
        toast.error(String(error));
      }

    }
  }

  const dataTab: TabType[] = [
    {
      icon: <IconMyService className="w-6 h-6" />,
      header: t('Contract'),
      detail: t('Click here to upload contract'),
      status: service?.statusContract as Status,
      color: '#094B72',
      id: 1,
      clickable: true,
      onClick: () => {
        uploadFileRef?.current?.click();
      },
    },
    {
      icon: <IconMyService className="w-6 h-6" />,
      header: t('KYC'),
      status: service?.kycStatus as Status,
      color: '#FF5722',
      id: 2,
    },
    {
      icon: <IconMyService className="w-6 h-6" />,
      header: t('Payment'),
      status: service?.statusPayment as Status,
      color: '#FFC327',
      id: 3,
    },
    {
      icon: <IconUser className="w-6 h-6" />,
      header: t('Corporation Profile'),
      detail: t('Click here to edit'),
      status: service?.corporationProfileStatus as Status,
      color: '#5D50C6',
      id: 4,
      clickable: true,
      onClick: () => {
        setShowCompanyDetailDialog(true);
      },
    },
  ];

  const mutateUploadStatusStep = useApiServiceStatusUpdate();

  const uploadStatusService = (status: Status) => {
    if (service) {
      mutateUploadStatusStep.mutate(
        {
          id: service?.id,
          status,
        },
        {
          onSuccess: (data) => {
            toast.success(t('Update status step successfully'));
          },
          onError: (error) => {
            // toast.error(t('Update status step failed'));
            toast.error(String(error));
          },
          onSettled: () => {
            resGetServiceId?.refetch();
          },
        },
      );
    }
  };

  return (
    <div className={'p-6'}>
      <div className={'font-bold text-xl mb-4'}>{service?.serviceName}</div>

      <div className={'grid grid-cols-3 gap-4 mb-4' + ''}>
        <div className={'flex flex-col gap-3'}>
          <span className={'font-bold'}>
            {service?.lastName} {service?.firstName}
          </span>
          <span>Email: {service?.email}</span>
          <span>
            Phone number: {service?.codePhone} {service?.phone}
          </span>
        </div>
        <div className={'flex flex-col gap-3'}>
          <div className={'font-bold'}>
            {service?.companyName}&#160;
          </div>
          <span>Nation: {service?.nation}</span>
          <span>Industry: {service?.industry}</span>
        </div>
        <div className={'flex flex-col gap-3 ml-auto'}>
          <div className={'grid grid-cols-2 gap-2'}>
            <FormFieldSelect
              placeholder={'Cycle'}
              id={'cycleSelect'}
              onChange={setCycle}
              validateCaller={validateCaller}
              optionInfos={cycleOptions}
              value={cycle}
            ></FormFieldSelect>
            <StatusBadge status={service?.statusService as Status} showIcon></StatusBadge>
          </div>
          <div>
            <div className={'font-bold'}>{t('Person in charge')} *</div>
            <FormFieldSelect
              id={'userSelect'}
              onChange={handleChangePic}
              validateCaller={validateCaller}
              optionInfos={PIC_OPTION}
              value={service?.pic as string}
            ></FormFieldSelect>
          </div>
        </div>
      </div>

      <input
        ref={uploadFileRef}
        id="contractFilePicker"
        type="file"
        className={'hidden'}
        onChange={(e) => {
          void uploadContractFile(e.target.files);
        }}
        multiple={false}
      />
      <div
        className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4'}
      >
        {dataTab.map((item) => (
          <Fragment key={item.id}>
            <div
              className={cn(
                'relative w-full h-[100px] rounded-xl bg-[#F3F5F7] border border-primary_25 p-3 flex flex-col justify-between  ',
                { 'cursor-pointer  hover:shadow': item.clickable },
              )}
              onClick={item.onClick}
            >
              <div className="hidden bg-primary/15 bg-[#FF5722]/25 bg-[#1DD75B]/15 bg-[#094B72]/25 bg-[#FF5722]/25 bg-[#FFC327]/25 bg-[#5D50C6]/25"></div>
              <div className="absolute top-0 right-0">
                <div
                  className={cn(
                    'inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-bl-[12px] rounded-tr-[9px] ',
                    {
                      'bg-primary/15 text-primary_25':
                        item.status === Status.PENDING,
                    },
                    {
                      'bg-[#FF5722]/25 text-primary': [
                        Status.IN_PROGRESS,
                        Status.READY,
                      ].includes(item.status),
                    },
                    {
                      'bg-[#1DD75B]/15 text-primary': [
                        Status.ISSUED,
                        Status.APPROVED,
                        Status.CONFIRMED,
                      ].includes(item.status),
                    },
                  )}
                >
                  <IconCheck />
                </div>
              </div>
              <div className={'flex font-bold text-lg items-center gap-2'}>
                <div
                  className={cn(
                    'inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full ',
                    `bg-[${item.color}]/25`,
                  )}
                >
                  {item.icon}
                </div>
                <span>{item.header}</span>
              </div>
              <div className={'text-xs text-right text-[#A0AEC0s] '}>
                {item.detail}
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={'grid grid-cols-1 lg:grid-cols-12 gap-4'}>
        <div className={'flex flex-col gap-4 lg:col-span-2'}>
          {service?.serviceStep.map((item) => {
            return (
              <div
                className={cn(
                  'w-full border relative hover:shadow cursor-pointer border-primary_25 rounded-xl flex items-center gap-4 pl-lg px-md py-sm',
                  { 'shadow-lg border-primary': item.id === serviceStep?.id },
                )}
                key={item.id}
                onClick={() => {
                  setServiceStep(item);
                }}
              >
                <div>
                  <div className=" hidden bg-[#CCCCCC] bg-[#FF5722]/25 bg-success"></div>
                  <div
                    className={cn(
                      'inline-flex items-center text-white justify-center flex-shrink-0 w-5 h-5 rounded-full ',
                      {
                        'bg-[#CCCCCC] ': item.statusStep === Status.PENDING,
                      },
                      {
                        'bg-[#FF5722]/25':
                          item.statusStep === Status.IN_PROGRESS,
                      },
                      {
                        'bg-success': item.statusStep === Status.ISSUED,
                      },
                    )}
                  >
                    <IconCheck className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex-1 ">
                  <div className="line-clamp-1" title={item.stepName}>
                    {item.stepName}
                  </div>
                  <div
                    className="text-sm text-[#A0AEC0] line-clamp-1"
                    title={item.estimatedCompletionTime}
                  >
                    {item.estimatedCompletionTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={'lg:col-span-10'}>
          <ServiceStepContent
            serviceStep={serviceStep}
            service={service}
            resGetServiceId={resGetServiceId}
          />
        </div>
        {showCompanyDetailDialog && (
          <DialogContainer
            onClose={() => {
              setShowCompanyDetailDialog(false);
            }}
            isCloseOnClickOverlay
            isFullSize
            isAutoSize
            panelClassName={'max-w-[1200px] min-h-[70vh]'}
          >
            <MyCompanyDetailPage id={service?.userId as number} />
          </DialogContainer>
        )}
      </div>
    </div>
  );
}
