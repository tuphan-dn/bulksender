import { account } from '@senswap/sen-js'
import numbro from 'numbro'
import { net } from 'shared/runtime'

export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const shortenAddress = (address: string, num = 4, delimiter = '...') => {
  return (
    address.substring(0, num) +
    delimiter +
    address.substring(address.length - num, address.length)
  )
}

export const explorer = (addressOrTxId: string): string => {
  if (account.isAddress(addressOrTxId)) {
    return `https://explorer.solana.com/address/${addressOrTxId}?cluster=${net}`
  }
  return `https://explorer.solana.com/tx/${addressOrTxId}?cluster=${net}`
}

export const numeric = (
  value?: number | string | BigInt,
): ReturnType<typeof numbro> => {
  if (!value) return numbro('0')
  return numbro(value)
}
