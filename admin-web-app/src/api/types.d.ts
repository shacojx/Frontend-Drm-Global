import { TransformedResultLogin } from "./account";

export type NationValue = string
export type CompanyTypeValue = 'LLC' | 'PLC'
export type EntityEnding = 'LLC' | 'L.L.C' | 'LIMITED LIABILITY COMPANY' | 'PRIVATE LIMITED COMPANY' | ''
export type Industry = string
export type NationPhone = string
export type LocalPhone = string

// ====== Account ======== //
export type ApiLoginParam = {
  username: string,
  password: string,
}
export type AccountRole = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_MODERATOR'
export type AdminRoleValue = 'admin' | 'mod'
export type RawResultLogin = {
  id: number,
  email: string,
  token: string,
  refreshToken: string,
  type: string,
  username: string,
  roles: AccountRole[],
}
export type TransformedResultLogin = RawResultLogin


export type ApiSendRecoveryCode = {
  email: string
}
export type RawResultSendRecoveryCode = {}

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
} & Partial<{
  "companyName": string,
  "entityEnding": EntityEnding,
  "industry": Industry,
  "website": string,
  "companyDescription": string,
}>
export type RawResultRegisterAccount = Omit<ApiRegisterAccountParam, 'password' | 'rePassword'>

export type ApiRegisterAdminAccountParam = {
  "email": string,
  "codePhone": string,
  "phone": string,
  "role": string,
  "password": string,
  "firstName": string,
  "lastName": string,
}
export type RawResultRegisterAdminAccount = {}

export type ApiResetPasswordParam = {
  newPass: string,
  reNewPass: string,
  signature: string,
}
export type RawResultResetPassword = ""

export type KYCStatus = 'pending' | 'inProgress' | 'approved'

export type RawResultGetUserProfile = {
  "llcInNation": NationValue,
  "email": string,
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

// ====== User Management ======== //

export type ApiSearchUserParam = {
  "email": string,
  "codePhone": NationPhone,
  "phone": LocalPhone
}

export type RawResultSearchUser = ViewedUser

export type ApiViewUserParam = {
  page: number,
  size: number
}
export type ViewedUser = {
  id:	number,
  llcInNation: NationValue,
  username:	string,
  email:	string,
  codePhone:	string,
  phone:	string,
  companyType:	CompanyTypeValue,
  companyName:	string,
  entityEnding:	EntityEnding,
  industry:	string,
  website:	string,
  companyDescription:	string,
  enable:	number,
  firstName:	string,
  lastName:	string,
  roles: {
    id: number,
    name: AccountRole
  }
}
export type RawResultViewUser = {
  content: ViewedUser[],
  totalPages: number,
  totalElements: number,
}

export type ApiEditUserParam = {
  "idUser": number,
  "llcInNation": string,
  "email": string,
  "codePhone": string,
  "phone": string,
  "companyType": CompanyTypeValue,
  "companyName": string,
  "entityEnding": EntityEnding,
  "industry": string,
  "website": string,
  "companyDescription": string,
  "enable": number,
  "firstName": string,
  "lastName": string,
}

export type ApiDeactiveParam = {
  "idUser": number,
  "enable": number,
  //enable = 1 là Active user
  //enable = 0 là DeActive user
}
