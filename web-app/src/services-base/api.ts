import { API_DOMAIN, EXPIRATION_TIME_FOR_ACCESS_TOKEN, EXPIRATION_TIME_FOR_REFRESH_TOKEN } from "../_loadEnv";

type ApiMethod = 'GET' | 'POST' | 'PUT'
type ResponseOk<T = unknown> = {
  "status": string,
  "message": string,
  "data": T
}
const AUTH_ERROR_STATUS = 401 as const
type ResponseError<T = unknown> = {
  "status": typeof AUTH_ERROR_STATUS | number,
  "message": string,
}

export enum CONTENT_TYPE {
  MULTIPART_FORM_DATA = 'multipart/form-data',
  APPLICATION_JSON = 'application/json'
}

const LOGIN_PATH = '/login'

export async function callApi<T>(method: ApiMethod, path: string, paramsOrBody: Record<string, any> | any , isPrivateApi: boolean = false, contentTypeCode: string = CONTENT_TYPE.APPLICATION_JSON): Promise<T> {
  const apiUrl = new URL(path, API_DOMAIN)
  if (method === 'GET') {
    addParamsToSearchParams(apiUrl.searchParams, paramsOrBody)
  }
  let body = method === "GET" ? undefined : JSON.stringify(paramsOrBody)
  let contentType
  if (contentTypeCode === CONTENT_TYPE.MULTIPART_FORM_DATA){
    body = paramsOrBody
    contentType = {
      'Content-Type': contentTypeCode,
    }
  } else{
    contentType = method === "GET" ? undefined : {
      'Content-Type': contentTypeCode,
    }
  }

  let authorization = undefined
  if (isPrivateApi) {
    const accessTokenInfo = await getAccessTokenInfo()
    const auth = accessTokenInfo && getAuthorizationString(accessTokenInfo)
    if (auth) {
      authorization = {
        'Authorization': getAuthorizationString(accessTokenInfo)
      }
    } else {
      // Refresh token was expired
      alert('Please login again!')
      window.open(LOGIN_PATH, '_self')
      throw new Error('User is no longer logged in')
    }
  }

  const response = await fetch(
    apiUrl,
    {
      method,
      headers: {
        ...authorization,
        ...contentType,
      },
      body: body,
    }
  )

  if (!response.ok) {
    const res: ResponseError = await response.json()
    if (res.status === AUTH_ERROR_STATUS) {
      // token was invalid
      alert('Please login again!')
      window.open(LOGIN_PATH, '_self')
    }
    throw new Error(res.message)
  }
  const responseObject: ResponseOk<T> = await response.json()
  if (responseObject.status !== '200') {
    throw new Error(responseObject.message)
  }
  return responseObject.data
}

export async function getAccessTokenInfo() {
  const accessTokenInfo = getToken('accessToken')
  if (accessTokenInfo) {
    return accessTokenInfo
  }
  const refreshTokenInfo = getToken('refreshToken')
  if (refreshTokenInfo) {
    return await refreshToken(refreshTokenInfo.token)
  }
  return null
}

export function getAuthorizationString(accessTokenInfo: TokenInfo) {
  if (accessTokenInfo.type === 'Bearer') {
    return `Bearer ${accessTokenInfo.token}`
  }
  return accessTokenInfo.token
}

type ResultOfRefreshToken = {
  accessToken: string,
  tokenType: string,
  refreshToken: string,
}
async function refreshToken(refreshToken: string) {
  const path = 'api/auth/refreshtoken'
  const refreshApiUrl = new URL(path, API_DOMAIN)
  const response = await fetch(refreshApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const result = (await response.json()).data as ResultOfRefreshToken;
  saveToken(result.accessToken, result.tokenType, result.refreshToken)
  return generateTokenInfo(result.accessToken, result.tokenType, EXPIRATION_TIME_FOR_ACCESS_TOKEN)
}

type TokenName = 'accessToken' | 'refreshToken'

type TokenInfo = {
  token: string,
  expiredAt: number,
  type: string
}

function generateTokenInfo(token: string, type: string, expiredTime: number) {
  const DELAY_TIME = 10_000
  return {
    token: token,
    type: type,
    expiredAt: new Date().valueOf() + expiredTime - DELAY_TIME
  }
}

export function saveToken(accessToken: string, accessTokenType: string, refreshToken: string) {
  const accessTokenInfo = generateTokenInfo(accessToken, accessTokenType, EXPIRATION_TIME_FOR_ACCESS_TOKEN)
  const refreshTokenInfo = generateTokenInfo(refreshToken, '', EXPIRATION_TIME_FOR_REFRESH_TOKEN)
  sessionStorage.setItem("accessToken", JSON.stringify(accessTokenInfo))
  localStorage.setItem("refreshToken", JSON.stringify(refreshTokenInfo)) // should save refresh token to cookie
}

export function removeAuthToken() {
  sessionStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export function getToken(tokenName: TokenName) {
  const tokenInfoString = tokenName === "accessToken"
    ? sessionStorage.getItem('accessToken')
    : localStorage.getItem('refreshToken')
  if (!tokenInfoString) {
    return null
  }
  const tokenInfo = JSON.parse(tokenInfoString) as TokenInfo
  const now = new Date().valueOf()
  if (+tokenInfo.expiredAt < now) {
    return null
  }
  return tokenInfo
}

function addParamsToSearchParams(urlSearchParams: URLSearchParams, params: Record<string, any>) {
  Object.keys(params).forEach(key => {
    if (params[key]) {
      if (params[key] && typeof params[key] !== "object") {
        urlSearchParams.append(key, params[key])
      } else {
        for (const keyOfParamsKey in params[key]) {
          urlSearchParams.append(`${key}[${keyOfParamsKey}]`, params[key][keyOfParamsKey])
        }
      }
    }
  })
}
