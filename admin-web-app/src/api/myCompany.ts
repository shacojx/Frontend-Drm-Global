import { transformGetCompanyDetail } from '../services-business/api/transform-result/myCompany';
import { EditCompanyBody, RawCompanyDetail } from './types';
import { callApi } from '../services-base/api';

export const callApiGetCompanyDetail = async () => {
  const path = '/api/user/get-my-company';
  const rawResult = await callApi<RawCompanyDetail>('GET', path, {}, true);
  console.log(rawResult);

  return transformGetCompanyDetail(rawResult);
};

export const callApiPostCompanyDetail = async (
  companyDetail: EditCompanyBody,
) => {
  const path = '/api/user/update-company';
  const rawResult = await callApi('POST', path, companyDetail, true);
};
