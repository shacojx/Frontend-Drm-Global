import {
  ApiRegisterAccountParam,
  CompanyTypeValue,
  EntityEnding,
  Industry,
  LocalPhone,
  NationPhone,
  NationValue
} from "../../../api/types";

type SplitCharacter = '_'
export type RNPhoneValue = `${NationPhone}${SplitCharacter}${LocalPhone}`

export function generatePhone(nationPhone: NationPhone, localPhone: LocalPhone): RNPhoneValue {
  const splitCharacter: SplitCharacter = '_'
  return `${nationPhone}${splitCharacter}${localPhone}`
}

type PhoneExtracted = {
  nationPhone: NationPhone,
  localPhone: LocalPhone,
}
export function extractPhone(phone: RNPhoneValue): PhoneExtracted {
  const splitCharacter: SplitCharacter = '_'
  const [nationPhone, localPhone] = phone.split(splitCharacter) as [NationPhone, LocalPhone]
  return {
    nationPhone,
    localPhone
  }
}

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
    companyName: companyName,
    entityEnding: entityEnding,
    industry: industry,
    website: website,
    companyDescription: companyDescription,
  }
}
