import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  callApiGetCompanyDetail,
  callApiPostCompanyDetail,
} from '../api/myCompany';
import KeyFactory from '../services-base/reactQuery/keyFactory';
import {
  ExtraOptionQuery,
  mergeQueryOptions,
} from '../services-base/reactQuery/queryOption';

export function useApiGetMyCompanyDetail(
  id: number,
  extraOption?: ExtraOptionQuery,
) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: KeyFactory.getMyCompanyDetail(id),
        queryFn: () => callApiGetCompanyDetail(id),
        enabled: !!extraOption?.enabled,
      },
      extraOption,
    ),
  );
}

export function useApiUpdateMyCompanyDetail({
  onError,
  onSuccess,
}: Pick<
  UseMutationOptions<unknown, unknown, unknown>,
  'onError' | 'onSuccess'
>) {
  return useMutation({
    mutationKey: KeyFactory.postCompanyDetail(),
    mutationFn: callApiPostCompanyDetail,
    onError,
    onSuccess,
  });
}
