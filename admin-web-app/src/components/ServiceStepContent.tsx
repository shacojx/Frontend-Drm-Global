import { useTranslation } from 'react-i18next';
import { StatusBadge } from './StatusBadge';
import { ServiceStep } from '../types/service';
import { Fragment, useEffect, useState } from 'react';
import {
  callApiUpdateAdminRemark,
  callApiUploadStatusStep,
} from '../api/serviceManagement';
import { Status } from '../constants/StatusBadge';
import { ResultDocument } from './service/ResultDocument';
import { toast } from 'react-toastify';
import { UploadedDocumentType } from '../api/types';
import { DialogFailureFullscreen } from './DialogFormStatusFullscreen';
import { getFile } from '../api/upload';
import InputFile from './InputFile';
import { NONE_REQUIRED } from '../constants/global';
import { useApiServiceUploadFinalContract } from '../hooks-api/useServiceApi';
import { QueryClient } from '@tanstack/react-query';
import KeyFactory from '../services-base/reactQuery/keyFactory';

type Props = {
  serviceStep: ServiceStep | null;
  serviceId: number | null;
};

export function ServiceStepContent({ serviceStep, serviceId }: Props) {
  const { t } = useTranslation();

  const [file, setFile] = useState<File[]>([]);

  const [adminRemark, setAdminRemark] = useState('');
  const [statusStep, setStatusStep] = useState('');
  const [visibleError, setVisibleError] = useState(false);
  const [contentError, setContentError] = useState<any>('');

  useEffect(() => {
    setAdminRemark(serviceStep?.adminRemark ?? '');
    setStatusStep(serviceStep?.statusStep ?? '');
    // @ts-ignore
    setFile(serviceStep?.result as File[])
    console.log('serviceStep?.result: ', serviceStep?.result);
  }, [serviceStep]);

  const queryClient = new QueryClient()
  
  async function updateAdminRemark() {
    if (serviceStep) {
     const res = await callApiUpdateAdminRemark({
        id: serviceStep?.id,
        adminRemark,
      }).then((data) => {
        queryClient.invalidateQueries({ queryKey: [KeyFactory.getServiceDetail(), {serviceId}] })
      });


    }
  }

  async function uploadStatusStep(status: Status) {
    if (serviceStep) {
      try {
        await callApiUploadStatusStep({
          id: serviceStep?.id,
          status,
        });
        setStatusStep(status);
        toast.success(t('Update status step successfully'));
      } catch (e) {
        toast.error(t('Update status step failed'));
      }
    }
  }

  const toggle = () => {
    setVisibleError(!visibleError);
  };

  const onDownloadServiceUpload = (item: UploadedDocumentType) => {
    try {
      if (item.fileDocument) {
        getFile(item.fileDocument);
      }
    } catch (error) {
      toggle();
      setContentError(error);
      console.error('error: ', error);
    }
  };

  const mutateUploadFile = useApiServiceUploadFinalContract();

  // @ts-ignore
  const handleChangeFile = async (file?: File, id: number) => {
    if (!file) {
      setFile((pre) => {
        let newArr: File[] = [...pre];
        // @ts-ignore
        newArr[id] = file;
        return newArr;
      });
      return;
    }
    const formData = new FormData();
    // @ts-ignore
    formData.append('files', file);
    // @ts-ignore
    formData.append('id', id);
    try {
      const res = await mutateUploadFile.mutateAsync(formData);
      if (res) {
        toast.success(res.message);
        setFile((pre) => {
          let newArr: File[] = [...pre];
          // @ts-ignore
          newArr[id] = file;
          return newArr;
        });
      }
    } catch (error) {
      toggle();
      setContentError(error);
      console.error('error: ', error);
    }
  };

  return (
    <div className={'w-full border border-primary_25 rounded-xl py-lg px-xl'}>
      {visibleError && (
        <DialogFailureFullscreen
          title="Failure!"
          subTitle={contentError}
          actionElement={
            <button
              onClick={toggle}
              className="w-full min-w-[300px] h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              <span>{t('Close')}</span>
            </button>
          }
        />
      )}
      <div className={'flex gap-4 mb-4 items-center'}>
        <div className={'font-bold text-xl mr-auto'}>
          {serviceStep?.stepName}
        </div>
        <StatusBadge status={statusStep as Status} showDot />
        {statusStep === Status.PENDING && (
          <button
            className="w-[130px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={() => {
              void uploadStatusStep(Status.IN_PROGRESS);
            }}
          >
            {t('Set In Progress')}
          </button>
        )}
        {statusStep === Status.IN_PROGRESS && (
          <button
            className="w-[85px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={() => {
              void uploadStatusStep(Status.ISSUED);
            }}
          >
            {t('Set Issued')}
          </button>
        )}
      </div>
      <div className={'mb-4'}>
        <div className={'flex gap-4 mb-2 items-center'}>
          <span className={'text-lg font-bold'}>{t("Admin's remark")}</span>
          <button
            className="w-[100px] h-[35px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
            onClick={() => updateAdminRemark()}
          >
            {t('Save')}
          </button>
        </div>
        <textarea
          className={'w-full p-2 border rounded-xl border-gray-300'}
          maxLength={500}
          value={adminRemark}
          onChange={(e) => setAdminRemark(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-rootRootPadding">
        <div className="text-base font-bold leading-6">
          {t('Customer document')}
        </div>
        <div className="border rounded-md border-primary_25 mt-md">
          <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
            <div className="px-md text-center">{t('Required document')}</div>
            <div className="px-md text-center">{t('Uploaded document')}</div>
          </div>
          <div className="grid grid-cols-2 gap-md items-center py-md">
            {serviceStep?.customerDocument.map((item, index) => (
              <Fragment key={`result${item.id}`}>
                <div className="text-[#3B3F48]/85 px-md text-center">
                  {index + 1}. {item.requiredDocument}
                </div>
                <div className="px-md text-center">
                  {item.fileDocument && (
                    <a
                      href="#"
                      className="text-primary font-bold hover:underline"
                      onClick={() => onDownloadServiceUpload(item)}
                    >
                      {index + 1}. {item.fileDocument}
                    </a>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-rootRootPadding">
        <div className="text-base font-bold leading-6">
          {t('Service Result')}
        </div>
        <div className="border rounded-md border-primary_25 mt-md">
          <div className="border-b  border-primary_25 grid grid-cols-2 gap-md items-center py-md">
            <div className="px-md text-center">{t('Required document')}</div>
            <div className="px-md text-center">{t('Uploaded document')}</div>
          </div>
          <div className="grid grid-cols-2 gap-md items-center py-md">
            {serviceStep?.result.map((item, index) => (
              <Fragment key={`customerDocument${item.id}`}>
                <div className="px-md text-[#3B3F48]/85 text-center">
                  {index + 1}. {item.requiredDocument}
                </div>
                <div className="px-md flex justify-center items-center">
                  <InputFile
                    key={`file${item.id}`}
                    label={t('Upload')}
                    onChange={(file) => handleChangeFile(file, item.id)}
                    file={file?.[item.id]}
                    maxSize={10}
                    accept=".pdf,.png,.jpeg,.jpg,.xls,.docx,.ppt"
                    disabled={item.requiredDocument === NONE_REQUIRED}
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
