import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DialogFailureFullscreen,
  DialogSuccessFullscreen,
} from '../../DialogFormStatusFullscreen';
import {
  useApiGetMyCompanyDetail,
  useApiUpdateMyCompanyDetail,
} from '../../../hooks-api/useMyCompany';
import {
  validateCompanyInfo,
  validateMailingAddress,
  validateOwnersInfo,
  validateResponseParty,
} from '../../../services-business/myCompany';
import { CompanyInformationTab } from './CompanyInformationTab';
import { DocumentTab } from './DocumentTab';
import { MailingAddressTab } from './MailingAddressTab';
import { OwnerInformationTab } from './OwnerInformationTab';
import { ResponsePartyTab } from './ResponsePartyTab';
import {
  CompanyInformation,
  Document,
  MailingAddress,
  OwnerInformation,
  ResponseParty,
} from '../../../api/types';

const TABS = [
  'Company Information',
  'Owner Information',
  'Responsible Party',
  'Mailing address',
  'Document',
] as const;

export function MyCompanyDetailPage() {
  const { t } = useTranslation();
  const { data, status, refetch } = useApiGetMyCompanyDetail();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<Partial<CompanyInformation>>(
    {},
  );
  const [owners, setOwners] = useState<Partial<OwnerInformation>[]>([]);
  const [responseParty, setResponseParty] = useState<Partial<ResponseParty>>(
    {},
  );
  const [mailingAddress, setMailingAddress] = useState<Partial<MailingAddress>>(
    {},
  );
  const [documents, setDocuments] = useState<Document[]>([]);

  const { mutateAsync: saveMyCompany, status: savingCompany } =
    useApiUpdateMyCompanyDetail({
      onError: (error) => setError(String(error)),
    });

  useEffect(() => {
    if (status === 'success') {
      setCompanyInfo(data.companyInfo);
      setOwners(data.owners);
      setResponseParty(data.responseParty);
      setMailingAddress(data.mailingAddress);
      setDocuments(data.documents);
    }
  }, [status, data]);

  const handleSave = async () => {
    try {
      if (
        validateCompanyInfo(companyInfo) &&
        validateOwnersInfo(owners) &&
        validateResponseParty(responseParty) &&
        validateMailingAddress(mailingAddress)
      ) {
        setError(false);
        await saveMyCompany({
          companyDescription: companyInfo.description,
          companyName: companyInfo.companyName,
          entityEnding: companyInfo.entityEnding,
          industry: companyInfo.industry,
          mailingAddress: mailingAddress.address,
          mailingCity: mailingAddress.city,
          mailingCountry: mailingAddress.country,
          mailingState: mailingAddress.state ?? '',
          mailingZipCode: mailingAddress.zipCode,
          owner: owners.map((item) => ({
            companyName: item.companyName ?? '',
            firstName: item.firstName ?? '',
            lastName: item.lastName ?? '',
            ownerShip: item.ownership.toString(),
            document: [item.document.join(',')],
            company: item.type === 'Company' ? 1 : 0,
            individual: item.type === 'Individual' ? 1 : 0,
          })),
          region: companyInfo.region ?? '',
          responsiblePartyFirstName: responseParty.firstName,
          responsiblePartyLastName: responseParty.lastName,
          responsiblePartySSNOrITIN: responseParty.SSNorITIN ?? '',
          website: companyInfo.website,
          document: documents.map((item) => ({
            id: item.name,
            document: item.name,
          })),
        });
        setShowSuccessDialog(true);
        refetch();
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <>
      <div className="bg-white w-full flex flex-col border border-l border-stroke">
        <div className="grow p-10 overflow-y-auto">
          <h2 className="mb-12 text-lg font-semibold relative after:absolute after:w-16 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1">
            {t('Company Detail')}
          </h2>

          <div className="rounded-lg p-1 border border-solid border-surface mb-12 overflow-x-scroll relative h-14">
            <div className="min-w-full whitespace-nowrap absolute flex">
              {TABS.map((tab) => (
                <div
                  key={tab}
                  className={clsx(
                    'inline-flex h-12 justify-center items-center grow font-bold rounded-lg cursor-pointer transition-all w-max line-clamp-1 min-w-52',
                    activeTab === tab
                      ? 'bg-primary_25 text-black'
                      : 'text-surface',
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {t(tab)}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-solid border-surface rounded-lg p-6">
            {activeTab === 'Company Information' && (
              <CompanyInformationTab
                readonly={!isEditing}
                companyInfo={companyInfo}
                onChange={setCompanyInfo}
              />
            )}
            {activeTab === 'Owner Information' && (
              <OwnerInformationTab
                readonly={!isEditing}
                owners={owners}
                onChange={setOwners}
              />
            )}
            {activeTab === 'Responsible Party' && (
              <ResponsePartyTab
                readonly={!isEditing}
                responseParty={responseParty}
                onChange={setResponseParty}
              />
            )}
            {activeTab === 'Mailing address' && (
              <MailingAddressTab
                readonly={!isEditing}
                mailingAddress={mailingAddress}
                onChange={setMailingAddress}
              />
            )}
            {activeTab === 'Document' && (
              <DocumentTab
                readonly={!isEditing}
                documents={documents}
                onChange={setDocuments}
              />
            )}
          </div>
        </div>

        <div className="h-20 shrink-0 border-t border-solid border-stroke flex justify-end gap-2 items-center px-8">
          {isEditing && (
            <button
              className="border border-solid border-surface h-13 px-6 rounded-lg font-semibold"
              onClick={() => {
                if (!data) return;

                setCompanyInfo(data.companyInfo);
                setOwners(data.owners);
                setResponseParty(data.responseParty);
                setMailingAddress(data.mailingAddress);
                setDocuments(data.documents);

                setIsEditing(false);
              }}
            >
              {t('Cancel')}
            </button>
          )}
          <button
            className="rounded-lg bg-primary h-13 px-6 text-white font-semibold"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? t('Save') : t('Edit')}
          </button>
        </div>
      </div>

      {showSuccessDialog && (
        <DialogSuccessFullscreen
          onClose={() => setShowSuccessDialog(false)}
          title="Company information updated"
          actionElement={
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              Close
            </button>
          }
        />
      )}

      {error && (
        <DialogFailureFullscreen
          title={error}
          onClose={() => setError(false)}
          actionElement={
            <button
              onClick={() => setError(false)}
              className="w-full h-[52px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg"
            >
              Close
            </button>
          }
        />
      )}
    </>
  );
}
