import { useQuery } from "@tanstack/react-query"
import { callApiGetBankAccounts } from "src/api/bank"
import KeyFactory from "src/services-base/reactQuery/keyFactory"

export const useApiGetBanks = () => {
  return useQuery({
    queryKey: KeyFactory.getBankAccounts(),
    queryFn: callApiGetBankAccounts
  })
}