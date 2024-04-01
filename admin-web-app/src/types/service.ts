import { ApiSearchPaidServiceType } from '../api/types';

export interface Service {
  id: number;
  paidServiceId?: string;
  userId?: number;
  email?: string;
  codePhone?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  industry?: string;
  serviceId?: number;
  serviceType?: string;
  serviceName?: string;
  serviceDescription?: string;
  statusService?: string;
  cycleNumber?: number;
  pricePerCycle?: number;
  transitionId?: number;
  orderId?: string;
  statusPayment?: string;
  paymentMethod?: string;
  statusContract?: string;
  contractFile?: string;
  pic?: string;
  kycStatus?: string;
  llcInNation?:string;
  corporationProfileStatus?: string;
  serviceStep: ServiceStep[];
}
export interface ServiceStep {
  id: number;
  stepNo: number | null;
  stepName: string;
  statusStep: string;
  estimatedCompletionTime: string;
  description: string;
  adminRemark: string | null;
  customerDocument: {
    id: number;
    requiredDocument: string;
    fileDocument: string | null;
  }[];
  result: {
    id: number;
    requiredDocument: string;
    fileDocument: string | null;
  }[];
}

export const EMPTY_SEARCH: ApiSearchPaidServiceType = {
  pic: '',
  email: '',
};
