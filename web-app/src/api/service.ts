import { callApi } from "src/services-base/api"
import { PaymentServiceBody, RawService, RawServiceDetail } from "./types"

export const callApiGetAvailableServices = () => {
  const path = '/api/user/get-service'
  const rawResult = callApi<RawService[]>("GET", path, {}, true)

  return rawResult
}


export const callApiGetDetailServices = (id: string | number) => { 
  const path = `/api/user/detail-service/${id}`
  const rawResult = callApi<RawServiceDetail>("GET", path, {}, true)

  return rawResult
}

export const callApiPaymentService = async ({ id, ...body }: PaymentServiceBody & { id: string | number }) => {
  const path = `/api/user/register-service/${id}`
  const rawResult = await callApi("POST", path, body, true)

  return rawResult
}