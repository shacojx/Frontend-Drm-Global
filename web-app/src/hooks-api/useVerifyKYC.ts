import { useMutation, useQuery } from "@tanstack/react-query";
import { callApiUploadKYC } from "src/api/account";
import { getAccessTokenInfo, getAuthorizationString } from "src/services-base/api";
import KeyFactory from "src/services-base/reactQuery/keyFactory";

type UseVerifyKYCProps = {
  onSuccess?: () => void
  onError?: () => void
}

export const useVerifyKYC = ({onError, onSuccess}: UseVerifyKYCProps = {}) => {
  return useMutation({
    mutationKey: KeyFactory.uploadKYC(),
    mutationFn: callApiUploadKYC,
    onError, 
    onSuccess
  })
}