import { StatusBadge } from './StatusBadge';
import { useTranslation } from 'react-i18next';
import { Service } from '../types/service';

type Props = {
  service: Service | null;
};

export function StateFilling(props: Props) {
  const translation = useTranslation();
  return (
    <div className={'w-full p-3'}>
      <div className={'flex gap-4 mb-4'}>
        <div className={'font-bold text-xl'}>State Filling</div>
        <button className="w-[150px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2 ml-auto self-end">
          Send Reminder
        </button>
        <StatusBadge status={props.service?.status} showDot />
      </div>
      <div className={'mb-4'}>
        <div className={'text-lg font-bold mb-2'}>
          {translation.t("Admin's remark")}
        </div>
        <textarea
          className={'w-full p-2 border border-gray-300'}
          maxLength={500}
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
        <div className={'text-lg font-bold mb-2'}>
          {translation.t('Result document')}
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
          <div
            className={'flex justify-between items-start h-[100px] py-2 px-4'}
          >
            <div className={'text-lg font-bold mb-2'}>
              {translation.t('Uploaded document')}
            </div>
            <button className="w-[85px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2">
              {translation.t('Upload')}
            </button>
          </div>
        </div>
      </div>

      <div className={'flex gap-4 justify-center'}>
        <button className="w-[100px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2">
          {translation.t('Cancel')}
        </button>
        <button className="w-[100px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2">
          {translation.t('Save')}
        </button>
      </div>
    </div>
  );
}
