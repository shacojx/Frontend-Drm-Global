type GenKeyFn = (...keys: any) => unknown[];

const QueryKey = {
  getAllUsers: 'get-users',
  getKYCs: 'get-KYCs',
  searchUsers: 'search-users',
};

const MutationKey = {
  createUser: 'create-user',
}

export const KeyFactory = {
  getAllUsers: (...args: unknown[]) => [QueryKey.getAllUsers, ...args],
  createUser: (...args: unknown[]) => [MutationKey.createUser, ...args],
  getKYCs: (...args: unknown[]) => [QueryKey.getKYCs, ...args],
  searchUsers: (...args: unknown[]) => [QueryKey.searchUsers, ...args],
} as const;
