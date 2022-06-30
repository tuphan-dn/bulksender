export const toBigInt = (number: string): bigint => {
  try {
    return BigInt(number)
  } catch (er) {
    return BigInt(0)
  }
}
