import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import {
  callApiGetListService,
  callApiGetServiceDetail,
  callApiSearchPaidService,
  callApiSendPaymentReminder,
  callApiSendRequiredDocumentReminder,
  callApiUpdateAdminRemark,
  callApiUpdatePic,
  callApiUpdateStatusService,
  callApiUploadCustomerDocument,
  callApiUploadStatusStep,
} from '../api/serviceManagement';
import { ApiSearchPaidServiceType, PaginationType } from '../api/types';
import KeyFactory from '../services-base/reactQuery/keyFactory';
import {
  ExtraOptionQuery,
  mergeQueryOptions,
} from '../services-base/reactQuery/queryOption';

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

export function useApiServiceUpdatePic() {
  return useMutation({
    mutationFn: callApiUpdatePic,
  });
}


export function useApiServiceStatusUpdate() {
  return useMutation({
    mutationFn: callApiUpdateStatusService,
  });
}
export function useApiSendPaymentReminder() {
  return useMutation({
    mutationFn: callApiSendPaymentReminder,
  });
}

export function useApiSendRequiredDocumentReminder() {
  return useMutation({
    mutationFn: callApiSendRequiredDocumentReminder,
  });
}