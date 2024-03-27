import { useTranslation } from 'react-i18next';
import { StatusBadge } from './StatusBadge';
import { Service, ServiceStep } from '../types/service';
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
import {
  useApiServiceUpdateAdminRemark,
  useApiServiceUploadFinalContract,
  useApiServiceUploadStatusStep,
} from '../hooks-api/useServiceApi';
import { QueryClient, UseQueryResult } from '@tanstack/react-query';
import KeyFactory, {
  QueryKeyApi,
} from '../services-base/reactQuery/keyFactory';

type Props = {
  serviceStep: ServiceStep | null;
  serviceId?: number | null;
  resGetServiceId?: UseQueryResult<Service, Error>;
};

export function ServiceStepContent({
  serviceStep,
  serviceId,
  resGetServiceId,
}: Props) {
  const { t } = useTranslation();

  const [file, setFile] = useState<File[]>([]);

  const [adminRemark, setAdminRemark] = useState('');
  const [statusStep, setStatusStep] = useState('');

  useEffect(() => {
    setAdminRemark(serviceStep?.adminRemark ?? '');
    setStatusStep(serviceStep?.statusStep ?? '');
    // @ts-ignore
    setFile(serviceStep?.result as File[]);
  }, [serviceStep]);

  const queryClient = new QueryClient();

  const mutateUpdateAdminRemark = useApiServiceUpdateAdminRemark();
  const mutateUploadStatusStep = useApiServiceUploadStatusStep();

  const updateAdminRemark = () => {
    if (serviceStep) {
      mutateUpdateAdminRemark.mutate(
        {
          id: serviceStep?.id,
          adminRemark,
        },
        {
          onSuccess: (data) => {
            toast.success(t('Update status remark successfully'));
          },
          onError: (error) => {
            toast.error(String(error));
          },
          onSettled: () => {
            resGetServiceId?.refetch();
          },
        },
      );
    }
  };

  const uploadStatusStep = (status: Status) => {
    if (serviceStep) {
      mutateUploadStatusStep.mutate(
        {
          id: serviceStep?.id,
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

  const onDownloadServiceUpload = (item: UploadedDocumentType) => {
    try {
      if (item.fileDocument) {
        getFile(item.fileDocument);
      }
    } catch (error) {
      toast.error(String(error));
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
        toast.success(t('Update file successfully'));
      }
    } catch (error) {
      toast.error(String(error));
      console.error('error: ', error);
    }
  };

  return (
    <div className={'w-full border border-primary_25 rounded-xl py-lg px-xl'}>
      <div className={'flex gap-4 mb-4 items-center'}>
        <div className={'font-bold text-xl mr-auto'}>
          {serviceStep?.stepName}
        </div>
        <StatusBadge status={statusStep as Status} showIcon />
        
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
            onClick={updateAdminRemark}
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
