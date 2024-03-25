import { IconCheckCircle, IconMyService, IconUser } from './icons';
import { useTranslation } from 'react-i18next';
import { FormFieldSelect } from './FormFieldSelect';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { OptionInfo } from '../types/common';
import { StatusBadge } from './StatusBadge';
import { Service, ServiceStep } from '../types/service';
import { DialogContainer } from './DialogContainer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CompanyDetailDialog } from './CompanyDetailDialog';
import { ViewedUser } from '../api/types';
import { callApiUpdatePic } from '../api/serviceManagement';
import { ServiceStepContent } from './ServiceStepContent';
import { Status } from '../constants/StatusBadge';
import { uploadFile } from '../api/upload';

type Props = {
  users: ViewedUser[];
  service: Service | null;
};

export function ServiceDetailDialog(props: Props) {
  const translator = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [showCompanyDetailDialog, setShowCompanyDetailDialog] = useState(false);
  const [picId, setPicId] = useState<number>();
  const [serviceStep, setServiceStep] = useState<ServiceStep | null>(null);

  const uploadFileRef = useRef<HTMLInputElement | null>(null);

  const cycleOptions: OptionInfo<number>[] = [{ value: 1, label: '1' }];
  const userOptions = useMemo(() => {
    return props.users.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [props.users]);

  useEffect(() => {
    const defaultServiceStep = props.service?.serviceStep[0] ?? null;
    const serviceStep = props.service?.serviceStep.find(
      (item) => item.statusStep === Status.IN_PROGRESS,
    );
    setServiceStep(serviceStep ?? defaultServiceStep);
  }, [props.service]);

  async function handleChangePic(id: number) {
    const user = props.users?.find((item) => item.id === id);
    await callApiUpdatePic({ id, email: user?.email ?? '' });
    setPicId(id);
  }

  async function uploadContractFile(files: FileList | null) {
    if (files && files?.length > 0) {
      await uploadFile(
        files[0],
        { id: props.service?.id?.toString() ?? '' },
        '/api/file/upload-final-contract',
      );
    }
  }

  return (
    <div className={'p-6'}>
      <div className={'font-bold text-xl mb-4'}>
        {props.service?.serviceName}
      </div>

      <div className={'grid grid-cols-3 gap-4 mb-4' + ''}>
        <div className={'flex flex-col gap-3'}>
          <div className={'font-bold'}>Nguyễn Văn A</div>
          <span>Email: </span>
          <span>Phone number: </span>
        </div>
        <div className={'flex flex-col gap-3'}>
          <div className={'font-bold'}>Global Ecommerce</div>
          <span>Nation: United States</span>
          <span>Industry: Ecommerce</span>
        </div>
        <div className={'flex flex-col gap-3 ml-auto'}>
          <div className={'grid grid-cols-2 gap-2'}>
            <FormFieldSelect
              placeholder={'Cycle'}
              id={'cycleSelect'}
              onChange={() => {}}
              validateCaller={validateCaller}
              optionInfos={cycleOptions}
            ></FormFieldSelect>
            <StatusBadge
              status={props.service?.statusService as Status}
              showDot
            />
          </div>
          <div>
            <div className={'font-bold'}>
              {translator.t('Person in charge')} *
            </div>
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

      <div className={'grid grid-cols-4 gap-4 mb-4'}>
        <div
          className={
            'w-full h-[100px] radius rounded-lg bg-green-300 border p-3 flex flex-col justify-between'
          }
        >
          <div className={'flex font-bold text-lg items-center gap-2'}>
            <IconMyService></IconMyService>
            <span>{translator.t('Contract')}</span>
          </div>
          <div
            className={
              'text-xs font-bold text-right text-cyan-500 underline cursor-pointer'
            }
            onClick={() => {
              uploadFileRef?.current?.click();
            }}
          >
            Click here to upload contract
          </div>
          <input
            ref={uploadFileRef}
            id="contractFilePicker"
            type="file"
            className={'hidden'}
            onChange={(e) => {
              uploadContractFile(e.target.files);
            }}
            multiple={false}
          />
        </div>
        <div
          className={
            'w-full h-[100px] radius rounded-lg bg-green-300 border p-3 flex flex-col justify-between'
          }
        >
          <div className={'flex font-bold text-lg items-center gap-2'}>
            <IconMyService></IconMyService>
            <span>{translator.t('KYC')}</span>
          </div>
          <div
            className={
              'text-xs font-bold text-right text-cyan-500 underline cursor-pointer'
            }
          >
            View KYC Status
          </div>
        </div>
        <div
          className={
            'w-full h-[100px] radius rounded-lg bg-green-300 border p-3 flex flex-col justify-between'
          }
        >
          <div className={'flex font-bold text-lg items-center gap-2'}>
            <IconMyService></IconMyService>
            <span>{translator.t('Payment')}</span>
          </div>
          <div
            className={
              'text-xs font-bold text-right text-cyan-500 underline cursor-pointer'
            }
          >
            Click here to upload contract
          </div>
        </div>
        <div
          className={
            'w-full h-[100px] radius rounded-lg bg-green-300 border p-3 flex flex-col justify-between'
          }
        >
          <div className={'flex font-bold text-lg items-center gap-2'}>
            <IconUser></IconUser>
            <span>{translator.t('Corporation Profile')}</span>
          </div>
          <div
            className={
              'text-xs font-bold text-right text-cyan-500 underline cursor-pointer'
            }
            onClick={() => {
              setShowCompanyDetailDialog(true);
            }}
          >
            {translator.t('Click here to edit')}
          </div>
        </div>
      </div>

      <div className={'grid grid-cols-4 gap-4'}>
        <div className={'flex flex-col gap-4'}>
          {props.service?.serviceStep.map((serviceStep) => {
            return (
              <div
                className={
                  'w-full flex gap-6 p-4 bg-gray-100 border rounded-md items-center'
                }
                key={serviceStep.id}
                onClick={() => {
                  setServiceStep(serviceStep);
                }}
              >
                <IconCheckCircle className={'w-[25px]'} />
                <div>
                  <div className={'font-semibold'}>{serviceStep.stepName}</div>
                  <div className={'text-gray-400'}>
                    {serviceStep.estimatedCompletionTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={'col-span-3'}>
          <ServiceStepContent serviceStep={serviceStep} />
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
            <CompanyDetailDialog />
          </DialogContainer>
        )}
      </div>
    </div>
  );
}
