import { ApiRegisterAccountParam } from "../../../api/account";
import { CompanyTypeValue, EntityEnding, Industry, NationValue } from "../../../api/types";
import { generateApiPhone, RNPhoneValue } from "./generatePhone";

export function generateRegisterParam(
  llcInNation: NationValue,
  email: string,
  phone: RNPhoneValue,
  companyType: CompanyTypeValue,
  password: string,
  rePassword: string,
  companyName?: string,
  entityEnding?: EntityEnding,
  industry?: Industry,
  website?: string,
  companyDescription?: string,
): ApiRegisterAccountParam {
  return {
    llcInNation,
    email,
    phone: generateApiPhone(phone),
    companyType,
    password,
    rePassword,
    companyName: companyName || '_',
    entityEnding: entityEnding || 'LLC',
    industry: industry || '_',
    website: website || '_',
    companyDescription: companyDescription || '_',
  }
}
