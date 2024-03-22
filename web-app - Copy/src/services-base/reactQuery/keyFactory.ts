import { isNotNullish } from "../../utils/typeCheck";

const QueryKey = {
  getLlcServiceList: 'llcService/getList',
  getLlcServiceDetail: 'llcService/getDetail',
  getMyCompany: 'myCompany/getDetail',
} as const

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
  }
}

export default KeyFactory
