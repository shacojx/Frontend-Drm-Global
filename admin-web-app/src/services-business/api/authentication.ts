import { callApiGetUserProfile } from "../../api/account";
import { RawResultLogin } from "../../api/types";
import { getAccessTokenInfo, removeAuthToken, saveToken } from "../../services-base/api";

export function saveAuthInfo(user: RawResultLogin) {
  saveToken(user.token, user.type, user.refreshToken)
}

export function removeAuthInfo() {
  removeAuthToken()
}

export async function fetchUserProfile() {
  const tokenInfo = await getAccessTokenInfo()
  if (!tokenInfo) {
    return null
  }
  return await callApiGetUserProfile()
}
