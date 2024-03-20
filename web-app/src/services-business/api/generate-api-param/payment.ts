export function generateTransactionId(email: string) {
  return `${email}_${new Date().valueOf()}`
}
