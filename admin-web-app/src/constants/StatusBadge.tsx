export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  CONFIRMED = 'CONFIRMED',
  ISSUED = 'ISSUED',
}

export const StatusClassNameMap: Record<string, string> = {
  [Status.PENDING]: 'bg-gray-200',
  [Status.IN_PROGRESS]: 'text-yellow-700 bg-yellow-100',
  [Status.APPROVED]: 'text-green-500 bg-green-100',
  [Status.CONFIRMED]: 'text-green-500 bg-green-100',
  [Status.ISSUED]: "text-yellow-700 bg-yellow-100',",
};
