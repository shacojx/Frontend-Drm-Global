
export enum ServiceType {
  Pending = 1,
  InProgress = 2,
  Issued = 3,
}

export type TabType = {
  id: number;
  icon: JSX.Element;
  header: string;
  deatail: string;
  status: ServiceType;
  color: string;
  clickable?: boolean;
  onClick?: () => void;
};
