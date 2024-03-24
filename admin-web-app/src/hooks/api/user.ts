import { useQuery } from '@tanstack/react-query';
import { ApiViewUserParam } from '../../api/types';
import { callApiLViewUser, callApiSearchUser } from '../../api/userManagement';
import { KeyFactory } from '../../services-base/key-factory';

type UseGetUsersProps = {
  page: number;
  size: number;
  codePhone?: string;
  phone?: string;
  email?: string
} 

export const useApiGetUsers = ({ page, size, codePhone = '', phone = '', email = '' }: UseGetUsersProps) => {

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




