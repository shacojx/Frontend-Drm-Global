import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormFieldSelect } from './FormFieldSelect';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { OptionInfo } from '../types/common';

export function MailingAddress() {
  const translation = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();

  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('yes');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  const countryOptions: OptionInfo<string>[] = [
    { value: 'Vietnam', label: 'Viet Nam' },
  ];
  const cityOptions: OptionInfo<string>[] = [
    { value: 'Hanoi', label: 'HaNoi' },
  ];

  return (
    <div className={'p-6 rounded-xl border border-gray-200'}>
      <div className={'grid grid-cols-6 gap-4'}>
        <div className={''}>
          <div className={'font-bold'}>
            {translation.t('State')}
            <span className={'text-red-700'}> *</span>
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div className={''}>
          <div className={'font-bold'}>
            {translation.t('Country')}
            <span className={'text-red-700'}> *</span>
          </div>
          <FormFieldSelect
            id={'picSelect'}
            validateCaller={validateCaller}
            optionInfos={countryOptions}
            value={country}
            onChange={setCountry}
          ></FormFieldSelect>
        </div>
        <div className={''}>
          <div className={'font-bold'}>
            {translation.t('City')}
            <span className={'text-red-700'}> *</span>
          </div>
          <FormFieldSelect
            id={'citySelect'}
            validateCaller={validateCaller}
            optionInfos={cityOptions}
            value={city}
            onChange={setCity}
          ></FormFieldSelect>
        </div>
        <div className={'col-span-2'}>
          <div className={'font-bold'}>
            {translation.t('Address')}
            <span className={'text-red-700'}> *</span>
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className={''}>
          <div className={'font-bold'}>
            {translation.t('Zip code')}
            <span className={'text-red-700'}> *</span>
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
