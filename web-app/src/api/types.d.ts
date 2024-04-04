import { ServiceStatusType } from "../pages/LLCMyService/types/my-service.type";

export type NationValue = string
export type CompanyTypeValue = 'LLC' | 'PLC'
export type EntityEnding = 'LLC' | 'L.L.C' | 'LIMITED LIABILITY COMPANY' | 'PRIVATE LIMITED COMPANY' | ''
export type Industry = string
export type NationPhone = string
export type LocalPhone = string

export type RawResultEmpty = ''

// ====== Account ======== //
export type ApiLoginParam = {
  username: string,
  password: string,
}
export type UserRole = 'ROLE_USER'
export type RawResultLogin = {
  id: number,
  email: string,
  token: string,
  refreshToken: string,
  type: string,
  username: string,
  roles: UserRole[],
}
export type TransformedResultLogin = RawResultLogin

export type ApiSendRecoveryCode = {
  email: string
}
export type RawResultSendRecoveryCode = {}

export type ApiVerifyPhone = {
  "codePhone": NationPhone,
  "phone": LocalPhone,
}

export type ApiVerifyEmail = {
  email: string,
  firstName: string,
  lastName: string
}

export type ApiCheckRecoveryCode = {
  "email": string,
  "otp": string,
}
export type RawResultCheckRecoveryCode = string

export type ApiRegisterAccountParam = {
  "llcInNation": NationValue,
  "email": string,
  "phone": string,
  "codePhone": NationPhone,
  "companyType": CompanyTypeValue,
  firstName: string,
  lastName: string,
  "password": string,
  "rePassword": string,
  "otpVerifyEmail": string,
} & Partial<{
  "companyName": string,
  "entityEnding": EntityEnding,
  "industry": Industry,
  "website": string,
  "companyDescription": string,
}>
export type RawResultRegisterAccount = Omit<ApiRegisterAccountParam, 'password' | 'rePassword'>

export type ApiResetPasswordParam = {
  newPass: string,
  reNewPass: string,
  signature: string,
}
export type RawResultResetPassword = ""

export type KYCStatus = 'Pending' | 'In-progress' | 'Approved' | 'Rejected'

export type RawResultGetUserProfile = {
  "llcInNation": NationValue,
  "email": string,
  "avatar": string,
  "codePhone": NationPhone,
  "phone": string,
  "companyType": CompanyTypeValue,
  firstName: string,
  lastName: string,
  kycStatus: KYCStatus,
  kycImagePassport: string,
  kycImagePictureHoldPassport: string
}

export type ApiChangeUserProfile = {
  "email": string,
  "codePhone": NationPhone,
  "phone": string,
  "firstName": string,
  "lastName": string,
}
export type ApiChangeUserPassword = {
  "newPass": string,
  "reNewPass": string,
}

export type ApiUploadKYC = {
  passport: File
  picture: File
};

// ====== Payment ======== //
export type Currency = 'USD'
export type OrderType = 'PAYPAL' | 'BankToBank'

export type ApiCreateOrderParam = {
  "cashout": {
    "serviceId": number,
    "cycleNumber": number
  }[]
}

export type RawResulCreateOrder = {
  code:	string,
  message: string,
  data: {
    id:	string,
    intent:	unknown,
    status:	string,
    createTime:	unknown,
    links:	{
      rel: string,
      href: string,
    }[],
    purchase_units:	unknown,
    payment_source:	unknown,
  }
}

// ====== LLC Service ======== //

export type UploadedDocumentType ={
  id: number;
  requiredDocument: string;
  fileDocument: string | null;
}

export type MyServiceStepType = {
  id: number;
  stepNo: number|null;
  stepName: string;
  statusStep: string;
  estimatedCompletionTime: string;
  description: string;
  adminRemark: null;
  customerDocument: UploadedDocumentType[];
  result: UploadedDocumentType[];
}
export type ServiceType = 'Based' | 'Add-on';

export type MyServiceType = {
  updatedAt: string;
  createdAt: string;
  id: number;
  userId: number;
  serviceId: number;
  ServiceStatusType: string;
  serviceType: ServiceType;
  serviceName: string;
  serviceDescription: string;
  statusService: ServiceStatusType;
  cycleNumber: number;
  pricePerCycle: number;
  transitionId: number;
  statusPayment: ServiceStatusType;
  statusContract: ServiceStatusType;
  contractFile: string| null;
  pic: null;
  serviceStep: MyServiceStepType[];
}

export type LLCServiceStatusType = {
  status: number;
  step: MyServiceStepType [];
};

// ====== Service ====== //

export type RawService = {
  updatedAt: string;
  createdAt: string;
  id: number;
  appliedNation: Array<{
    id: number;
    nation: string;
  }>;
  appliedCompanyType: Array<{
    id: number;
    companyType: string;
  }>;
  serviceType: ServiceType;
  serviceName: string;
  serviceDescription: string;
  enable: number;
  serviceStep: Array<{
    id: number;
    stepNo: number;
    name: string;
    estimatedCompletionTime: string;
    description: string;
    documentRequired: Array<{
      id: number;
      documentRequired: string;
    }>;
    result: Array<{
      id: number;
      result: string;
    }>;
  }>;
  serviceCycle: Array<{
    id: number;
    cycleNumber: number;
    pricePerCycle: number;
  }>;
};

export type RawServiceDetail = {
  updatedAt: string;
  createdAt: string;
  id: number;
  appliedNation: Array<{
    id: number;
    nation: string;
  }>;
  appliedCompanyType: Array<{
    id: number;
    companyType: string;
  }>;
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  enable: number;
  serviceStep: Array<{
    id: number;
    stepNo: number;
    name: string;
    estimatedCompletionTime: string;
    description: string;
    documentRequired: Array<{
      id: number;
      documentRequired: string;
    }>;
    result: Array<{
      id: number;
      result: string;
    }>;
  }>;
  serviceCycle: Array<{
    id: number;
    cycleNumber: number;
    pricePerCycle: number;
  }>;
};

export type PaymentServiceBody = {
  cashout: Array<{
    serviceId: 4;
    cycleNumber: 1;
  }>;
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
    document: string[],
    company: number, // INFO: 1 - true | 0 - false
    individual: number, // INFO: 1 - true | 0 - false
  }>,
  responsiblePartyFirstName: string,
  responsiblePartyLastName: string,
  responsiblePartySSNOrITIN: string,
  mailingState: string,
  mailingCountry: string,
  mailingCity: string,
  mailingAddress: string,
  mailingZipCode: string,
  document: Array< {
    document: string,
  }>,
};


// === Bank ===
type BankAccount = {
  region: string;
  bankName: string;
  bankAccount: string;
  accountName: string;
  swiftCode: string;
  bankCode: string;
  rountingNo: string;
  abaFedwire: string;
};
