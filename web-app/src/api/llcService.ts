import { callApi, getAccessTokenInfo, getAuthorizationString } from "src/services-base/api";
import { MyServiceType } from "./types";
import { UploadResponse } from "src/api/upload";

const URL = 'api/user/get-paid-service'
const URL_UPLOAD = 'api/file/upload-customer-document'


export async function callApiGetListLlcServices() {
  return await callApi<MyServiceType[]>("GET", `${URL}`, {}, true);
}

// @ts-ignore
export async function callApiGetLlcServiceById(id: number) {
  return await callApi<MyServiceType>("GET", `${URL}/${id}`, {}, true);
}

// @ts-ignore
export async function callApiUploadCustomerDocument(body: FormData) {
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

