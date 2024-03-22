import { useTranslation } from 'react-i18next';
import { useValidateCaller } from '../hooks-ui/useValidateCaller';
import { OptionInfo } from '../types/common';
import { Service } from '../types/service';
import { useEffect, useState } from 'react';
import { CompanyInformation } from './CompanyInformation';

type Props = {
  service?: Service | null;
};

export function CompanyDetailDialog(props: Props) {
  const translation = useTranslation();
  const { validateCaller, validateAll } = useValidateCaller();
  const [showCompanyDetailDialog, setShowCompanyDetailDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState<Record<string, string> | null>(
    null,
  );
  const tabs = [
    {
      id: 'COMPANY_INFORMATION',
      label: translation.t('Company Information'),
    },
    {
      id: 'ORDER_INFORMATION',
      label: translation.t('Order Information'),
    },
    {
      id: 'RESPONSIBLE_PARTY',
      label: translation.t('Responsible Party'),
    },
    {
      id: 'MAIL_ADDRESS',
      label: translation.t('Mail address'),
    },
    {
      id: 'DOCUMENT',
      label: translation.t('Document'),
    },
  ];

  const cycleOptions: OptionInfo<number>[] = [{ value: 1, label: '1' }];
  const picOptions: OptionInfo<number>[] = [
    { value: 1, label: 'Nguyễn văn A' },
  ];

  useEffect(() => {
    setSelectedTab(tabs[0]);
  }, []);

  function renderContent() {
    switch (selectedTab?.id) {
      case 'COMPANY_INFORMATION': {
        return <CompanyInformation />;
      }
      case 'ORDER_INFORMATION': {
        return <CompanyInformation />;
      }
      case 'RESPONSIBLE_PARTY': {
        return <CompanyInformation />;
      }
      case 'MAIL_ADDRESS': {
        return <CompanyInformation />;
      }
      case 'DOCUMENT': {
        return <CompanyInformation />;
      }
      default: {
        return '';
      }
    }
  }

  return (
    <div className={'p-6'}>
      <div className={'font-bold text-xl mb-4'}>
        {translation.t('Company detail')}
      </div>
      <div
        className={
          'grid grid-cols-5 border border-gray-200 rounded-xl p-1 mb-4'
        }
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={
              'px-4 py-3 font-bold rounded-lg text-center cursor-pọinter ' +
              (selectedTab?.id === tab.id
                ? 'bg-gray-300 '
                : 'bg-transparent text-gray-200 ')
            }
            onClick={() => setSelectedTab(tab)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
