import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiSearchPaidServiceType } from '../api/types';
import { EMPTY_SEARCH } from '../types/service';

type Props = {
  onSubmit: (data: any) => void;
  onReset: () => void;
};

export function ServiceFilter({ onSubmit, onReset }: Props) {
  const translation = useTranslation();

  const [dataFilter, setDataFilter] =
  useState<ApiSearchPaidServiceType>(EMPTY_SEARCH);

  const updateField = (field: string, data: any) => {
    setDataFilter(pre=>({
      ...pre,
      [field]: data.trim()
    }))
  };

  function reset(): void {
    setDataFilter(EMPTY_SEARCH);
    onReset && onReset()
  }

  const onSubmitForm = (event: React.FormEvent)=>{
    event.preventDefault();
    onSubmit && onSubmit(dataFilter);
  }

  return (
    <>
      <form className={'w-full flex gap-4 mb-4'} onSubmit={onSubmitForm}>
        <div className={''}>
          <div className={'font-bold mb-1'}>
            {translation.t('Customer Email')}
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={dataFilter.email}
            name='email'
            onChange={(event) => updateField('email',event.target.value)}
          />
        </div>
        <div className={''}>
          <div className={'font-bold mb-1'}>{translation.t('PIC')}</div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={dataFilter.pic}
            name='pic'
            onChange={(event) => updateField('pic',event.target.value)}
          />
        </div>
        <button
          className="w-[100px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2 self-end"
          onClick={reset}
          type='button'
        >
          Reset
        </button>
        <button
          className="w-[100px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2 self-end"
          type='submit'
        >
          Apply
        </button>
      </form>
    </>
  );
}
