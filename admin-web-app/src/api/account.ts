import { callApi } from "../services-base/api";
import { transformLoginResult } from "../services-business/api/transform-result/account";
import {
  ApiChangeUserPassword,
  ApiChangeUserProfile,
  ApiCheckRecoveryCode,
  ApiLoginParam,
  ApiRegisterAccountParam, ApiRegisterAdminAccountParam, ApiResetPasswordParam,
  ApiSendRecoveryCode,
  RawResultCheckRecoveryCode,
  RawResultGetUserProfile,
  RawResultLogin, RawResultRegisterAccount, RawResultRegisterAdminAccount, RawResultResetPassword,
  RawResultSendRecoveryCode,
  TransformedResultLogin
} from "./types";

export async function callApiLogin(body: ApiLoginParam): Promise<TransformedResultLogin> {
  const path = 'api/auth/signin'
  const rawResult = await callApi<RawResultLogin>('POST', path, body)
  const isAdmin = rawResult.roles.includes('ROLE_ADMIN')
  const isMod = rawResult.roles.includes('ROLE_MODERATOR')
  if (!isAdmin && !isMod) {
    throw new Error('This Account has no permission to access admin site!')
  }
  return transformLoginResult(rawResult)
}

export async function callApiCreateAdminAccount(body: ApiRegisterAdminAccountParam) {
  const path = 'api/admin/create-user'
  const rawResult = await callApi<RawResultRegisterAdminAccount>('POST', path, body, true)
  return rawResult
}

export async function callApiLogout() {
  const path = 'api/auth/signout'
  const rawResult = await callApi('POST', path, {}, true)
  return rawResult
}

export async function callApiSendRecoveryCode(body: ApiSendRecoveryCode) {
  const path = 'api/user/forgotpass'
  const rawResult = await callApi<RawResultSendRecoveryCode>('POST', path, body)
  return rawResult
}

export async function callApiCheckRecoveryCode(body: ApiCheckRecoveryCode) {
  const path = 'api/user/submitotp'
  const rawResult = await callApi<RawResultCheckRecoveryCode>('POST', path, body)
  return rawResult
}

export async function callApiResetPassword(body: ApiResetPasswordParam) {
  const path = 'api/user/resetpass'
  const rawResult = await callApi<RawResultResetPassword>('PUT', path, body)
  return rawResult
}

export async function callApiGetUserProfile() {
  const path = 'api/user/profile'
  const rawResult = await callApi<RawResultGetUserProfile>('GET', path, {}, true)
  return rawResult
}

export async function callApiChangeUserProfile(body: ApiChangeUserProfile) {
  const path = 'api/user/profile'
  const rawResult = await callApi<RawResultGetUserProfile>('PUT', path, body, true)
  return rawResult
}

export async function callApiChangeUserPassword(body: ApiChangeUserPassword) {
  const path = 'api/user/changepass'
  const rawResult = await callApi<RawResultGetUserProfile>('PUT', path, body, true)
  return rawResult
}
