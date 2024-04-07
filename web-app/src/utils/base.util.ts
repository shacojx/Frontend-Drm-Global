export const uniqBy = <T>(arr: T[], iteratee: (item: T) => unknown) => {
  if (typeof iteratee === 'string') {
    const prop = iteratee
    iteratee = (item: T) => item[prop]
  }

  return arr.filter(
    (x, i, self) => i === self.findIndex(y => iteratee(x) === iteratee(y))
  )
}