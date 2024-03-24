import { isNotNullish } from "../../utils/typeCheck";

const QueryKey = {
  getLlcServiceList: 'llcService/getList',
  getLlcServiceDetail: 'llcService/getDetail',
  getMyCompany: 'myCompany/getDetail',
  getAvailableServices: 'services/availableServices'
} as const

const MutationKey = {
  postMyCompany: 'myCompany/postDetail',
  uploadKYC: 'account/uploadKYC',
}

export type KeyType = string | number | undefined

function generateKey(...keys: KeyType[]): string[] {
  return keys
    .map(key => key?.toString())
    .filter(isNotNullish)
}

const KeyFactory = {
  getLlcServiceList() {
    return generateKey(QueryKey.getLlcServiceList)
  },
  getLlcServiceDetail(id: KeyType) {
    return generateKey(QueryKey.getLlcServiceDetail, id)
  },
  getMyCompanyDetail() {
    return generateKey(QueryKey.getMyCompany)
  },
  postCompanyDetail: () => generateKey(MutationKey.postMyCompany),
  uploadKYC: () => generateKey(MutationKey.uploadKYC),
  getAvailableServices: () => generateKey(QueryKey.getAvailableServices)
}

export default KeyFactory
