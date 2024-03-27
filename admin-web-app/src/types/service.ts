import { ApiSearchPaidServiceType } from '../api/types';

export interface Service {
  updatedAt: string;
  createdAt: string;
  id: number;
  userId: number;
  serviceId: number;
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  statusService: string;
  cycleNumber: number;
  pricePerCycle: number;
  transitionId: number;
  statusPayment: string;
  paymentMethod: string;
  statusContract: string;
  contractFile: string | null;
  pic: string | null;
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
