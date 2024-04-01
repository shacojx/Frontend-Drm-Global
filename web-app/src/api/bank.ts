import { callApi } from "src/services-base/api"
import { BankAccount } from "./types"

export const callApiGetBankAccounts = () => {
  const path = '/api/user/get-bank-cashout'

  return callApi<BankAccount[]>('GET', path, {})
}