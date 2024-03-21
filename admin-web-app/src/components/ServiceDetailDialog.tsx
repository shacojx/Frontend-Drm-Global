import { IconCheckCircle, IconMyService, IconUser } from './icons';
import { useTranslation } from 'react-i18next';
import { StateFilling } from './StateFilling';
import { FormFieldSelect } from './FormFieldSelect';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { OptionInfo } from '../types/common';
import { StatusBadge } from './StatusBadge';
import { Service } from '../types/service';
import { Status } from '../types/status';

type Props = {
  service: Service | null;
};

export function ServiceDetailDialog(props: Props) {
  const translator = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();

  const cycleOptions: OptionInfo<number>[] = [{ value: 1, label: '1' }];
  const picOptions: OptionInfo<number>[] = [
    { value: 1, label: 'Nguyễn văn A' },
  ];

  return (
    <div className={'p-6'}>
      <div className={'font-bold text-xl mb-4'}>[U001S002C03] Services</div>

      <div className={'grid grid-cols-3 gap-4 mb-4' + ''}>
        <div className={'flex flex-col gap-3'}>
          <div className={'font-bold'}>Victor Hugo Blitz</div>
          <span>Email: customer @ gmail</span>
          <span>Phone number: 000000</span>
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
            <StatusBadge status={props.service?.status as Status} showDot />
          </div>
          <div>
            <div className={'font-bold'}>
              {translator.t('Person in charge')} *
            </div>
            <FormFieldSelect
              id={'picSelect'}
              onChange={() => {}}
              validateCaller={validateCaller}
              optionInfos={picOptions}
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
              'text-xs text-right text-cyan-500 underline cursor-pointer'
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
            <IconMyService></IconMyService>
            <span>{translator.t('KYC')}</span>
          </div>
          <div
            className={
              'text-xs text-right text-cyan-500 underline cursor-pointer'
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
              'text-xs text-right text-cyan-500 underline cursor-pointer'
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
              'text-xs text-right text-cyan-500 underline cursor-pointer'
            }
          >
            Click here to upload contract
          </div>
        </div>
      </div>

      <div className={'grid grid-cols-4 gap-4'}>
        <div className={'flex flex-col gap-4'}>
          <div
            className={
              'w-full flex gap-6 p-4 bg-gray-100 border rounded-md items-center'
            }
          >
            <IconCheckCircle className={'w-[25px]'} />
            <div>
              <div className={'font-semibold'}>
                {translator.t('State Fillings')}
              </div>
              <div className={'text-gray-400'}>
                {translator.t('2 - 5 days')}
              </div>
            </div>
          </div>
          <div
            className={
              'w-full flex gap-6 p-4 bg-gray-100 border rounded-md items-center'
            }
          >
            <IconCheckCircle className={'w-[25px]'} />
            <div>
              <div className={'font-semibold'}>
                {translator.t('Communication')}
              </div>
              <div className={'text-gray-400'}>
                {translator.t('2 - 5 days')}
              </div>
            </div>
          </div>
          <div
            className={
              'w-full flex gap-6 p-4 bg-gray-100 border rounded-md items-center'
            }
          >
            <IconCheckCircle className={'w-[25px]'} />
            <div>
              <div className={'font-semibold'}>{translator.t('EIN')}</div>
              <div className={'text-gray-400'}>
                {translator.t('2 - 5 days')}
              </div>
            </div>
          </div>
          <div
            className={
              'w-full flex gap-6 p-4 bg-gray-100 border rounded-md items-center'
            }
          >
            <IconCheckCircle className={'w-[25px]'} />
            <div>
              <div className={'font-semibold'}>
                {translator.t('Bank Account')}
              </div>
              <div className={'text-gray-400'}>
                {translator.t('2 - 5 days')}
              </div>
            </div>
          </div>
        </div>
        <div className={'col-span-3'}>
          <StateFilling></StateFilling>
        </div>
      </div>
    </div>
  );
}
