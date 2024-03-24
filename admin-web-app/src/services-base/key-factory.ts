type GenKeyFn = (...keys: any) => unknown[];

const QueryKey = {
  getAllUsers: 'users',
};

export const KeyFactory: Record<string, GenKeyFn> = {
  getAllUsers: (...args) => [QueryKey.getAllUsers, ...args],
};
