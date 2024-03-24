type GenKeyFn = (...keys: any) => unknown[];

const QueryKey = {
  getAllUsers: 'get-users',
  getKYCs: 'get-KYCs',
  getOrders: 'get-orders',
};

const MutationKey = {
  createUser: 'create-user',
}

export const KeyFactory = {
  getAllUsers: (...args: unknown[]) => [QueryKey.getAllUsers, ...args],
  createUser: (...args: unknown[]) => [MutationKey.createUser, ...args],
  getKYCs: (...args: unknown[]) => [QueryKey.getKYCs, ...args],
  getOrders: (...args: unknown[]) => [QueryKey.getOrders, ...args],
} as const;
