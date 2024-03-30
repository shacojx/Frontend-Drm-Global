import { callApi, getAccessTokenInfo, getAuthorizationString } from "../services-base/api";
import { transformLoginResult } from "../services-business/api/transform-result/account";
import {
  ApiChangeUserPassword,
  ApiChangeUserProfile,
  ApiCheckRecoveryCode,
  ApiLoginParam,
  ApiRegisterAccountParam, ApiResetPasswordParam,
  ApiSendRecoveryCode, ApiUploadKYC, ApiVerifyEmail, ApiVerifyPhone,
  RawResultCheckRecoveryCode, RawResultEmpty,
  RawResultGetUserProfile,
  RawResultLogin, RawResultRegisterAccount, RawResultResetPassword,
  RawResultSendRecoveryCode,
  TransformedResultLogin
} from "./types";

export async function callApiLogin(body: ApiLoginParam): Promise<TransformedResultLogin> {
  const path = 'api/auth/signin'
  const rawResult = await callApi<RawResultLogin>('POST', path, body)
  return transformLoginResult(rawResult)
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

export async function callApiVerifyEmail(email: string) {
  const path = 'api/public/checkemail'
  const rawResult = await callApi<RawResultEmpty>('POST', path, {email})
  return rawResult
}

export async function callApiVerifyPhone(body: ApiVerifyPhone) {
  const path = 'api/public/checkphone'
  const rawResult = await callApi<RawResultEmpty>('POST', path, body)
  return rawResult
}

export async function callApiSendEmailOTP(body: ApiVerifyEmail) {
  const path = 'api/user/verifyemail'
  const rawResult = await callApi<RawResultEmpty>('POST', path, body)
  return rawResult
}

export async function callApiSendEditEmailOTP(body: ApiVerifyEmail) {
  const path = 'api/user/verify-edit-email'
  const rawResult = await callApi<RawResultEmpty>('POST', path, body, true)
  return rawResult
}

export async function callApiChangeEmail(email: string, otp: string) {
  const path = '/api/user/update-email'
  const rawResult = await callApi('POST', path, { email, otp }, true)

  return rawResult;
}

export async function callApiCreateAccount(body: ApiRegisterAccountParam) {
  const path = 'api/auth/signup'
  const rawResult = await callApi<RawResultRegisterAccount>('POST', path, body)
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

export const callApiUploadKYC = async ({passport, picture}: ApiUploadKYC) => {
  const headers = new Headers();
  headers.append("Authorization", getAuthorizationString((await getAccessTokenInfo())!));

  const formData = new FormData();
  formData.append("passport", passport);
  formData.append("picture", picture)

  const options = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  const endpoint = `${process.env.REACT_APP_URL}/api/file/upload-kyc`;

  const data = (await fetch(endpoint, options).then((response) =>
    response.json()
  ));

  return data;
}
