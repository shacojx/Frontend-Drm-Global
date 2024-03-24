import { useQuery } from "@tanstack/react-query"
import { callApiGetAvailableServices } from "src/api/service"
import KeyFactory from "src/services-base/reactQuery/keyFactory"

export const useApiGetAvailableServices = () => {
  return useQuery({
    queryKey: KeyFactory.getAvailableServices(),
    queryFn: callApiGetAvailableServices
  })
}