import { callApi } from "src/services-base/api"
import { RawService } from "./types"

export const callApiGetAvailableServices = () => {
  const path = '/api/user/get-service'
  const rawResult = callApi<RawService[]>("GET", path, {}, true)

  return rawResult
}


export const callApiGetDetailServices = () => { 
  const path = '/api/user/detail-service'
}