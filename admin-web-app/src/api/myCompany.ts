import { transformGetCompanyDetail } from '../services-business/api/transform-result/myCompany';
import { EditCompanyBody, RawCompanyDetail } from './types';
import { callApi } from '../services-base/api';

export const callApiGetCompanyDetail = async (id: number) => {
  const path = `api/admin/get-detail-company/${id}`;
  const rawResult = await callApi<RawCompanyDetail>('GET', path, {}, true);

  return transformGetCompanyDetail(rawResult);
};

export const callApiPostCompanyDetail = async (
  companyDetail: EditCompanyBody,
) => {
  const path = `/api/admin/update-company/${companyDetail.id}`;
  const rawResult = await callApi('POST', path, companyDetail, true);
};
