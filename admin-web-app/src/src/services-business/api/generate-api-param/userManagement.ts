import {
  ApiEditUserParam,
  CompanyTypeValue,
  EntityEnding,
  Industry,
  NationValue
} from "../../../api/types";
import { extractPhone, RNPhoneValue } from "./account";

export function generateEditUserParam(
  idUser: number,
  enable: number,
  llcInNation: NationValue,
  email: string,
  phone: RNPhoneValue,
  companyType: CompanyTypeValue,
  firstName: string,
  lastName: string,
  companyName?: string,
  entityEnding?: EntityEnding,
  industry?: Industry,
  website?: string,
  companyDescription?: string,
): ApiEditUserParam {
  const {nationPhone, localPhone} = extractPhone(phone)
  return {
    idUser: idUser,
    enable: enable,
    llcInNation,
    email,
    codePhone: nationPhone,
    phone: localPhone,
    companyType,
    firstName,
    lastName,
    companyName: companyName || '',
    entityEnding: entityEnding || '',
    industry: industry || '',
    website: website || '',
    companyDescription: companyDescription || '',
  }
}
