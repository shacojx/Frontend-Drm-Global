import { IconCheck, IconCheckCircle, IconMyService, IconUser } from './icons';
import { useTranslation } from 'react-i18next';
import { FormFieldSelect } from './FormFieldSelect';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { OptionInfo } from '../types/common';
import { StatusBadge } from './StatusBadge';
import { Service, ServiceStep } from '../types/service';
import { DialogContainer } from './DialogContainer';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { KycDetail, ViewedUser } from '../api/types';
import { callApiUpdatePic } from '../api/serviceManagement';
import { ServiceStepContent } from './ServiceStepContent';
import { Status } from '../constants/StatusBadge';
import { uploadFile } from '../api/upload';
import { MyCompanyDetailPage } from './service/my-company/MyCompanyDetailPage';
import { cn } from '../utils/cn.util';

type Props = {
  listUser: ViewedUser[];
  service: Service | null;
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

export function ServiceDetailDialog({ service, listUser }: Props) {
  const { t } = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [showCompanyDetailDialog, setShowCompanyDetailDialog] = useState(false);
  const [picId, setPicId] = useState<number>();
  const [cycle, setCycle] = useState<number>();
  const [serviceStep, setServiceStep] = useState<ServiceStep | null>(null);
  const [user, setUser] = useState<KycDetail>();

  const uploadFileRef = useRef<HTMLInputElement | null>(null);

  const cycleOptions: OptionInfo<number>[] = [{ value: 1, label: '1' }];

  const userOptions = useMemo(() => {
    return listUser.reduce((accumulator, item) => {
      if (item.roles.find((role) => role.name === 'ROLE_MODERATOR')) {
        return [...accumulator, { value: item.id, label: item.email }];
      }
      return accumulator;
    }, [] as OptionInfo<number>[]);
  }, [listUser]);

  useEffect(() => {
    const defaultServiceStep = service?.serviceStep[0] ?? null;
    const serviceStep = service?.serviceStep.find(
      (item) => item.statusStep === Status.IN_PROGRESS,
    );
    setCycle(service?.cycleNumber);
    setServiceStep(serviceStep ?? defaultServiceStep);
  }, [service]);

  useEffect(() => {
    if (service && listUser) {
      const user = listUser.find((item) => item.id === service?.userId);
      setUser(user as KycDetail);
      const picUser = listUser.find((item) => item.email === service?.pic);
      setPicId(picUser?.id);
    }
  }, [service, listUser]);

  async function handleChangePic(id: number) {
    const user = listUser?.find((item) => item.id === id);
    await callApiUpdatePic({ id, email: user?.email ?? '' });
    setPicId(id);
  }

  async function uploadContractFile(files: FileList | null) {
    if (files && files?.length > 0) {
      await uploadFile(
        files[0],
        { id: service?.id?.toString() ?? '' },
        '/api/file/upload-final-contract',
      );
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
      status: user?.kycStatus as Status,
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
      status: Status.PENDING as Status,
      color: '#5D50C6',
      id: 4,
      clickable: true,
      onClick: () => {
        setShowCompanyDetailDialog(true);
      },
    },
  ];

  return (
    <div className={'p-6'}>
      <div className={'font-bold text-xl mb-4'}>{service?.serviceName}</div>

      <div className={'grid grid-cols-3 gap-4 mb-4' + ''}>
        <div className={'flex flex-col gap-3'}>
          <span className={'font-bold'}>
            {user?.lastName} {user?.firstName}
          </span>
          <span>Email: {user?.email}</span>
          <span>
            Phone number: {user?.codePhone} {user?.phone}
          </span>
        </div>
        <div className={'flex flex-col gap-3'}>
          <div className={'font-bold'}>{user?.companyName}</div>
          <span>Nation: {user?.llcInNation}</span>
          <span>Industry: {user?.industry}</span>
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
            <StatusBadge status={service?.statusService as Status} showDot />
          </div>
          <div>
            <div className={'font-bold'}>{t('Person in charge')} *</div>
            <FormFieldSelect
              id={'userSelect'}
              onChange={handleChangePic}
              validateCaller={validateCaller}
              optionInfos={userOptions}
              value={picId}
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
      <div className={'grid grid-cols-4 gap-4 mb-4'}>
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

      <div className={'grid grid-cols-12 gap-4'}>
        <div className={'flex flex-col gap-4 col-span-2'}>
          {service?.serviceStep.map((item) => {
            return (
              <div
                className={cn(
                  'w-full border relative hover:shadow cursor-pointer border-primary_25 rounded-xl flex items-center gap-6 pl-xl px-md py-sm',
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
                <div className="flex-1">
                  <div className="">{item.stepName}</div>
                  <div className="text-sm text-[#A0AEC0]">
                    {item.estimatedCompletionTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={'col-span-10'}>
          <ServiceStepContent
            serviceStep={serviceStep}
            serviceId={service?.id ?? null}
          />
        </div>
        {showCompanyDetailDialog && (
          <DialogContainer
            handleClickOverlay={() => {
              setShowCompanyDetailDialog(false);
            }}
            isCloseOnClickOverlay
            isFullSize
            isAutoSize
            panelClassName={'max-w-[1200px]'}
          >
            {/*<CompanyDetailDialog />*/}
            <MyCompanyDetailPage />
          </DialogContainer>
        )}
      </div>
    </div>
  );
}
