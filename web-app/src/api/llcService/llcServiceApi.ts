import { SuccessResponseApi } from "src/types/common";
import { callApi } from "../../services-base/api";
import { LLCServiceType } from "./llcServiceApi.type";

const PREFIX = "api/";

const llcServiceApi = {
  getList: async () => {
    return new Promise<SuccessResponseApi<LLCServiceType>>(
      (resolve, reject) => {
        resolve({
          data: {
            status: 2,
            step_description:
              "State filings are done in the state you picked for your formation. We take care of registered agents in the state and all necessary filings with the Secretary of State.",
            remark:
              "You don't have to upload any paper, we will do all the paper work of this step",
            customer_document: {
              required_document: "none",
              uploaded_document: [
                {
                  name: "file a.pdf",
                  link: "download",
                },
              ],
            },
            service_document: {
              required_document: "State Filling Information",
              uploaded_document: [
                {
                  name: "EEE Company_State Filling Information.pdf",
                  link: "download",
                },
                {
                  name: "EEE Company_State Filling Information.pdf",
                  link: "download",
                },
              ],
            },
            step:[
              {
                name: "State Filings",
                issuingDuration: "2 - 5 days",
                status: 3,
                id: 1,
              },
              {
                name: "Communication",
                issuingDuration: "2 - 5 days",
                status: 2,
                id: 2,
              },
              {
                name: "EIN",
                issuingDuration: "2 - 5 days",
                status: 1,
                id: 3,
              },
              {
                name: "Bank account",
                issuingDuration: "2 - 5 days",
                status: 1,
                id: 4,
              },
            ]
          },
          message: "okk",
        });
      }
    );
    // return await callApi<any>("GET", `${PREFIX}/register`, {});
  },
};

export default llcServiceApi;
