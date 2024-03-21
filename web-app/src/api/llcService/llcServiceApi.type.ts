import { StepType } from "src/pages/LLCMyService/types/my-service.type";

export type LLCServiceType = {
  status: number;
  step: StepType [];
};

export type UploadedDocumentType = {
  name: string;
  link: string;
};
