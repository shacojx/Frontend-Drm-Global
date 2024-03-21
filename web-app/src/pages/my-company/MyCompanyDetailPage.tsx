import clsx from "clsx";
import { CompanyInformationTab } from "./CompanyInformationTab";
import { OwnerInformationTab } from "./OwnerInformationTab";
import { MailingAddressTab } from "./MailingAddressTab";
import { ResponsePartyTab } from "./ResponsePartyTab";
import { DocumentTab } from "./DocumentTab";
import {
  CompanyInformation,
  Document,
  MailingAddress,
  OwnerInformation,
  ResponseParty,
} from "src/types/my-company";
import { useEffect, useState } from "react";
import { callApiGetCompanyInfo } from "src/api/my-company";

const TABS = [
  "Company Information",
  "Owner Information",
  "Responsible Party",
  "Mailing address",
  "Document",
] as const;

const MOCK_COMPANY_INFO: CompanyInformation = {
  companyName: "Lesor IT Solution",
  entityEnding: "LLC",
  industry: "Art and photography",
  website: "website",
  description: "description",
  region: "region",
};

const MOCK_OWNERS: OwnerInformation[] = [
  {
    id: "1",
    type: "Company",
    document: "",
    companyName: "Lesor IT Solution",
    ownership: 100,
  },
];

const MOCK_RESPONSE_PARTY: ResponseParty = {
  firstName: "Hoang",
  lastName: "Nguyen",
  hasSSNorITIN: false,
};

const MOCK_MAILING_ADDRESS: MailingAddress = {
  country: "Vietnam",
  city: "Hanoi",
  address: "Me Linh, Ha Noi",
  zipCode: "55000",
};

const MOCK_DOCUMENTS: Document[] = [{ id: "1", name: "Mock Document", url: "#" }];

export function MyCompanyDetailPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);

  const [isEditing, setIsEditing] = useState(false);

  const [companyInfo, setCompanyInfo] = useState<CompanyInformation>(MOCK_COMPANY_INFO);
  const [owners, setOwners] = useState<Partial<OwnerInformation>[]>(MOCK_OWNERS);
  const [responseParty, setResponseParty] = useState<ResponseParty>(MOCK_RESPONSE_PARTY);
  const [mailingAddress, setMailingAddress] = useState<MailingAddress>(MOCK_MAILING_ADDRESS);
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);

  useEffect(() => {
    callApiGetCompanyInfo().then(setCompanyInfo);
  }, []);

  return (
    <div className="bg-white w-full flex flex-col border border-l border-stroke">
      <div className="grow p-10 overflow-y-auto">
        <h2 className="mb-12 text-lg font-semibold relative after:absolute after:w-16 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1">
          Company Detail
        </h2>

        <div className="rounded-lg p-1 border border-solid border-surface mb-12 overflow-x-scroll">
          <div className="flex justify-between">
            {TABS.map((tab) => (
              <div
                key={tab}
                className={clsx(
                  "h-12 flex justify-center items-center grow font-bold rounded-lg cursor-pointer transition-all w-max line-clamp-1 min-w-52",
                  activeTab === tab ? "bg-primary_25 text-black" : "text-surface"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-solid border-surface rounded-lg p-6">
          {activeTab === "Company Information" && (
            <CompanyInformationTab
              readonly={!isEditing}
              companyInfo={companyInfo}
              onChange={setCompanyInfo}
            />
          )}
          {activeTab === "Owner Information" && (
            <OwnerInformationTab readonly={!isEditing} owners={owners} onChange={setOwners} />
          )}
          {activeTab === "Responsible Party" && (
            <ResponsePartyTab
              readonly={!isEditing}
              responseParty={responseParty}
              onChange={setResponseParty}
            />
          )}
          {activeTab === "Mailing address" && (
            <MailingAddressTab
              readonly={!isEditing}
              mailingAddress={mailingAddress}
              onChange={setMailingAddress}
            />
          )}
          {activeTab === "Document" && (
            <DocumentTab readonly={!isEditing} documents={documents} onChange={setDocuments} />
          )}
        </div>
      </div>

      <div className="h-20 shrink-0 border-t border-solid border-stroke flex justify-end gap-2 items-center px-8">
        {isEditing && (
          <button
            className="border border-solid border-surface h-13 px-6 rounded-lg font-semibold"
            onClick={() => {
              setCompanyInfo(MOCK_COMPANY_INFO);
              setOwners(MOCK_OWNERS);
              setResponseParty(MOCK_RESPONSE_PARTY);
              setMailingAddress(MOCK_MAILING_ADDRESS);
              setDocuments(MOCK_DOCUMENTS);

              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
        <button
          className="rounded-lg bg-primary h-13 px-6 text-white font-semibold"
          onClick={() => {
            if (isEditing) {
              // INFO: handle save
              alert("Save success");
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
