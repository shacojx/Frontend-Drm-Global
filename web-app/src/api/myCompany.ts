import { callApi } from "src/services-base/api";
import { transformGetCompanyDetail } from "../services-business/api/transform-result/myCompany";
import { CompanyDetail, EditCompanyBody, RawCompanyDetail } from "./types";

export const callApiGetCompanyDetail = async () => {
  const path = "/api/user/get-my-company";
  const rawResult = await callApi<RawCompanyDetail>("GET", path, {}, true);

  return transformGetCompanyDetail(rawResult);
};


export const callApiPostCompanyDetail = async (companyDetail: EditCompanyBody) => {
  const path = "/api/user/update-company";
  const rawResult = await callApi("POST", path, companyDetail, true);
}
