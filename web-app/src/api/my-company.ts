import { callApi } from "src/services-base/api";
import { transformGetCompanyInfo } from "src/services-business/api/transform-result/my-company";
import { RawCompanyDetail } from "./types";

export const callApiGetCompanyDetail = async () => {
  console.info("callApiGetCompanyInfo called");
  // const path = "url";
  // const rawResult = await callApi<RawCompanyInfo>("GET", path);

  const rawResult = {} as never;

  return transformGetCompanyInfo(rawResult);
};
