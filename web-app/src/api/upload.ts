export const uploadFile = async (file: File) => {
  const headers = new Headers();
  // headers.append(
  //   "Authorization",
  //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cnVuZ2x1Yy5kZXZAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcxMTAxNzY2MCwiZXhwIjoxNzExMDIxMjYwfQ.6qAZCavV_MjkLOUXiZWJ9Bo_HSm4meQR_rPkNZYNou9NIulRFXqcTaRqAJzKhWs8uQuFHxTxW3yvPV9V3mEK8g"
  // );

  const formData = new FormData();
  formData.append("files", file);

  var options = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  const data = await fetch(`${process.env.REACT_APP_URL}/api/file/upload`, options).then(
    (response) => response.json()
  );

  console.log(data);
  return data;
};
