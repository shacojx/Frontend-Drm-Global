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
export async function callApiLogin(param: ApiLoginParam) {
  const path = 'api/auth/signin'
  const rawResult = await callApi<RawResultLogin>('POST', path, param)
  return transformLoginResult(rawResult)
}
