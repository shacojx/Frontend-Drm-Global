import { isNotNullish } from '../../utils/typeCheck';

export const QueryKeyApi = {
  getLlcServiceList: 'llcService/getList',
  getLlcServiceDetail: 'llcService/getDetail',
  getDetailCompany: 'myCompany/getDetail',
  getAvailableServices: 'services/availableServices',
  getServiceDetail: 'service/getServiceDetail',
  getPaidService: 'service/getPaidService',
  getBankAccounts: 'bank/getBankAccounts',
  searchPaidService: 'service/searchPaidService',
} as const;

const MutationKey = {
  postMyCompany: 'myCompany/postDetail',
  uploadKYC: 'account/uploadKYC',
  paymentService: 'service/paymentService',
};

export type KeyType = string | number | undefined;

function generateKey(...keys: KeyType[]): string[] {
  return keys.map((key) => key?.toString()).filter(isNotNullish);
}

const KeyFactory = {
  getLlcServiceList() {
    return generateKey(QueryKeyApi.getLlcServiceList);
  },
  getLlcServiceDetail(id: KeyType) {
    return generateKey(QueryKeyApi.getLlcServiceDetail, id);
  },
  getMyCompanyDetail(id: KeyType) {
    return generateKey(QueryKeyApi.getDetailCompany, id);
  },
  postCompanyDetail: () => generateKey(MutationKey.postMyCompany),
  uploadKYC: () => generateKey(MutationKey.uploadKYC),
  getAvailableServices: () => generateKey(QueryKeyApi.getAvailableServices),
  getServiceDetail: (...args: unknown[]) => [QueryKeyApi.getServiceDetail, ...args],
  paymentService: () => generateKey(MutationKey.paymentService),
  getBankAccounts: () => generateKey(QueryKeyApi.getBankAccounts),
  searchPaidService: () => generateKey(QueryKeyApi.searchPaidService),
  getPaidService: () => generateKey(QueryKeyApi.getPaidService),
};

export default KeyFactory;
