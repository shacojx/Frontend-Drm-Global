import { useMutation, useQuery } from '@tanstack/react-query';
import { callApiCreateAdminAccount } from '../../api/account';
import {
  callApiLViewUser,
  callApiSearchUser,
  callApiSearchUserByRole,
} from '../../api/userManagement';
import { KeyFactory } from '../../services-base/key-factory';
import { ApiSearchUserByRole } from '../../api/types';

type UseGetUsersProps = {
  page: number;
  size: number;
  codePhone?: string;
  phone?: string;
  email?: string;
};

export const useApiGetUsers = ({
  page,
  size,
  codePhone = '',
  phone = '',
  email = '',
}: UseGetUsersProps) => {
  if (codePhone || phone || email) {
    return useQuery({
      queryKey: KeyFactory.searchUsers(codePhone, email, phone),
      queryFn: () => callApiSearchUser({ codePhone, email, phone }),
    });
  }

  return useQuery({
    queryKey: KeyFactory.getAllUsers(page, size),
    queryFn: () => callApiLViewUser({ page, size }),
  });
};

export const useApiCreateUser = () => {
  return useMutation({
    mutationKey: KeyFactory.createUser(),
    mutationFn: callApiCreateAdminAccount,
  });
};

export const useApiUserSearchByRole = (body: ApiSearchUserByRole) => {
  return useQuery({
    queryKey: KeyFactory.searchUserByRole(body),
    queryFn: () => callApiSearchUserByRole(body),
  });
};
