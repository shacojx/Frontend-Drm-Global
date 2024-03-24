import { useQuery } from "@tanstack/react-query";
import { callApiGetKyc } from "../../api/kycManagement";
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