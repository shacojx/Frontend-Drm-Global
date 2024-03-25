import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query"
import { callApiApproveOrder, callApiGetOrders } from "../../api/payment"
import { KeyFactory } from "../../services-base/key-factory"

type UseApiGetOrdersProps = {
  page: number
}

export const useApiGetOrders = ({ page }: UseApiGetOrdersProps) => {
    return useQuery({
      queryKey: KeyFactory.getOrders(page),
      queryFn: () => callApiGetOrders({ page })
    })
}

export const useApiApproveOrder = ({onError, onSuccess}: Pick<UseMutationOptions<unknown, Error, string | number, unknown>, 'onError' | 'onSuccess'> = {}) => {
  return useMutation({
    mutationFn: callApiApproveOrder,
    onError, 
    onSuccess
  })
}