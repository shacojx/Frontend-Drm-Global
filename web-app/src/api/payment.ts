import { callApi } from "../services-base/api";
import { APiCaptureOrderPaypal, ApiCreateOrderParam, RawResulCreateOrder } from "./types";

export async function callCreateOrderCard(body: ApiCreateOrderParam) {
  const path = '/api/user/register-service/3'
  const rawResult = await callApi<RawResulCreateOrder>('POST', path, body, true)
  return rawResult
}

export async function callCreateOrderPaypal(body: ApiCreateOrderParam) {
  const path = '/api/user/register-service/1'
  const rawResult = await callApi<RawResulCreateOrder>('POST', path, body, true)
  return rawResult
}

export async function callCaptureOrderPaypal(body: APiCaptureOrderPaypal) {
  const path = '/payment/api/v1/orders/success'
  const rawResult = await callApi<unknown>('POST', path, body, true)
  return rawResult
}

export async function callCreateOrderBankToBank(body: ApiCreateOrderParam) {
  const path = '/api/user/register-service/2'
  const rawResult = await callApi<RawResulCreateOrder>('POST', path, body, true)
  return rawResult
}
