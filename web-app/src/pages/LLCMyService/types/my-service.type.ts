
export enum ServiceStatusType {
  Pending = 'Pending',
  InProgress = 'In-Progress',
  Issued = 'Issued',
  Confirmed = 'Confirmed',
  Approved = 'Approved',
  Yes = 'Yes',
}

export type TabType = {
  id: number;
  icon: JSX.Element;
  header: string;
  detail: string;
  status: ServiceStatusType;
  color: string;
  clickable?: boolean;
  onClick?: () => void;
};

export const NONE_REQUIRED = 'none';