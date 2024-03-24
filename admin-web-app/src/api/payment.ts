import { groupBy } from "lodash";
import { callApi } from "../services-base/api";
import { ApiCreateOrderParam, ApiGetOrdersParam, RawRegisterServicesResult } from "./types";

export async function callCreateOrder(body: ApiCreateOrderParam) {
  const path = '/api/v1/orders'
  const rawResult = await callApi('POST', path, body)
  return rawResult
}

export async function callApiGetOrders({ page }: ApiGetOrdersParam) {
  const path = `/api/admin/get-paid-service?page=${page}&size=${100}`
  const { content } = await callApi<RawRegisterServicesResult>('GET', path, {}, true)

  const groups = groupBy(content, item => item.transitionId)

  const orders = Object.values(groups).map(groupItems => {
    const totalPricePerCycle = groupItems.reduce((acc, cur) => acc + cur.pricePerCycle, 0)

    return {...groupItems[0], pricePerCycle: totalPricePerCycle}
  })

  return { orders }
}

export async function callApiApproveOrder(id: string | number){
  const path = `/api/admin/approve-payment/${id}`
  const rawResult = await callApi('POST', path, {}, true)

  return rawResult
}