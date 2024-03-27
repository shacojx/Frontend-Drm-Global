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
import {
  callApiGetListService,
  callApiGetServiceDetail,
  callApiSearchPaidService,
  callApiUpdateAdminRemark,
  callApiUploadCustomerDocument,
  callApiUploadStatusStep,
} from '../api/serviceManagement';
import { ApiSearchPaidServiceType, PaginationType } from '../api/types';

export function useApiSearchPaidService(
  body: ApiSearchPaidServiceType,
  extraOption?: ExtraOptionQuery,
) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: [KeyFactory.searchPaidService(), body],
        queryFn: () => callApiSearchPaidService(body),
        enabled: !!extraOption?.enabled,
      },
      extraOption,
    ),
  );
}

export function useApicalGetListService(
  param: PaginationType,
  extraOption?: ExtraOptionQuery,
) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: [KeyFactory.getPaidService(), param],
        queryFn: () => callApiGetListService(param),
        enabled: !!extraOption?.enabled,
      },
      extraOption,
    ),
  );
}

export function useApiGetServiceDetail(
  id: number | string,
  extraOption?: ExtraOptionQuery,
) {
  return useQuery(
    mergeQueryOptions(
      {
        queryKey: KeyFactory.getServiceDetail(id),
        queryFn: () => callApiGetServiceDetail(id),
        enabled: !!extraOption?.enabled,
      },
      extraOption,
    ),
  );
}

export function useApiServiceUploadFinalContract() {
  return useMutation({
    mutationFn: callApiUploadCustomerDocument,
  });
}

export function useApiServiceUpdateAdminRemark() {
  return useMutation({
    mutationFn: callApiUpdateAdminRemark,
  });
}

export function useApiServiceUploadStatusStep() {
  return useMutation({
    mutationFn: callApiUploadStatusStep,
  });
}
