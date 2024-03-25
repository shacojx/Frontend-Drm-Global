export interface Service {
  id: number;
  userId: number;
  serviceId: number;
  serviceType: string;
  serviceName: string;
  serviceDescription: string;
  statusService: string;
  statusPayment: string;
  statusContract: string;
  cycleNumber: number;
  pricePerCycle: number;
  transitionId: number;
  contractFile: File | null;
  pic: string | null;
  updatedAt: string;
  createdAt: string;
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
