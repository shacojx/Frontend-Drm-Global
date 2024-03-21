import { callApi } from "src/services-base/api";
import { transformGetCompanyInfo } from "src/services-business/api/transform-result/my-company";
import { RawCompanyInfo } from "./types";

export const callApiGetCompanyInfo = async () => {
  console.info("callApiGetCompanyInfo called");
  // const path = "url";
  // const rawResult = await callApi<RawCompanyInfo>("GET", path);

  const rawResult = {} as never;

  return transformGetCompanyInfo(rawResult);
};
