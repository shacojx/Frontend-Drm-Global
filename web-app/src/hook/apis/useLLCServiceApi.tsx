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
