import { getAccessTokenInfo, getAuthorizationString } from "src/services-base/api";
import { UploadResponse } from "./types";

export const uploadFile = async (file: File) => {
  const headers = new Headers();
  headers.append("Authorization", getAuthorizationString((await getAccessTokenInfo())!));

  const formData = new FormData();
  formData.append("files", file);

  const options = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  const endpoint = `${process.env.REACT_APP_URL}/api/file/upload`;

  const data = (await fetch(endpoint, options).then((response) =>
    response.json()
  )) as UploadResponse;

  return data;
};

export const getFile = async (name: string) => {
  const headers = new Headers();
  headers.append("Authorization", getAuthorizationString((await getAccessTokenInfo())!));

  const options = {
    method: "GET",
    headers: headers,
  };

  const endpoint = `${process.env.REACT_APP_URL}/api/file/files/${name}`;
  fetch(endpoint, options)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
