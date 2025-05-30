type GenKeyFn = (...keys: any) => unknown[];

export const QueryKeyApi = {
  getAllUsers: 'get-users',
  getKYCs: 'get-KYCs',
  searchUsers: 'search-users',
  getOrders: 'get-orders',
  searchUserByRole:'search-user-by-role'
};

const MutationKey = {
  createUser: 'create-user',
}

export const KeyFactory = {
  getAllUsers: (...args: unknown[]) => [QueryKeyApi.getAllUsers, ...args],
  createUser: (...args: unknown[]) => [MutationKey.createUser, ...args],
  getKYCs: (...args: unknown[]) => [QueryKeyApi.getKYCs, ...args],
  searchUsers: (...args: unknown[]) => [QueryKeyApi.searchUsers, ...args],
  getOrders: (...args: unknown[]) => [QueryKeyApi.getOrders, ...args],
  searchUserByRole: (...args: unknown[]) => [QueryKeyApi.searchUserByRole, ...args],
} as const;
