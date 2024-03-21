import { RawCompanyInfo } from "src/api/types";
import { CompanyInformation } from "src/types/my-company";

export const transformGetCompanyInfo = (data: RawCompanyInfo): CompanyInformation => {
  // TODO: complete this function
  const mock = {
    companyName: "Lesor IT Solution",
    entityEnding: "LLC",
    industry: "Art and photography",
    website: "website",
    description: "description",
    region: "region",
  };

  return mock;
};
