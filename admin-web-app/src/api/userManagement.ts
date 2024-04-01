import { toast } from "react-toastify";
import { callApi } from "../services-base/api";
import {
  ApiDeactiveParam,
  ApiEditUserParam,
  ApiSearchUserByRole,
  ApiSearchUserParam,
  ApiViewUserParam,
  RawResultSearchUser,
  RawResultViewUser,
  ViewedUser
} from "./types";

export async function callApiSearchUser(body: ApiSearchUserParam) {
  const path = 'api/admin/search-user'
  const rawResult = await callApi<RawResultSearchUser[]>('POST', path, body, true)
  
  return {content: rawResult, totalElements: rawResult.length}
}

export async function callApiLViewUser(param: ApiViewUserParam) {
  try {
    const path = 'api/admin/get-user'
    const rawResult = await callApi<RawResultViewUser>('GET', path, param, true)
    return rawResult
  } catch (error) {
    toast(String(error))
  }
}

export async function callApiEditAccount(body: ApiEditUserParam) {
  const path = 'api/admin/update-user'
  const rawResult = await callApi<unknown>('POST', path, body, true)
  return rawResult
}

export async function callApiDeactiveAccount(body: ApiDeactiveParam) {
  const path = 'api/admin/active-user'
  const rawResult = await callApi<unknown>('POST', path, body, true)
  return rawResult
}

export async function callApiSearchUserByRole(body: ApiSearchUserByRole) {
  const path = 'api/admin/search-user-by-role'
  const rawResult = await callApi<ViewedUser[]>('POST', path, body, true)
  return rawResult
}

