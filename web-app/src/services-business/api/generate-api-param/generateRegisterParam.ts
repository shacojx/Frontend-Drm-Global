import { ApiRegisterAccountParam } from "../../../api/account";

export function generateRegisterParam(
  llcInNation: string,
  email: string,
  phone: string,
  companyType: string,
  password: string,
  rePassword: string,
  companyName?: string,
  entityEnding?: string,
  industry?: string,
  website?: string,
  companyDescription?: string,
): ApiRegisterAccountParam {
  return {
    llcInNation,
    email,
    phone,
    companyType,
    password,
    rePassword,
    companyName: companyName || '_',
    entityEnding: entityEnding || '_',
    industry: industry || '_',
    website: website || '_',
    companyDescription: companyDescription || '_',
  }
}
