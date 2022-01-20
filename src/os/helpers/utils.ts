import { account } from '@senswap/sen-js'
import PDB from 'shared/pdb'

export const getReferrer = async (walletAddress: string) => {
  if (!account.isAddress(walletAddress)) return
  const db = new PDB(walletAddress).createInstance('sentre')
  const referrer: string | null = await db.getItem('referrerAddress')
  if (referrer && account.isAddress(referrer)) return referrer
  return undefined
}

export const setReferrer = async (
  walletAddress: string,
  referrerAddress: string,
) => {
  if (
    !account.isAddress(walletAddress) ||
    !account.isAddress(referrerAddress) ||
    walletAddress === referrerAddress
  )
    return false
  const db = new PDB(walletAddress).createInstance('sentre')
  const currentReferrer = await getReferrer(walletAddress)
  if (account.isAddress(currentReferrer)) return false
  await db.setItem('referrerAddress', referrerAddress)
  return true
}
