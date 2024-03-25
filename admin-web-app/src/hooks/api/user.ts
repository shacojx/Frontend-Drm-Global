import { useMutation, useQuery } from '@tanstack/react-query';
import { callApiCreateAdminAccount } from '../../api/account';
import { callApiLViewUser } from '../../api/userManagement';
import { KeyFactory } from '../../services-base/key-factory';

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
  // if (codePhone || phone || email) {
  //   return useQuery({
  //     queryKey: KeyFactory.getAllUsers(page, size),
  //     queryFn: () => callApiSearchUser({codePhone, email, phone}),
  //   });
  // }

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
