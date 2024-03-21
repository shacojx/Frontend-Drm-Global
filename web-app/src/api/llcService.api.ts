import { callApi } from "../services-base/api";

const PREFIX = "api/";

const llcServiceApi = {
  getList: async () => {
    new Promise((resolve, reject) => {
      resolve({
        data: {
          status: 2,
        },
      });
    });
    // return await callApi<any>("GET", `${PREFIX}/register`, {});
  },
};

export default llcServiceApi;
