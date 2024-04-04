import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query"
import { callApiApproveOrder, callApiGetOrders } from "../../api/payment"
import { ApiGetOrdersParam } from "../../api/types";
import { KeyFactory } from "../../services-base/key-factory"

export const useApiGetOrders = ({ page, size }: ApiGetOrdersParam) => {
    return useQuery({
      queryKey: KeyFactory.getOrders(page),
      queryFn: () => callApiGetOrders({ page, size })
    })
}

export const useApiApproveOrder = ({onError, onSuccess}: Pick<UseMutationOptions<unknown, Error, string | number, unknown>, 'onError' | 'onSuccess'> = {}) => {
  return useMutation({
    mutationFn: callApiApproveOrder,
    onError,
    onSuccess
  })
}
