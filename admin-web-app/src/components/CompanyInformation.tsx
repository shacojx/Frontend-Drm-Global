import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormFieldSelect } from './FormFieldSelect';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { OptionInfo } from '../types/common';

export function CompanyInformation() {
  const translation = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [companyName, setCompanyName] = useState<string>('');
  const [entityEnding, setEntityEnding] = useState<any>('');
  const [region, setRegion] = useState<string>('');
  const [industry, setIndustry] = useState<any>('');
  const [website, setWebsite] = useState<string>('');
  const [companyDescription, setCompanyDesciption] = useState<string>('');

  const entityEndingOptions: OptionInfo<any>[] = [{ value: 1, label: '1' }];
  const industryOptions: OptionInfo<any>[] = [
    { value: 'Logistic', label: 'Logistic' },
  ];

  return (
    <div className={'p-6 rounded-xl border border-gray-200'}>
      <div className={'grid grid-cols-3 gap-4'}>
        <div>
          <div className={'font-bold mb-2'}>
            {translation.t('Company Name')}
            <span className={'text-red-700'}> *</span>
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>
        <div>
          <div className={'font-bold mb-2'}>
            {translation.t('Entity Ending')}
            <span className={'text-red-700'}> *</span>
          </div>
          <FormFieldSelect
            id={'entityEndingOptions'}
            onChange={setEntityEnding}
            validateCaller={validateCaller}
            optionInfos={entityEndingOptions}
            value={entityEnding}
          ></FormFieldSelect>
        </div>
        <div>
          <div className={'font-bold mb-2'}>{translation.t('Region')}</div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            readOnly
          />
        </div>
        <div>
          <div className={'font-bold mb-2'}>
            {translation.t('Industry')}
            <span className={'text-red-700'}> *</span>
          </div>
          <FormFieldSelect
            id={'industryOptions'}
            onChange={setIndustry}
            validateCaller={validateCaller}
            optionInfos={industryOptions}
            value={industry}
          ></FormFieldSelect>
        </div>
        <div>
          <div className={'font-bold mb-2'}>{translation.t('Website')}</div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
        <div className={'col-span-3'}>
          <div className={'font-bold mb-2'}>
            {translation.t('Company Description')}
          </div>
          <input
            className={
              'w-full h-[80px] text-ellipsis border py-1 px-2 rounded-lg'
            }
            value={companyDescription}
            onChange={(event) => setCompanyDesciption(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
