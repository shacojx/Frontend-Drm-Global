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

export const ENTITY_ENDING_INFOS: OptionInfo<EntityEnding>[] = [
  {value: 'LLC', label: 'LLC'},
  {value: 'L.L.C', label: 'L.L.C'},
  {value: 'LIMITED LIABILITY COMPANY', label: 'LIMITED LIABILITY COMPANY'},
  {value: 'PRIVATE LIMITED COMPANY', label: 'PRIVATE LIMITED COMPANY'},
]

export const INDUSTRY_INFOS: OptionInfo<Industry>[] = [
  {value: 'Accounting and tax preparation', label: 'Accounting and tax preparation'},
  {value: 'Advertising', label: 'Advertising'},
  {value: 'Agriculture', label: 'Agriculture'},
  {value: 'Art and photography', label: 'Art and photography'},
  {value: 'Artificial intelligence', label: 'Artificial intelligence'},
  {value: 'Augmented reality', label: 'Augmented reality'},
  {value: 'B2B', label: 'B2B'},
  {value: 'Biotech', label: 'Biotech'},
  {value: 'Community', label: 'Community'},
  {value: 'Construction', label: 'Construction'},
  {value: 'Consulting', label: 'Consulting'},
  {value: 'Consumer', label: 'Consumer'},
  {value: 'Crypto', label: 'Crypto'},
  {value: 'Developer tools', label: 'Developer tools'},
  {value: 'Drones', label: 'Drones'},
  {value: 'Online retailer', label: 'Online retailer'},
  {value: 'Education', label: 'Education'},
  {value: 'Energy', label: 'Energy'},
  {value: 'Enterprise', label: 'Enterprise'},
  {value: 'Entertainment', label: 'Entertainment'},
  {value: 'Financial services', label: 'Financial services'},
  {value: 'Other health and fitness services', label: 'Other health and fitness services'},
  {value: 'Other food services', label: 'Other food services'},
  {value: 'Government', label: 'Government'},
  {value: 'Hardware', label: 'Hardware'},
  {value: 'Health services', label: 'Health services'},
  {value: 'Healthcare', label: 'Healthcare'},
  {value: 'Insurance', label: 'Insurance'},
  {value: 'Private investment companies', label: 'Private investment companies'},
  {value: 'Legal services including law', label: 'Legal services including law'},
  {value: 'Firms marketing', label: 'Firms marketing'},
  {value: 'Marketplace', label: 'Marketplace'},
  {value: 'Media', label: 'Media'},
  {value: 'Nonprofit', label: 'Nonprofit'},
  {value: 'Other', label: 'Other'},
  {value: 'Real estate', label: 'Real estate'},
  {value: 'Employment services', label: 'Employment services'},
  {value: 'Research', label: 'Research'},
  {value: 'Robotics', label: 'Robotics'},
  {value: 'Security', label: 'Security'},
  {value: 'Sports teams and clubs', label: 'Sports teams and clubs'},
  {value: 'Transportation', label: 'Transportation'},
  {value: 'Other travel services', label: 'Other travel services'},
  {value: 'Virtual reality', label: 'Virtual reality'},
]

