import {
  CompanyDetail,
  CompanyInformation,
  Document,
  MailingAddress,
  OwnerInformation,
  RawCompanyDetail,
  ResponseParty
} from "src/api/types";

const MOCK_COMPANY_INFO: CompanyInformation = {
  companyName: "Test IT Solution",
  entityEnding: "LLC",
  industry: "Art and photography",
  website: "website",
  description: "description",
  region: "region",
};

const MOCK_OWNERS: OwnerInformation[] = [
  {
    id: "10",
    type: "Company",
    document: [],
    companyName: "Test IT Solution",
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

const MOCK_DOCUMENTS: Document[] = [{ id: "1", name: "avt-default.jpg", url: "#" }];

export function transformGetCompanyInfo(data: RawCompanyDetail): CompanyDetail {
  const companyDetail: CompanyDetail = {
    companyInfo: MOCK_COMPANY_INFO,
    owners: MOCK_OWNERS,
    responseParty: MOCK_RESPONSE_PARTY,
    mailingAddress: MOCK_MAILING_ADDRESS,
    documents: MOCK_DOCUMENTS,
  };

  return companyDetail;
}
