import { useMutation, useQuery } from "@tanstack/react-query";
import { callApiApproveKyc, callApiGetKyc, callApiRejectKyc } from "../../api/kycManagement";
import { KeyFactory } from "../../services-base/key-factory";

type UseApiGetKyc ={
  page: number;
  size: number;
}

export const useApiGetKYCs = ({page, size}: UseApiGetKyc) => {
  return useQuery({
    queryKey: KeyFactory.getKYCs(),
    queryFn: () => callApiGetKyc({page, size})
  })
}

export const useApiApproveKYC = () => {
  return useMutation({
    mutationKey: [],
    mutationFn: callApiApproveKyc,
    // onSuccess: 
  })
}


export const useApiRejectKYC = () => {
  return useMutation({
    mutationKey: [],
    mutationFn: callApiRejectKyc
  })
}