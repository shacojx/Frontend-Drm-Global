import { callApi } from "../services-base/api";
import { transformLoginResult } from "../services-business/api/transform-result/account";

export type ApiLoginParam = {
  username: string,
  password: string,
}
export type RawResultLogin = {
  id: number,
  email: string,
  refreshToken: string,
  roles: string[],
  token: string,
  type: string,
  username: string,
}
export type TransformedResultLogin = RawResultLogin
export async function callApiLogin(body: ApiLoginParam) {
  const path = 'api/auth/signin'
  const rawResult = await callApi<RawResultLogin>('POST', path, body)
  return transformLoginResult(rawResult)
}

export type ApiSendRecoveryCode = {
  email: string
}
export type RawResultSendRecoveryCode = {
}
export async function callApiSendRecoveryCode(body: ApiSendRecoveryCode) {
  const path = 'api/user/forgotpass'
  const rawResult = await callApi<RawResultSendRecoveryCode>('POST', path, body)
  return !!rawResult
}

export type ApiCheckRecoveryCode = {
  "email": string,
  "otp": string,
}
export type RawResultCheckRecoveryCode = {
}
export async function callApiCheckRecoveryCode(body: ApiCheckRecoveryCode) {
  const path = 'api/user/submitotp'
  const rawResult = await callApi<RawResultCheckRecoveryCode>('POST', path, body)
  return !!rawResult
}

export type ApiRegisterAccountParam = {
  "email": string,
  "password": string,
  "rePassword": string,
  "llcInNation": string,
  "phone": string,
  "companyType": string,
  "companyName": string,
  "entityEnding": string,
  "industry": string,
  "website": string,
  "companyDescription": string,
}

export async function callApiCreateAccount(body: ApiRegisterAccountParam) {
  const path = 'api/auth/signup'
  const rawResult = await callApi<ApiRegisterAccountParam>('POST', path, body)
  return rawResult as Omit<ApiRegisterAccountParam, 'password' | 'rePassword'>
}
