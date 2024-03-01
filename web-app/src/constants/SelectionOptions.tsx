import { NationPhone } from "../services-business/api/generate-api-param/generatePhone";
import { OptionInfo } from "../types/common";

export const NATION_INFOS: OptionInfo<NationValue>[] = [
  {value: 'USA', label: 'United States'},
]

export const NATION_PHONE_INFOS: OptionInfo<NationPhone>[] = [
  {value: '+84',label: '+84' , iconElement: <div>VN</div>}
]

export const COMPANY_TYPE_INFOS: OptionInfo<CompanyTypeValue>[] = [
  {value: 'LLC', label: 'LLC (Limited Liability Company)'},
  {value: 'PLC', label: 'PLC (Private Limited Company)'},
]
