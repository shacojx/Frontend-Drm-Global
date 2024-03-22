import { transformGetCompanyDetail } from "../services-business/api/transform-result/myCompany";
import { CompanyDetail } from "./types";

export const callApiGetCompanyDetail = async () => {
  // TODO:  implement after api is ready

  // const path = "url";
  // const rawResult = await callApi<RawCompanyInfo>("GET", path);

  const rawResult = {} as never;

  return transformGetCompanyDetail(rawResult);
};


export const callApiPostCompanyDetail = async (companyDetail: CompanyDetail) => {
  // TODO:  implement after api is ready

  // const path = "url";
  // const rawResult = await callApi<("POST", path);
}
