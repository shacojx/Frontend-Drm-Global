import { useQuery } from "@tanstack/react-query";
import { callApiGetCompanyDetail } from "../api/myCompany";
import KeyFactory from "../services-base/reactQuery/keyFactory";
import { ExtraOptionQuery, mergeQueryOptions } from "../services-base/reactQuery/queryOption";

export function useApiGetMyCompanyDetail(extraOption?: ExtraOptionQuery) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: KeyFactory.getMyCompanyDetail(),
        queryFn: () => callApiGetCompanyDetail(),
      },
      extraOption
    )
  )
}
