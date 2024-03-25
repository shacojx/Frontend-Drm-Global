import { callApi, CONTENT_TYPE } from "../services-base/api";
import { ApiCreateOrderParam, RawResulCreateOrder } from "./types";

export async function callCreateOrderPaypal(body: ApiCreateOrderParam) {
  const path = '/api/user/register-service/1'
  const rawResult = await callApi<RawResulCreateOrder>('POST', path, body, true)
  return rawResult
}

export async function callCreateOrderBankToBank(body: ApiCreateOrderParam) {
  const path = '/api/user/register-service/2'
  const rawResult = await callApi<unknown>('POST', path, body, true)
  return rawResult
}
