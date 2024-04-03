import { UseQueryResult } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UploadedDocumentType } from '../api/types';
import { getFile } from '../api/upload';
import { Status } from '../constants/StatusBadge';
import { NONE_REQUIRED } from '../constants/global';
import {
  useApiSendPaymentReminder,
  useApiSendRequiredDocumentReminder,
  useApiServiceUpdateAdminRemark,
  useApiServiceUploadServiceResult,
  useApiServiceUploadStatusStep,
} from '../hooks-api/useServiceApi';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { ApiFileWrap, Service, ServiceStep } from '../types/service';
import { FormFieldSelect } from './FormFieldSelect';
import InputFile from './InputFile';
import { IconAltArrowDown } from './icons';

import { Menu, Transition } from '@headlessui/react';
import { cn } from '../utils/cn.util';
import ButtonCs from './ButtonCs';
import { SERVICE_STEP_STATUS } from './ServiceDetailDialog';
import { StatusBadge } from './StatusBadge';

type Props = {
  serviceStep: ServiceStep | null;
  resGetServiceId?: UseQueryResult<Service, Error>;
  service: Service | null;
};

type FileResult = ApiFileWrap & Partial<{ fileData: File }>
export function ServiceStepContent({
  serviceStep,
  resGetServiceId,
  service,
}: Props) {
  const { t } = useTranslation();

  const [fileResults, setFileResults] = useState<FileResult[]>([]);
  const [adminRemark, setAdminRemark] = useState('');
  const [statusStep, setStatusStep] = useState('');

  const { validateCaller, validateAll } = useValidateCaller();

  useEffect(() => {
    setAdminRemark(serviceStep?.adminRemark ?? '');
    setStatusStep(serviceStep?.statusStep ?? '');
    setFileResults(serviceStep?.result || [])
  }, [serviceStep, service]);

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

  const mutateUploadFile = useApiServiceUploadServiceResult();

  const handleChangeFile = async (fileData: File | undefined, id: number) => {
    const newFileResults = [...fileResults]
    const fileChanged = newFileResults.find(fileResult => fileResult.id === id)
    if (!serviceStep || !fileChanged) {
      return
    }
    if (fileData) {
      const formData = new FormData();
      formData.append('files', fileData);
      formData.append('id', id.toString());
      try {
        const res = await mutateUploadFile.mutateAsync(formData);
        fileChanged.fileDocument = res.data?.[0] || null
        toast.success(t('Update file successfully'));
        resGetServiceId?.refetch();
      } catch
        (error) {
        toast.error(String(error));
        console.error('error: ', error);
      }
    } else {
      fileChanged.fileDocument = null
    }
    fileChanged.fileData = fileData
    setFileResults(newFileResults)
  }

  const handleMenuItemClick = (option: any) => {
    option.click && option.click();
  };

  const mutateSendPaymentReminder = useApiSendPaymentReminder();
  const mutateSendRequiredDocumentReminder =
    useApiSendRequiredDocumentReminder();

  const handleSendPaymentReminder = () => {
    mutateSendPaymentReminder.mutate(
      {
        email: service?.email,
      },
      {
        onSuccess: (data) => {
          toast.success(t('Send Payment Reminder successfully'));
        },
        onError: (error) => {
          toast.error(String(error));
        },
      },
    );
  };

  const handleSendRequiredDocumentReminder = () => {
    const listDocArr = serviceStep?.customerDocument.map(
      (doc) => doc.requiredDocument,
    );
    mutateSendRequiredDocumentReminder.mutate(
      {
        email: service?.email,
        listDoc: listDocArr,
      },
      {
        onSuccess: (data) => {
          toast.success(t('Send Required Document Reminder successfully'));
        },
        onError: (error) => {
          toast.error(String(error));
        },
      },
    );
  };

  type OptionType = {
    label?: string;
    click?: () => void;
    disabled?: boolean;
    loading?: boolean;
  };

  const disabledDocumentReminder = serviceStep?.customerDocument.every(item => item.fileDocument)

  const OPTIONS: OptionType[] = [
    {
      label: t('Send Payment Reminder'),
      click: () => {
        handleSendPaymentReminder();
      },
      disabled: service?.statusPayment === Status.APPROVED,
      loading: mutateSendPaymentReminder.status === 'pending',
    },
    {
      label: t('Send Required Document Reminder'),
      click: () => {
        handleSendRequiredDocumentReminder();
      },
      disabled: disabledDocumentReminder,
      loading: mutateSendRequiredDocumentReminder.status === 'pending',
    },
  ];

  return (
    <div className={'w-full border border-primary_25 rounded-xl py-lg px-xl'}>
      <div className={'flex gap-4 mb-4 items-center '}>
        <div className={'font-bold text-xl w-full lg:w-[60%] mr-auto'}>
          {serviceStep?.stepName}
        </div>
        <div className="flex gap-4 items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                {t('Send Reminder')}
                <IconAltArrowDown
                  className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {OPTIONS.map((option, index) => (
                    <Menu.Item key={index}>
                      {({ active }) =>
                        option.disabled ? (
                          <ButtonCs
                            className={`w-full justify-start rounded-none bg-transparent text-primary opacity-50 cursor-not-allowed`}
                          >
                            {option.label}
                          </ButtonCs>
                        ) : (
                          <ButtonCs
                            onClick={() =>
                              !option?.loading && handleMenuItemClick(option)
                            }
                            isLoading={option?.loading}
                            className={cn(
                              `w-full justify-start rounded-none`,
                              active
                                ? 'bg-primary'
                                : 'bg-transparent text-primary',
                              option?.loading
                                ? 'opacity-50 cursor-not-allowed'
                                : '',
                            )}
                          >
                            {option.label}
                          </ButtonCs>
                        )
                      }
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <FormFieldSelect
            id={'serviceStepStatus'}
            onChange={uploadStatusStep}
            validateCaller={validateCaller}
            optionInfos={SERVICE_STEP_STATUS}
            value={statusStep as Status}
          ></FormFieldSelect>
        </div>
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
          <div className="border-b  border-primary_25 grid grid-cols-1 lg:grid-cols-2 gap-md items-center py-md">
            <div className="px-md text-left lg:text-center">
              {t('Required document')}
            </div>
            <div className="px-md text-left lg:text-center">
              {t('Uploaded document')}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md items-center py-md">
            {serviceStep?.customerDocument.map((item, index) => (
              <Fragment key={`result${item.id}`}>
                <div className="text-[#3B3F48]/85 px-md text-left lg:text-center">
                  {index + 1}. {item.requiredDocument}
                </div>
                <div className="px-md text-left lg:text-center">
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
          <div className="border-b  border-primary_25 grid grid-cols-1 lg:grid-cols-2 gap-md items-center py-md">
            <div className="px-md text-left lg:text-center">
              {t('Required document')}
            </div>
            <div className="px-md text-left lg:text-center">
              {t('Uploaded document')}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md items-center py-md">
            {fileResults.map((fileResult, index) => (
              <Fragment key={`customerDocument${fileResult.id}`}>
                <div className="px-md text-[#3B3F48]/85 text-left lg:text-center">
                  {index + 1}. {fileResult.requiredDocument}
                </div>
                <div className="px-md flex justify-start lg:justify-center items-center text-left lg:text-center">
                  <InputFile
                    key={`file${fileResult.id}`}
                    label={t('Upload')}
                    onChange={(file) => handleChangeFile(file, fileResult.id)}
                    fileName={fileResults?.find(i=>i.id === fileResult.id)?.fileDocument || undefined}
                    maxSize={10}
                    accept="*"
                    disabled={fileResult.requiredDocument === NONE_REQUIRED}
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
