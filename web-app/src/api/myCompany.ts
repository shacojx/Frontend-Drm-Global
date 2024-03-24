import { callApi } from "src/services-base/api";
import { transformGetCompanyDetail } from "../services-business/api/transform-result/myCompany";
import { CompanyDetail, RawCompanyDetail } from "./types";

export const callApiGetCompanyDetail = async () => {
  const path = "/api/user/get-my-company";
  const rawResult = await callApi<RawCompanyDetail>("GET", path, {}, true);
  console.log(rawResult)

  return transformGetCompanyDetail(rawResult);
};


export const callApiPostCompanyDetail = async (companyDetail: CompanyDetail) => {
  // TODO:  implement after api is ready

  // const path = "url";
  // const rawResult = await callApi<("POST", path);
}
