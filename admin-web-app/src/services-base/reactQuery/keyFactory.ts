import { isNotNullish } from '../../utils/typeCheck';

const QueryKey = {
  getLlcServiceList: 'llcService/getList',
  getLlcServiceDetail: 'llcService/getDetail',
  getMyCompany: 'myCompany/getDetail',
  getAvailableServices: 'services/availableServices',
  getServiceDetail: 'service/getServiceDetail',
  getBankAccounts: 'bank/getBankAccounts',
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
  getServiceDetail: (id: KeyType) => generateKey(QueryKey.getServiceDetail, id),
  paymentService: () => generateKey(MutationKey.paymentService),
  getBankAccounts: () => generateKey(QueryKey.getBankAccounts),
};

export default KeyFactory;
