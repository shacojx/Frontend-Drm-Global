import { ApiRegisterAccountParam, CompanyTypeValue, EntityEnding, Industry, NationValue } from "../../../api/types";
import { extractPhone, RNPhoneValue } from "./generatePhone";

export function generateRegisterParam(
  llcInNation: NationValue,
  email: string,
  phone: RNPhoneValue,
  companyType: CompanyTypeValue,
  firstName: string,
  lastName: string,
  password: string,
  rePassword: string,
  companyName?: string,
  entityEnding?: EntityEnding,
  industry?: Industry,
  website?: string,
  companyDescription?: string,
): ApiRegisterAccountParam {
  const {nationPhone, localPhone} = extractPhone(phone)
  return {
    llcInNation,
    email,
    codePhone: nationPhone,
    phone: localPhone,
    companyType,
    firstName,
    lastName,
    password,
    rePassword,
    companyName: companyName || '_',
    entityEnding: entityEnding || 'LLC',
    industry: industry || '_',
    website: website || '_',
    companyDescription: companyDescription || '_',
  }
}
