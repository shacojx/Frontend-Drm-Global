import { ServiceType } from string;

export type NationValue = string;
export type CompanyTypeValue = string;
export type EntityEnding =
  | string
  | string
  | string
  | string
  | string;
export type Industry = string;
export type NationPhone = string;
export type LocalPhone = string;

export type RawResultEmpty = string;

// ====== Account ======== //
export type ApiLoginParam = {
  username: string;
  password: string;
};
export type UserRole = string;
export type RawResultLogin = {
  id: number;
  email: string;
  token: string;
  refreshToken: string;
  type: string;
  username: string;
  roles: UserRole[];
};
export type TransformedResultLogin = RawResultLogin;

export type ApiSendRecoveryCode = {
  email: string;
};
export type RawResultSendRecoveryCode = {};

export type ApiVerifyPhone = {
  codePhone: NationPhone;
  phone: LocalPhone;
};

export type ApiCheckRecoveryCode = {
  email: string;
  otp: string;
};
export type RawResultCheckRecoveryCode = string;

export type ApiRegisterAccountParam = {
  llcInNation: NationValue;
  email: string;
  phone: string;
  codePhone: NationPhone;
  companyType: CompanyTypeValue;
  firstName: string;
  lastName: string;
  password: string;
  rePassword: string;
  otpVerifyEmail: string;
} & Partial<{
  companyName: string;
  entityEnding: EntityEnding;
  industry: Industry;
  website: string;
  companyDescription: string;
}>;
export type RawResultRegisterAccount = Omit<ApiRegisterAccountParam, string>;

export type ApiResetPasswordParam = {
  newPass: string;
  reNewPass: string;
  signature: string;
};
export type RawResultResetPassword = string;

export type KYCStatus = string;

export type RawResultGetUserProfile = {
  llcInNation: NationValue;
  email: string;
  avatar: string;
  codePhone: NationPhone;
  phone: string;
  companyType: CompanyTypeValue;
  firstName: string;
  lastName: string;
  kycStatus: KYCStatus;
};

export type ApiChangeUserProfile = {
  email: string;
  codePhone: NationPhone;
  phone: string;
  firstName: string;
  lastName: string;
};
export type ApiChangeUserPassword = {
  newPass: string;
  reNewPass: string;
};

export type ApiUploadKYC = {
  passport: File;
  picture: File;
};

// ====== Payment ======== //

export type Currency = string;
export type OrderType = string;

export type ApiCreateOrderParam = {
  transactionId: string;
  currency: Currency;
  amount: number;
  orderType: OrderType;
};

// ====== LLC Service ======== //

export type UploadedDocumentType = {
  name: string;
  link: string;
};

export type StepType = {
  id: number;
  name: string;
  status: ServiceType;
  issuingDuration: string;
  detail?: {
    step_description: string;
    remark: string;
    customer_document: {
      required_document: string;
      uploaded_document: UploadedDocumentType[];
    };
    service_document: {
      required_document: string;
      uploaded_document: UploadedDocumentType[];
    };
  };
};

export type LLCServiceType = {
  status: number;
  step: StepType[];
};

// ====== My Company ====== //
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
  type: string;
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
  name: string;
};

export type CompanyDetail = {
  companyInfo: CompanyInformation;
  owners: OwnerInformation[];
  responseParty: ResponseParty;
  mailingAddress: MailingAddress;
  documents: Document[];
};

export type RawCompanyDetail = {
  id: number;
  userId: number;
  companyName: string;
  entityEnding: string;
  region: null | string;
  industry: string;
  website: string;
  companyDescription: string;
  owner: Array<{
    companyName: string,
    firstName: string,
    lastName: string,
    ownerShip: string,
    document: string,
    company: number, // INFO: 1 - true | 0 - false
  }>;
  responsiblePartyFirstName: null;
  responsiblePartyLastName: null;
  responsiblePartySSNOrITIN: null;
  mailingState: null;
  mailingCountry: null;
  mailingCity: null;
  mailingAddress: null;
  mailingZipCode: null;
  document: Array<{id: string, document: string}>;
};

export type EditCompanyBody = {
  companyName: string,
  entityEnding: string,
  region: string,
  industry: string,
  website: string,
  companyDescription: string,
  owner: Array<{
    companyName: string,
    firstName: string,
    lastName: string,
    ownerShip: string,
    document: string,
    company: number, // INFO: 1 - true | 0 - false
    individual: number, // INFO: 1 - true | 0 - false
  },>,
  responsiblePartyFirstName: string,
  responsiblePartyLastName: string,
  responsiblePartySSNOrITIN: string,
  mailingState: string,
  mailingCountry: string,
  mailingCity: string,
  mailingAddress: string,
  mailingZipCode: string,
  document: Array< {
    id: string, 
    document: string,
  }>,
};