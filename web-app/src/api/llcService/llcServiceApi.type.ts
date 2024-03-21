import { StepType } from "src/pages/LLCMyService/types/my-service.type";

export type LLCServiceType = {
  status: number;
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
  step: StepType[];
};

export type UploadedDocumentType = {
  name: string;
  link: string;
};
