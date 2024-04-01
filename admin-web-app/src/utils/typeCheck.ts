/**
 * use at the end of switch case
 * @param param
 */
export function exhaustiveCheck(param: never) {
  throw new Error(`Exhaustive check fail: ${typeof param}`)
}

/**
 * check and verify type, can be used with array.filter
 * @param value
 */
export function isNotNullish<T>(value: T | undefined | null): value is T {
  return value !== null && value !== undefined
}
