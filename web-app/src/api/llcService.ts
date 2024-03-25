import { CONTENT_TYPE, callApi, getAccessTokenInfo, getAuthorizationString } from "src/services-base/api";
import { LLCServiceStatusType, MyServiceType } from "./types";
import { UploadResponse } from "src/api/upload";

// TODO: remove sample data

const URL = 'api/user/get-paid-service'
const URL_UPLOAD = 'api/file/upload-customer-document'


export async function callApiGetListLlcServices() {
  // TODO: implement call api
  return await callApi<MyServiceType[]>("GET", `${URL}`, {}, true);
}

// @ts-ignore
export async function callApiGetLlcServiceById(id: number) {
  // TODO: implement call api
  return await callApi<MyServiceType>("GET", `${URL}/${id}`, {}, true);
}

// @ts-ignore
export async function callApiUploadCustomerDocument(body: FormData) {
  // TODO: implement call api
  // return await callApi<any>("POST", `${URL_UPLOAD}`, body, true, CONTENT_TYPE.MULTIPART_FORM_DATA );
  const headers = new Headers();
  headers.append("Authorization", getAuthorizationString((await getAccessTokenInfo())!));

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const endpoint = `${process.env.REACT_APP_URL}/${URL_UPLOAD}`;

  const data = (await fetch(endpoint, options).then((response) =>
    response.json()
  )) as UploadResponse;

  return data;
}

