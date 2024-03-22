import { TransformedResultLogin } from "./account";

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

export type KYCStatus = 'Pending' | 'In-progress' | 'Approved'

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

// ====== Payment ======== //

export type Currency = 'USD'
export type OrderType = 'PAYPAL'

export type ApiCreateOrderParam = {
  "transactionId": string,
  "currency": Currency,
  "amount": number,
  "orderType": OrderType,
}

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
  step: StepType [];
};
