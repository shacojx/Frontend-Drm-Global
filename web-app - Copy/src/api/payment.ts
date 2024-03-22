import { callApi } from "../services-base/api";
import { ApiCreateOrderParam } from "./types";

export async function callCreateOrder(body: ApiCreateOrderParam) {
  const path = '/api/v1/orders'
  const rawResult = await callApi('POST', path, body)
  return rawResult
}
