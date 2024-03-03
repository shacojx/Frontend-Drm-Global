import { TransformedResultLogin } from "./account";

export type NationValue = 'USA'
export type CompanyTypeValue = 'LLC' | 'PLC'
export type EntityEnding = 'LLC' | 'L.L.C' | 'LIMITED LIABILITY COMPANY' | 'PRIVATE LIMITED COMPANY'
export type Industry = string
export type NationPhone = '+84'
export type LocalPhone = string

type ApiLoginParam = {
  username: string,
  password: string,
}
type UserRole = 'ROLE_USER'
type RawResultLogin = {
  id: number,
  email: string,
  token: string,
  refreshToken: string,
  type: string,
  username: string,
  roles: UserRole[],
}
type TransformedResultLogin = RawResultLogin


export type ApiSendRecoveryCode = {
  email: string
}
export type RawResultSendRecoveryCode = {
}
