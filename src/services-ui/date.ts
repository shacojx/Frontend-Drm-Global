export function generateFormatDate(date: Date) {
  return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}
