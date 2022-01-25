import { account } from '@senswap/sen-js'
import PDB from 'shared/pdb'

export const getReferrer = async (walletAddress?: string) => {
  if (!account.isAddress(walletAddress)) return undefined
  const db = new PDB(walletAddress).createInstance('sentre')
  const referrer: string | null = await db.getItem('referrerAddress')
  if (referrer && account.isAddress(referrer)) return referrer
  return undefined
}

export const setReferrer = async (
  walletAddress?: string,
  referrerAddress?: string,
) => {
  if (!account.isAddress(walletAddress))
    throw new Error('Wallet is not connected')
  if (!account.isAddress(referrerAddress))
    throw new Error('Invalid referrer address')
  if (walletAddress === referrerAddress)
    throw new Error('Cannot invite yourself')
  const db = new PDB(walletAddress).createInstance('sentre')
  const currentReferrer = await getReferrer(walletAddress)
  if (account.isAddress(currentReferrer))
    throw new Error('Cannot change the referrer address')
  await db.setItem('referrerAddress', referrerAddress)
}

/**
 * Randomly choose an element in an array
 * @param arr
 * @returns
 */
export function randChoose<T>(arr: T[]): T {
  const rand = Math.floor(Math.random() * arr.length)
  return arr[rand]
}
