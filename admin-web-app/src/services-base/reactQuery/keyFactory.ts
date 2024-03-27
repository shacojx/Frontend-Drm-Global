import { isNotNullish } from '../../utils/typeCheck';

const QueryKey = {
  getLlcServiceList: 'llcService/getList',
  getLlcServiceDetail: 'llcService/getDetail',
  getMyCompany: 'myCompany/getDetail',
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
    return generateKey(QueryKey.getLlcServiceList);
  },
  getLlcServiceDetail(id: KeyType) {
    return generateKey(QueryKey.getLlcServiceDetail, id);
  },
  getMyCompanyDetail() {
    return generateKey(QueryKey.getMyCompany);
  },
  postCompanyDetail: () => generateKey(MutationKey.postMyCompany),
  uploadKYC: () => generateKey(MutationKey.uploadKYC),
  getAvailableServices: () => generateKey(QueryKey.getAvailableServices),
  getServiceDetail: () => generateKey(QueryKey.getServiceDetail),
  paymentService: () => generateKey(MutationKey.paymentService),
  getBankAccounts: () => generateKey(QueryKey.getBankAccounts),
  searchPaidService: () => generateKey(QueryKey.searchPaidService),
  getPaidService: () => generateKey(QueryKey.getPaidService),
};

export default KeyFactory;
