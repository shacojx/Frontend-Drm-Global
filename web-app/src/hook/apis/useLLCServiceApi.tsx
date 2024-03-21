import { useQuery } from "@tanstack/react-query";
import llcServiceApi from "src/api/llcService/llcServiceApi";
import { queryKeyApi } from "src/constants/queryKeyApi";

export default function useLLCServiceApi() {
  return useQuery({
    queryKey: [queryKeyApi.llcService],
    queryFn: () => llcServiceApi.getList(),
    // placeholderData: (previousData) => previousData,
  });
}


export function useLLCServiceDetailApi(id: number) {
  return useQuery({
    queryKey: [queryKeyApi.llcServiceItem, { id }],
    queryFn: () => llcServiceApi.getById(id),
    // placeholderData: (previousData) => previousData,
    enabled: !!id
  },
  );
}

