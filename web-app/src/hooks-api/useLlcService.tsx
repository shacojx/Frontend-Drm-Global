import { useQuery } from "@tanstack/react-query";
import { ExtraOptionQuery, mergeQueryOptions } from "../services-base/reactQuery/queryOption";
import { callApiGetListLlcServices, callApiGetLlcServiceById } from "../api/llcService";
import KeyFactory from "../services-base/reactQuery/keyFactory";

export function useApiLLCService(extraOption?: ExtraOptionQuery) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: KeyFactory.getLlcServiceList(),
        queryFn: () => callApiGetListLlcServices(),
      },
      extraOption
    )
  )
}


export function useApiLLCServiceDetail(id: number, extraOption?: ExtraOptionQuery) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: KeyFactory.getLlcServiceDetail(id),
        queryFn: () => callApiGetLlcServiceById(id),
      },
      extraOption
    )
  )
}
