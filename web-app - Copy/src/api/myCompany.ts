import { transformGetCompanyInfo } from "../services-business/api/transform-result/myCompany";

export const callApiGetCompanyDetail = async () => {
  // const path = "url";
  // const rawResult = await callApi<RawCompanyInfo>("GET", path);

  const rawResult = {} as never;

  return transformGetCompanyInfo(rawResult);
};
