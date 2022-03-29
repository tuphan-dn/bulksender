/**
 * Randomly choose an element in an array
 * @param arr
 * @returns
 */
export function randChoose<T>(arr: T[]): T {
  const rand = Math.floor(Math.random() * arr.length)
  return arr[rand]
}
