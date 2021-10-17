import { account } from '@senswap/sen-js'
import configs from 'configs'

const { net } = configs

export const isTouchable = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const openNewTab = (href: string) => {
  return window.open(href, '_blank')
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
