import { UploadedDocumentType } from "src/api/llcService/llcServiceApi.type";

export enum ServiceType {
  Pending = 1,
  InProgress = 2,
  Issued = 3,
}

export type TabType = {
  id: number;
  icon: React.ReactNode;
  header: string;
  deatail: string;
  status: ServiceType;
  color: string;
  clickable?: boolean;
  onClick?: () => void;
};

export type StepType = {
  id: number;
  name: string;
  status: ServiceType;
  issuingDuration: string;
  detail?: {
    step_description: string;
    remark: string;
    customer_document: {
      required_document: string;
      uploaded_document: UploadedDocumentType[];
    };
    service_document: {
      required_document: string;
      uploaded_document: UploadedDocumentType[];
    };
  };
};
