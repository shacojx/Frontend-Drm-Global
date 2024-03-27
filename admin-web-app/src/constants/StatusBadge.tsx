import { IconCheck, IconInfoCircle, IconRefreshCircle } from "../components/icons";

export enum Status {
  PENDING = 'Pending',
  IN_PROGRESS = 'In-Progress',
  ISSUED = 'Issued',
  READY = 'Ready',
  CONFIRMED = 'Confirmed',
  APPROVED = 'Approved',
}

export const StatusBackgroundClassNameMap: Record<string, string> = {
  [Status.PENDING]: 'bg-pending_bg',
  [Status.READY]: 'bg-in_progress_bg',
  [Status.IN_PROGRESS]: 'bg-in_progress_bg',
  [Status.APPROVED]: 'bg-green-100',
  [Status.CONFIRMED]: 'bg-green-100',
  [Status.ISSUED]: "bg-green-100",
};

export const StatusTextClassNameMap: Record<string, string> = {
  [Status.PENDING]: 'text-pending_text',
  [Status.READY]: '',
  [Status.IN_PROGRESS]: '',
  [Status.APPROVED]: 'text-green-500',
  [Status.CONFIRMED]: 'text-green-500',
  [Status.ISSUED]: 'text-green-700',
};

export const StatusDotClassNameMap: Record<string, string> = {
  [Status.PENDING]: 'bg-pending_text',
  [Status.READY]: 'bg-pending_text',
  [Status.IN_PROGRESS]: 'bg-pending_text',
  [Status.APPROVED]: 'bg-green-400',
  [Status.CONFIRMED]: 'bg-green-400',
  [Status.ISSUED]: "bg-green-400",
};

export const StatusIconMap: Record<string, React.ReactNode> = {
  [Status.PENDING]: <IconInfoCircle width={20} height={20}/>,
  [Status.READY]: <IconRefreshCircle width={20} height={20}/>,
  [Status.IN_PROGRESS]: <IconRefreshCircle width={20} height={20}/>,
  [Status.APPROVED]: <IconCheck width={20} height={20}/>,
  [Status.CONFIRMED]: <IconCheck width={20} height={20}/>,
  [Status.ISSUED]: <IconCheck width={20} height={20}/>,
};