import { callApi } from '../services-base/api';


export async function callApiGetCMSToken() {
  const path = `/chat/api/v1/get-cms-token`;
  const rawResult = await callApi('GET', path, {}, true);

  return rawResult;
}
