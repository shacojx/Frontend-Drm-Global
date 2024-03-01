import { NationPhone } from "../services-business/api/generate-api-param/generatePhone";

export const NATION_INFOS: {value: NationValue, label: string}[] = [
  {value: 'USA', label: 'United States'},
]

type NationPhoneInfo = {
  value: NationPhone,
  label: string,
  flag: JSX.Element,
}
export const NATION_PHONE_INFOS: NationPhoneInfo[] = [
  {value: '+84',label: '+84' , flag: <div>VN</div>}
]

export const COMPANY_TYPE_INFOS: {value: CompanyTypeValue, label: string}[] = [
  {value: 'LLC', label: 'LLC (Limited Liability Company)'},
  {value: 'PLC', label: 'PLC (Private Limited Company)'},
]
