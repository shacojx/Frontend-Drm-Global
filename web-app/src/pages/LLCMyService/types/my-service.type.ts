
export enum ServiceStatusType {
  Pending = 'Pending',
  InProgress = 'In-Progress',
  Issued = 'Issued',
}

export type TabType = {
  id: number;
  icon: JSX.Element;
  header: string;
  deatail: string;
  status: ServiceStatusType;
  color: string;
  clickable?: boolean;
  onClick?: () => void;
};

export const NONE_REQUIRED = 'none';