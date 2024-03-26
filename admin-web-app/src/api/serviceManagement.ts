import { ServiceSearchFilter } from '../types/serviceSearchFilter';
import { callApi, getAccessTokenInfo, getAuthorizationString } from '../services-base/api';
import { ApiSearchPaidServiceType, RawResult, RawResultPOST, ViewedUser } from './types';
import { Service } from '../types/service';
import { UploadResponse } from './upload';
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

export async function callApiSearchPaidService(body: ApiSearchPaidServiceType) {
  const path = '/api/admin/search-paid-service';
  return await callApi<Service[]>('POST', path, body, true);
}

export async function callApiGetServiceDetail(serviceId: number | string) {
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
  return await callApi<RawResultPOST>('POST', path, data, true);
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


export async function callApiUploadCustomerDocument(body: FormData) {
  const headers = new Headers();
  headers.append("Authorization", getAuthorizationString((await getAccessTokenInfo())!));

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };
  const URL_UPLOAD = 'api/file/upload-final-contract'

  const endpoint = `${process.env.REACT_APP_URL}/${URL_UPLOAD}`;

  const data = (await fetch(endpoint, options).then((response) =>
    response.json()
  )) as UploadResponse;

  return data;
}
