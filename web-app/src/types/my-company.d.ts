import { EntityEnding } from "src/api/types";

export type CompanyInformation = {
  companyName: string;
  entityEnding: EntityEnding;
  industry: Industry;
  website: string;
  description: string;
  region: string;
};

export type OwnerInformation = {
  id: string;
  companyName?: string;
  ownership: number; // INFO: (%)
  document: string[];
  type: "Company" | "Individual";
  firstName?: string;
  lastName?: string;
};

export type ResponseParty = {
  firstName: string;
  lastName: string;
  hasSSNorITIN: boolean;
  SSNorITIN?: string;
};

export type MailingAddress = {
  state?: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
};

export type Document = {
  id: string;
  name: string;
  url: string;
};

export type CompanyDetail = {
  companyInfo: CompanyInformation;
  owners: OwnerInformation[];
  responseParty: ResponseParty;
  mailingAddress: MailingAddress;
  documents: Document[];
};
