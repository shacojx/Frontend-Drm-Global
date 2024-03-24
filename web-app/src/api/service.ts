import { callApi } from "src/services-base/api"
import { filterServiceToDisplay } from "../services-business/api/transform-result/service";
import { callApiGetListLlcServices } from "./llcService";
import { PaymentServiceBody, RawService, RawServiceDetail } from "./types"

export const callApiGetAvailableServices = async () => {
  const path = '/api/user/get-service'
  const [rawServiceResult, allPaidService] = await Promise.all(
    [
      callApi<RawService[]>("GET", path, {}, true),
      callApiGetListLlcServices(),
    ]
  )
  return filterServiceToDisplay(rawServiceResult, allPaidService)
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
