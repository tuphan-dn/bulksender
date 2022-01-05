import { account, DEFAULT_EMPTY_ADDRESS, utils } from '@senswap/sen-js'
import { useAccount, useWallet } from 'senhub/providers'
import useMintDecimals from './useMintDecimals'

export type AccountBalanceReturn = {
  amount: bigint
  decimals: number
  balance: number
}

const buildResult = (
  mintAddress?: string,
  amount?: bigint,
  decimals?: number,
) => {
  if (
    !account.isAddress(mintAddress) ||
    amount === undefined ||
    decimals === undefined
  )
    return { amount: BigInt(0), decimals: 0, balance: 0 }
  return {
    mintAddress,
    amount,
    decimals,
    balance: Number(utils.undecimalize(amount, decimals)),
  }
}

/**
 * Get account balance. This hook needs WalletProvider, MintProvider, and AccountProvider for work.
 * WalletProvider Ref: https://docs.sentre.io/senhub/development/providers/wallet-provider
 * MintProvider Ref: https://docs.sentre.io/senhub/development/providers/mint-provider
 * AccountProvider Ref: https://docs.sentre.io/senhub/development/providers/account-provider
 * @param mintAddress Mint address
 * @returns AccountBalanceReturn
 * - AccountBalanceReturn.amount: The amount with decimals
 * - AccountBalanceReturn.decimals: The corresponding decimals
 * - AccountBalanceReturn.balance: The human-readable balance (undecimalized amount)
 * - AccountBalanceReturn.balance: The human-readable balance (undecimalized amount)
 */
export const useAccountBalance = (accountAddress: string) => {
  const {
    wallet: { address: walletAddress, lamports },
  } = useWallet()
  const { accounts } = useAccount()
  const { amount, mint: mintAddress } = accounts[accountAddress] || {}
  const decimals = useMintDecimals(mintAddress)

  if (!account.isAddress(walletAddress) || !account.isAddress(accountAddress))
    return buildResult()
  if (accountAddress === walletAddress)
    return buildResult(DEFAULT_EMPTY_ADDRESS, lamports, 9)

  return buildResult(mintAddress, amount, decimals)
}
