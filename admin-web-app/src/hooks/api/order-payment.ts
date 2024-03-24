import { useQuery } from "@tanstack/react-query"
import { callApiGetOrders } from "../../api/payment"
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