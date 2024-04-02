import { callApi } from '../services-base/api';
import {
  ApiCreateOrderParam,
  ApiGetOrdersParam,
  RawApiGetOrdersResult,
} from './types';

export async function callCreateOrder(body: ApiCreateOrderParam) {
  const path = '/api/v1/orders';
  const rawResult = await callApi('POST', path, body);
  return rawResult;
}

export async function callApiGetOrders(param: ApiGetOrdersParam) {
  const path = '/api/admin/get-order-payment';
  const result = await callApi<RawApiGetOrdersResult>('GET', path, param, true);
  return result
}

export async function callApiApproveOrder(id: string | number) {
  const path = `/api/admin/approve-payment/${id}`;
  const rawResult = await callApi('GET', path, {}, true);

  return rawResult;
}
