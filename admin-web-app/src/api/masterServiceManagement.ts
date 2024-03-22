import {
  ApiDeactiveParam,
  ApiSearchMasterServiceParam,
  ApiViewMasterServiceParam,
  CreateMasterServiceBody,
  RawResultSearchMasterService,
  RawResultViewMasterService,
  UpdateMasterServiceBody,
  ViewedMasterService
} from "../../src/api/types";
import { callApi } from "../../src/services-base/api";

export async function callApiSearchMasterService(body: ApiSearchMasterServiceParam) {
  const path = 'api/admin/search-service'
  const rawResult = await callApi<RawResultSearchMasterService>('POST', path, body, true)
  return rawResult
}

export async function callApiViewMasterService(param: ApiViewMasterServiceParam) {
  const path = 'api/admin/get-service'
  const rawResult = await callApi<RawResultViewMasterService>('GET', path, param, true)
  return rawResult
}

export async function callApiCreateMasterService(body: CreateMasterServiceBody) {
  const path = 'api/admin/create-service'
  const rawResult = await callApi<RawResultViewMasterService>('POST', path, body, true)
  return rawResult
}

export async function callApiUpdateMasterService(body: UpdateMasterServiceBody, serviceId: number) {
  const path = `api/admin/update-service/${serviceId}`
  const rawResult = await callApi<unknown>('POST', path, body, true)
  return rawResult
}

export async function callApiDeactiveMasterService(body: ApiDeactiveParam, id: number) {
  const path = `api/admin/active-service/${id}`
  const rawResult = await callApi<ViewedMasterService>('GET', path, body, true)
  return rawResult
}

export async function callApiActiveMasterService(body: ApiDeactiveParam, id: number) {
  const path = `api/admin/active-service/${id}`
  const rawResult = await callApi<ViewedMasterService>('GET', path, body, true)
  return rawResult
}
