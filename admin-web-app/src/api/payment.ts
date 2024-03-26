import { groupBy } from "lodash";
import { callApi } from "../services-base/api";
import { ApiCreateOrderParam, ApiGetOrdersParam, RawRegisterServicesResult } from "./types";

export async function callCreateOrder(body: ApiCreateOrderParam) {
  const path = '/api/v1/orders'
  const rawResult = await callApi('POST', path, body)
  return rawResult
}

export async function callApiGetOrders({ page, pic = "", email = "" }: ApiGetOrdersParam) {
  const getAllPath = `/api/admin/get-paid-service?page=${page}&size=${100}`
  const searchPath = `/api/admin/search-paid-service`

  const isSearch = !!pic || !!email

  
  const response = isSearch 
    ? await callApi<RawRegisterServicesResult['content']>('POST', searchPath, { pic, email }, true)
    : await callApi<RawRegisterServicesResult>('GET', getAllPath, {}, true)

  const content = 'content' in response ? response.content : response
  console.log(response)
  const groups = groupBy(content, item => item.transitionId)

  const orders = Object.values(groups).map(groupItems => {
    const totalPricePerCycle = groupItems.reduce((acc, cur) => acc + cur.pricePerCycle, 0)

    return {...groupItems[0], pricePerCycle: totalPricePerCycle}
  })

  return { orders }
}

export async function callApiApproveOrder(id: string | number){
  const path = `/api/admin/approve-payment/${id}`
  const rawResult = await callApi('GET', path, {}, true)

  return rawResult
}