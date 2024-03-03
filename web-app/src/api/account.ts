import { callApi } from "../services-base/api";
import { transformLoginResult } from "../services-business/api/transform-result/account";
import {
  ApiLoginParam,
  ApiSendRecoveryCode, CompanyTypeValue, EntityEnding, Industry, LocalPhone, NationPhone, NationValue,
  RawResultLogin,
  RawResultSendRecoveryCode,
  TransformedResultLogin
} from "./types";


export async function callApiLogin(body: ApiLoginParam): Promise<TransformedResultLogin> {
  const path = 'api/auth/signin'
  const rawResult = await callApi<RawResultLogin>('POST', path, body)
  return transformLoginResult(rawResult)
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
  "llcInNation": NationValue,
  "email": string,
  "phone": string,
  "companyType": CompanyTypeValue,
  "password": string,
  "rePassword": string,
  "companyName": string,
  "entityEnding": EntityEnding,
  "industry": Industry,
  "website": string,
  "companyDescription": string,
}

export async function callApiCreateAccount(body: ApiRegisterAccountParam) {
  const path = 'api/auth/signup'
  const rawResult = await callApi<ApiRegisterAccountParam>('POST', path, body)
  return rawResult as Omit<ApiRegisterAccountParam, 'password' | 'rePassword'>
}
