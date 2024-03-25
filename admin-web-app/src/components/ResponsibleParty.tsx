import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export function ResponsibleParty() {
  const translation = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isHaveSsnOrItin, setIsHaveSsnOrItin] = useState('yes');
  const [ssnOrItin, setSsnOrItin] = useState(false);

  return (
    <div className={'p-6 rounded-xl border border-gray-200'}>
      <div className={'grid grid-cols-10 gap-4'}>
        <div className={'col-span-2'}>
          <div className={'font-bold'}>
            {translation.t('First name')}
            <span className={'text-red-700'}> *</span>
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className={'col-span-2'}>
          <div className={'font-bold'}>
            {translation.t('Last name')}
            <span className={'text-red-700'}> *</span>
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className={'col-span-6'}>
          <div className={'font-bold'}>
            {translation.t('Do you have SSN or ITIN ?')}
            <span className={'text-red-700'}> *</span>
          </div>
          <div className={'flex gap-4'}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={isHaveSsnOrItin}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsHaveSsnOrItin((event.target as HTMLInputElement)?.value);
              }}
              row
              className={'ml-auto'}
            >
              <FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
              <FormControlLabel value={'no'} control={<Radio />} label="No" />
            </RadioGroup>
            <input
              className={'w-1/2 h-[40px] border py-1 px-2 rounded-lg'}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              disabled={isHaveSsnOrItin === 'no'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
