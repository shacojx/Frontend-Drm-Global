type GenKeyFn = (...keys: any) => unknown[];

const QueryKey = {
  getAllUsers: 'users',
};

const MutationKey = {
  createUser: 'create-user',
}

export const KeyFactory: Record<string, GenKeyFn> = {
  getAllUsers: (...args) => [QueryKey.getAllUsers, ...args],
  createUser: (...args) => [MutationKey.createUser, ...args],
} as const;
