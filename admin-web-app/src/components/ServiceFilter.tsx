import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onSubmit: (data: any) => void;
};

export function ServiceFilter(props: Props) {
  const translation = useTranslation();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function reset(): void {
    setCustomerName('');
    setCustomerEmail('');
    setPhoneNumber('');
  }

  return (
    <>
      <div className={'w-full flex gap-4 mb-4'}>
        <div className={''}>
          <div className={'font-bold mb-1'}>
            {translation.t('Customer Email')}
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
          />
        </div>
        <div className={''}>
          <div className={'font-bold mb-1'}>
            {translation.t('Phone number')}
          </div>
          <input
            className={'w-full h-[40px] border py-1 px-2 rounded-lg'}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <button
          className="w-[100px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2 self-end"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="w-[100px] h-[40px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2 self-end"
          onClick={() => {
            props.onSubmit({ customerName, customerEmail, phoneNumber });
          }}
        >
          Apply
        </button>
      </div>
    </>
  );
}
