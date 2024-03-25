import React, { Fragment, useEffect, useState } from 'react';
import { ServiceStep } from '../../types/service';
import { useTranslation } from 'react-i18next';
import { getFile, uploadFile } from '../../api/upload';
import { callApiGetServiceDetail } from '../../api/serviceManagement';
import { IconX } from '../icons';
import { toast } from 'react-toastify';

type Props = {
  serviceStep: ServiceStep | null;
  serviceId: number | null;
};

export function ResultDocument(props: Props) {
  const translation = useTranslation();

  const [serviceStep, setServiceStep] = useState<ServiceStep | null>();

  useEffect(() => {
    setServiceStep(props.serviceStep);
  }, [props.serviceStep]);

  async function uploadServiceResult(files: FileList | null, resultId: number) {
    if (files && files?.length > 0) {
      try {
        await uploadFile(
          files[0],
          { id: resultId },
          '/api/file/upload-service-result',
        );

        toast.success(translation.t('Upload result file successfully'));

        if (props.serviceId) {
          const serviceDetail = await getServiceDetail(props.serviceId);
          const newServiceStep = serviceDetail?.serviceStep?.find(
            (item) => item?.id === serviceStep?.id,
          );
          const newResult = newServiceStep?.result ?? [];
          serviceStep &&
            setServiceStep({
              ...serviceStep,
              result: [...newResult],
            });
        }
      } catch (e) {
        toast.error(translation.t('Upload result file failed'));
      }
    }
  }

  function removeResultFile(resultId: number) {
    const newResult =
      serviceStep?.result?.map((item) => {
        if (resultId === item.id) {
          return {
            ...item,
            fileDocument: '',
          };
        }
        return item;
      }) ?? [];

    serviceStep && setServiceStep({ ...serviceStep, result: [...newResult] });
  }

  async function getServiceDetail(serviceId: number) {
    return await callApiGetServiceDetail(serviceId);
  }

  return (
    <div>
      <div className={'text-lg font-bold mb-2'}>
        {translation.t('Result document')}
      </div>
      <div
        className={
          'grid grid-cols-2 border border-gray-300 bg-gray-100 rounded-xl'
        }
      >
        <div
          className={
            'flex flex-col h-[100px] border-r border-gray-300 py-2 px-4'
          }
        >
          <div className={'text-lg font-bold'}>
            {translation.t('Required document')}
          </div>
          {props.serviceStep?.result?.map((result) => {
            return (
              <div
                className={
                  'text-center mt-2 h-[40px] flex items-center justify-center'
                }
              >
                {result.requiredDocument}
              </div>
            );
          }) || (
            <span className={'text-center mt-2'}> {translation.t('None')}</span>
          )}
        </div>
        <div className={'flex flex-col items-start h-[100px] py-2 px-4'}>
          <div className={'text-lg font-bold'}>
            {translation.t('Uploaded document')}
          </div>
          {serviceStep?.result?.map((result) => {
            return result.fileDocument ? (
              <div
                className={'h-[40px] flex gap-2 self-center items-center mt-2'}
              >
                <span
                  className={'text-center cursor-pointer hover:underline'}
                  onClick={() => {
                    result.fileDocument && getFile(result.fileDocument).then();
                  }}
                >
                  {result.fileDocument}
                </span>
                <IconX
                  className={'cursor-pointer'}
                  onClick={() => {
                    removeResultFile(result.id);
                  }}
                />
              </div>
            ) : (
              <Fragment>
                <button
                  className="w-[85px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2 self-center mt-2"
                  onClick={() => {
                    document.getElementById('resultPicker')?.click();
                  }}
                >
                  {translation.t('Upload')}
                </button>
                <input
                  id="resultPicker"
                  type="file"
                  className={'hidden'}
                  onChange={(e) => {
                    void uploadServiceResult(e.target.files, result.id);
                  }}
                  multiple={false}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
