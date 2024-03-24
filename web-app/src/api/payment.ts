import { callApi, CONTENT_TYPE } from "../services-base/api";
import { ApiCreateOrderParam } from "./types";

export async function callCreateOrder(body: ApiCreateOrderParam) {
  const path = '/payment/api/v1/orders'
  const rawResult = await callApi('POST', path, body, true, CONTENT_TYPE.APPLICATION_JSON, true)
  return rawResult
}
