export enum Status {
  PENDING = 'Pending',
  IN_PROGRESS = 'In-Progress',
  APPROVED = 'APPROVED',
  CONFIRMED = 'CONFIRMED',
  ISSUED = 'Issued',
}

export const StatusBackgroundClassNameMap: Record<string, string> = {
  [Status.PENDING]: 'bg-gray-200',
  [Status.IN_PROGRESS]: 'bg-yellow-100',
  [Status.APPROVED]: 'bg-green-100',
  [Status.CONFIRMED]: 'bg-green-100',
  [Status.ISSUED]: "bg-yellow-100',",
};

export const StatusTextClassNameMap: Record<string, string> = {
  [Status.PENDING]: '',
  [Status.IN_PROGRESS]: 'text-yellow-700',
  [Status.APPROVED]: 'text-green-500',
  [Status.CONFIRMED]: 'text-green-500',
  [Status.ISSUED]: 'text-yellow-700',
};

export const StatusDotClassNameMap: Record<string, string> = {
  [Status.PENDING]: 'bg-gray-400',
  [Status.IN_PROGRESS]: 'bg-yellow-400',
  [Status.APPROVED]: 'bg-green-400',
  [Status.CONFIRMED]: 'bg-green-400',
  [Status.ISSUED]: "bg-yellow-400',",
};
