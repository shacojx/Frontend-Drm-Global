import { useTranslation } from 'react-i18next';
import { StatusBadge } from './StatusBadge';
import { ServiceStep } from '../types/service';
import { useEffect, useState } from 'react';
import {
  callApiUpdateAdminRemark,
  callApiUploadStatusStep,
} from '../api/serviceManagement';
import { Status } from '../constants/StatusBadge';
import { ResultDocument } from './service/ResultDocument';
import { toast } from 'react-toastify';

type Props = {
  serviceStep: ServiceStep | null;
  serviceId: number | null;
};

export function ServiceStepContent(props: Props) {
  const translation = useTranslation();

  const [adminRemark, setAdminRemark] = useState('');
  const [statusStep, setStatusStep] = useState('');

  useEffect(() => {
    setAdminRemark(props.serviceStep?.adminRemark ?? '');
    setStatusStep(props.serviceStep?.statusStep ?? '');
  }, [props.serviceStep]);

  async function updateAdminRemark() {
    if (props.serviceStep) {
      await callApiUpdateAdminRemark({
        id: props.serviceStep?.id,
        adminRemark,
      });
    }
  }

  async function uploadStatusStep(status: Status) {
    if (props.serviceStep) {
      try {
        await callApiUploadStatusStep({
          id: props.serviceStep?.id,
          status,
        });
        setStatusStep(status);
        toast.success(translation.t('Update status step successfully'));
      } catch (e) {
        toast.error(translation.t('Update status step failed'));
      }
    }
  }

  return (
    <div className={'w-full p-3'}>
      <div className={'flex gap-4 mb-4 items-center'}>
        <div className={'font-bold text-xl mr-auto'}>
          {props.serviceStep?.stepName}
        </div>
        <StatusBadge status={statusStep as Status} showDot />
        {statusStep === Status.PENDING && (
          <button
            className="w-[130px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={() => {
              void uploadStatusStep(Status.IN_PROGRESS);
            }}
          >
            {translation.t('Set In Progress')}
          </button>
        )}
        {statusStep === Status.IN_PROGRESS && (
          <button
            className="w-[85px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={() => {
              void uploadStatusStep(Status.ISSUED);
            }}
          >
            {translation.t('Set Issued')}
          </button>
        )}
      </div>
      <div className={'mb-4'}>
        <div className={'flex gap-4 mb-2 items-center'}>
          <span className={'text-lg font-bold'}>
            {translation.t("Admin's remark")}
          </span>
          <button
            className="w-[100px] h-[35px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={() => updateAdminRemark()}
          >
            {translation.t('Save')}
          </button>
        </div>
        <textarea
          className={'w-full p-2 border border-gray-300'}
          maxLength={500}
          value={adminRemark}
          onChange={(e) => setAdminRemark(e.target.value)}
        ></textarea>
      </div>
      <div className={'mb-4'}>
        <div className={'text-lg font-bold mb-2'}>
          {translation.t('Customer document')}
        </div>
        <div
          className={
            'grid grid-cols-2 border border-gray-300 bg-gray-100 rounded-xl'
          }
        >
          <div className={'h-[100px] border-r border-gray-300 py-2 px-4'}>
            <div className={'text-lg font-bold mb-2'}>
              {translation.t('Required document')}
            </div>
            <span> {translation.t('None')}</span>
          </div>
          <div className={'h-[100px] py-2 px-4'}>
            <div className={'text-lg font-bold mb-2'}>
              {translation.t('Uploaded document')}
            </div>
          </div>
        </div>
      </div>
      <div className={'mb-4'}>
        <ResultDocument
          serviceStep={props.serviceStep}
          serviceId={props.serviceId}
        />
      </div>
    </div>
  );
}
