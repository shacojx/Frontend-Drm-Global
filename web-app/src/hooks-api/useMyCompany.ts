import { useMutation, useQuery } from "@tanstack/react-query";
import { callApiGetCompanyDetail, callApiPostCompanyDetail } from "../api/myCompany";
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


export function useApiPostMyCompanyDetail(extraOption?: ExtraOptionQuery) {
  return useMutation({
    mutationKey: KeyFactory.postCompanyDetail(),
    mutationFn: callApiPostCompanyDetail,
  })
}
