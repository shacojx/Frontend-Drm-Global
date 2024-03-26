import { ServiceSearchFilter } from '../types/serviceSearchFilter';
import { callApi } from '../services-base/api';
import { RawResult, ViewedUser } from './types';
import { Service } from '../types/service';

export async function callApiGetListService(
  param?: Partial<ServiceSearchFilter>,
): Promise<RawResult<Service[]>> {
  const path = '/api/admin/get-paid-service';
  return await callApi<RawResult<Service[]>>(
    'GET',
    path,
    param as Partial<ServiceSearchFilter>,
    true,
  );
}

export async function callApiGetListServiceByCondition(param?: {
  pic?: string;
  email?: string;
}): Promise<RawResult<Service[]>> {
  const path = '/api/admin/search-paid-service';
  return await callApi<RawResult<Service[]>>(
    'GET',
    path,
    param as Partial<ServiceSearchFilter>,
    true,
  );
}

export async function callApiGetServiceDetail(serviceId: number) {
  const path = '/api/admin/get-paid-service/' + serviceId;
  return await callApi<Service>(
    'GET',
    path,
    {} as Partial<ServiceSearchFilter>,
    true,
  );
}

export async function callApiUpdatePic(data: { id: number; email: string }) {
  const path = '/api/admin/update-pic';
  return await callApi<ViewedUser[]>('POST', path, data, true);
}

export async function callApiUpdateAdminRemark(data: {
  id: number;
  adminRemark: string;
}) {
  const path = '/api/admin/update-admin-remark';
  return await callApi<ViewedUser[]>('POST', path, data, true);
}

export async function callApiUploadStatusStep(data: {
  id: number;
  status: string;
}) {
  const path = '/api/admin/update-status-step';
  return await callApi('POST', path, data, true);
}
