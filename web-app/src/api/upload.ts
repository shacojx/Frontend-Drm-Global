import { getAccessTokenInfo, getAuthorizationString } from "../services-base/api";

export type UploadResponse = {
  message: string;
  status: string;
  data: string[];
};

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

  const blob = await fetch(endpoint, options)
    .then((response) => response.blob())
    .then((blob) => {
      const a = document.createElement("a");
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.log("error", error));
};
