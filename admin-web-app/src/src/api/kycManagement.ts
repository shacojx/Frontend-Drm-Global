import { callApi } from "../services-base/api";
import { ApiGetKycParam, RawResultGetKyc } from "./types";

export async function callApiGetKyc(param: ApiGetKycParam) {
  const path = 'api/admin/get-kyc'
  const rawResult = await callApi<RawResultGetKyc>('GET', path, param, true)
  return rawResult
}

export async function callApiRejectKyc(id: number) {
  const path = `api/admin/reject-kyc/${id}`
  const rawResult = await callApi<{}>('GET', path, {}, true)
  return rawResult
}

export async function callApiApproveKyc(id: number) {
  const path = `api/admin/approve-kyc/${id}`
  const rawResult = await callApi<{}>('GET', path, {}, true)
  return rawResult
}
