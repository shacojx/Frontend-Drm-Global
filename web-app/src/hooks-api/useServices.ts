import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query"
import { callApiGetAvailableServices, callApiGetDetailServices, callApiPaymentService } from "src/api/service"
import KeyFactory from "src/services-base/reactQuery/keyFactory"

export const useApiGetAvailableServices = () => {
  return useQuery({
    queryKey: KeyFactory.getAvailableServices(),
    queryFn: callApiGetAvailableServices
  })
}

type UseApiGetServiceDetailProps = {
  id: string | number | undefined
}

export const useApiGetServiceDetail = ({ id }: UseApiGetServiceDetailProps) => {
  return useQuery({
    queryKey: KeyFactory.getServiceDetail(id),
    queryFn: () => callApiGetDetailServices(id!),
    enabled: !!id
  })
}



export const useApiPaymentService = (props: Pick<UseMutationOptions, 'onError' | 'onSuccess'>) => {
  return useMutation({
    mutationKey: KeyFactory.paymentService(),
    mutationFn: callApiPaymentService,
  })
}