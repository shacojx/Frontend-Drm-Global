import { TransformedResultLogin } from './account';

export type NationValue = string;
export type CompanyTypeValue = 'LLC' | 'PLC';
export type EntityEnding =
  | 'LLC'
  | 'L.L.C'
  | 'LIMITED LIABILITY COMPANY'
  | 'PRIVATE LIMITED COMPANY'
  | '';
export type Industry = string;
export type NationPhone = string;
export type LocalPhone = string;
export type ApiPagingParam = {
  page: number;
  size: number;
};
type RawPagingApiResult<T> = {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// ====== Account ======== //
export type ApiLoginParam = {
  username: string;
  password: string;
};
export type AccountRole = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_MODERATOR';
export type AdminRoleValue = 'admin' | 'mod';
export type RawResultLogin = {
  id: number;
  email: string;
  token: string;
  refreshToken: string;
  type: string;
  username: string;
  roles: AccountRole[];
};
export type TransformedResultLogin = RawResultLogin;

export type ApiSendRecoveryCode = {
  email: string;
};
export type RawResultSendRecoveryCode = {};

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
} & Partial<{
  companyName: string;
  entityEnding: EntityEnding;
  industry: Industry;
  website: string;
  companyDescription: string;
}>;
export type RawResultRegisterAccount = Omit<
  ApiRegisterAccountParam,
  'password' | 'rePassword'
>;

export type ApiRegisterAdminAccountParam = {
  email: string;
  codePhone: string;
  phone: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type RawResultRegisterAdminAccount = {};

export type ApiResetPasswordParam = {
  newPass: string;
  reNewPass: string;
  signature: string;
};
export type RawResultResetPassword = '';

export type KYCStatus = 'pending' | 'inProgress' | 'approved';

export type RawResultGetUserProfile = {
  llcInNation: NationValue;
  email: string;
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

// ====== Payment ======== //

export type Currency = 'USD';
export type OrderType = 'PAYPAL';

export type ApiCreateOrderParam = {
  transactionId: string;
  currency: Currency;
  amount: number;
  orderType: OrderType;
};

export type ApiGetOrdersParam = {
  page: number;
  size: number;
};

export type UploadedDocumentType = {
  id: number;
  requiredDocument: string;
  fileDocument: string | null;
};

export type PaidService = {
  updatedAt: string;
  createdAt: string;
  id: number;
  userId: number;
  serviceId: number;
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  statusService: string;
  cycleNumber: number;
  pricePerCycle: number;
  transitionId: number;
  statusPayment: string;
  paymentMethod: null;
  statusContract: string;
  contractFile: null;
  pic: string;
  paidServiceId: string,
  serviceStep: Array<{
    id: number;
    stepNo: number;
    stepName: string;
    statusStep: string;
    estimatedCompletionTime: string;
    description: string;
    adminRemark: string;
    customerDocument: Array<UploadedDocumentType>;
    result: Array<UploadedDocumentType>;
  }>;
}

export type RawRegisterServicesResult = RawPagingApiResult<PaidService>;

export type ApiOrder = {
  updatedAt: string,
  createdAt: string,
  id:	number,
  orderId:	string,
  transitionId:	number,
  statusPayment:	string, // TODO: add type
  firstName:	string,
  lastName:	string,
  paymentMethod: string,
  amount:	number,
  email: string,
  codePhone: string,
  phone: string,
  paidService: PaidService[],
}

export type RawApiGetOrdersResult = RawPagingApiResult<ApiOrder>

// ====== User Management ======== //

export type ApiSearchUserParam = {
  email: string;
  codePhone: NationPhone;
  phone: LocalPhone;
};

export type RawResultSearchUser = ViewedUser;

export type ApiViewUserParam = {
  page: number;
  size: number;
};
export type ViewedUser = {
  id: number;
  llcInNation: NationValue;
  username: string;
  email: string;
  codePhone: string;
  phone: string;
  companyType: CompanyTypeValue;
  companyName: string;
  entityEnding: EntityEnding;
  industry: string;
  website: string;
  companyDescription: string;
  enable: number;
  firstName: string;
  lastName: string;
  roles: {
    id: number;
    name: AccountRole;
  }[];
  createdAt: string;
};

export type ApiSearchUserParam = {
  email: string;
  codePhone: NationPhone;
  phone: LocalPhone;
};

export type RawResultViewUser = {
  content: ViewedUser[];
  totalPages: number;
  totalElements: number;
};

export type ApiEditUserParam = {
  idUser: number;
  llcInNation: string;
  email: string;
  codePhone: string;
  phone: string;
  companyType: CompanyTypeValue;
  companyName: string;
  entityEnding: EntityEnding;
  industry: string;
  website: string;
  companyDescription: string;
  enable: number;
  firstName: string;
  lastName: string;
};

export type ApiDeactiveParam = {
  idUser?: number;
  enable: number;
  //enable = 1 là Active user
  //enable = 0 là DeActive user
};

// ====== KYC Management ======== //

// Note: Master Services
export type ApiViewMasterServiceParam = {
  page: number;
  size: number;
};

export type RawResultSearchMasterService = ViewedMasterService;

export interface ViewedMasterService {
  updatedAt: Date;
  createdAt: Date;
  id: number;
  serviceId: string;
  appliedNation: AppliedNation[];
  appliedCompanyType: AppliedCompanyType[];
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  enable: number;
  serviceStep: ServiceStep[];
  serviceCycle: ServiceCycle[];
}

export interface AppliedCompanyType {
  id: number;
  companyType: string;
}

export interface AppliedNation {
  id: number;
  nation: string;
}

export interface ServiceCycle {
  id: number;
  cycleNumber: number;
  pricePerCycle: number;
}

export interface ServiceStep {
  id: number;
  stepNo: number;
  name: string;
  estimatedCompletionTime: string;
  description: string;
  documentRequired: DocumentRequired[];
  result: Result[];
}

export interface DocumentRequired {
  id: number;
  documentRequired: string;
}

export interface Result {
  id: number;
  result: string;
}

// export type ViewedMasterService = {
//   id:	number,
//   llcInNation: NationValue,
//   username:	string,
//   email:	string,
//   codePhone:	string,
//   phone:	string,
//   companyType:	CompanyTypeValue,
//   companyName:	string,
//   entityEnding:	EntityEnding,
//   industry:	string,
//   website:	string,
//   companyDescription:	string,
//   enable:	number,
//   firstName:	string,
//   lastName:	string,
//   roles: {
//     id: number,
//     name: AccountRole
//   }
// }

export type ApiSearchMasterServiceParam = {
  serviceId: string;
  serviceName: string;
  status: string;
  appliedNation: string;
};

export type RawResultViewMasterService = {
  content: ViewedMasterService[];
  totalPages: number;
  totalElements: number;
};

export interface CreateMasterServiceBody {
  appliedNation: string[];
  appliedCompanyType: string[];
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  serviceStep: ServiceStepBody[];
  serviceCycle: ServiceCycleBody[];
}

export type UpdateMasterServiceBody = CreateMasterServiceBody;

export interface ServiceCycle {
  cycleNumber: number;
  pricePerCycle: number;
}

export interface ServiceStepBody {
  stepNo: number;
  name: string;
  estimatedCompletionTime: string;
  description: string;
  documentRequired: string[];
  result: string[];
}

export interface ServiceCycleBody {
  cycleNumber: number;
  pricePerCycle: number;
}

export interface ServiceStep {
  stepNo: number;
  name: string;
  estimatedCompletionTime: string;
  description: string;
  documentRequired: string[];
  result: string[];
}

export type ApiMasterServiceParam = {
  appliedNation: string[];
  appliedCompanyType: string[];
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  serviceStep: ServiceStep[];
  serviceCycle: ServiceCycle[];
};

export type ApiDeactiveMasterServiceParam = {
  idUser: number;
  enable: number;
  //enable = 1 là Active user
  //enable = 0 là DeActive user
};

export type RawResultSearchUser = ViewedUser;

// End: Master Service

export type ApiGetKycParam = {
  page: number;
  size: number;
};

export type KycDetail = {
  id: number;
  llcInNation: string;
  username: string;
  email: string;
  codePhone: string;
  phone: string;
  companyType: string;
  companyName: string;
  entityEnding: string;
  industry: string;
  website: string;
  companyDescription: string;
  enable: number;
  firstName: string;
  lastName: string;
  avatarImage: string | null;
  kycStatus: string;
  passport: string | null;
  pictureHoldPassport: string | null;
  requestKYCAt: string;
  roles: [
    {
      id: number;
      name: AccountRole;
    },
  ];
};

export type RawResultGetKyc = {
  content: KycDetail[];
  totalPages: number;
  totalElements: number;
};

export type RawResult<T> = {
  content: T;
  totalPages: number;
  totalElements: number;
  message: string;
  status: string;
};

export type RawResultPOST = {
  data: string;
  message: string;
  status: string;
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
  type: 'Company' | 'Individual';
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
    companyName: string;
    firstName: string;
    lastName: string;
    ownerShip: string;
    document: string;
    company: number; // INFO: 1 - true | 0 - false
  }>;
  responsiblePartyFirstName: null;
  responsiblePartyLastName: null;
  responsiblePartySSNOrITIN: null;
  mailingState: null;
  mailingCountry: null;
  mailingCity: null;
  mailingAddress: null;
  mailingZipCode: null;
  document: Array<{ id: string; document: string }>;
};

export type EditCompanyBody = {
  id: number;
  companyName: string;
  entityEnding: string;
  region: string;
  industry: string;
  website: string;
  companyDescription: string;
  owner: Array<{
    companyName: string;
    firstName: string;
    lastName: string;
    ownerShip: string;
    document: [string];
    company: number; // INFO: 1 - true | 0 - false
    individual: number; // INFO: 1 - true | 0 - false
  }>;
  responsiblePartyFirstName: string;
  responsiblePartyLastName: string;
  responsiblePartySSNOrITIN: string;
  mailingState: string;
  mailingCountry: string;
  mailingCity: string;
  mailingAddress: string;
  mailingZipCode: string;
  document: Array<{
    id: string;
    document: string;
  }>;
};

export type ApiSearchPaidServiceType = {
  pic?: string;
  email?: string;
};

export type PaginationType = {
  page?: number;
  size?: number;
};

export type ApiSearchUserByRole = {
  role: 'admin' | 'mod';
};
