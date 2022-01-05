import { account, utils } from '@senswap/sen-js'
import { useCallback, useEffect, useState } from 'react'
import { useAccount, useWallet } from 'senhub/providers'
import useMintDecimals from './useMintDecimals'

const buildResult = (amount?: bigint, decimals?: number) => {
  if (amount === undefined || decimals === undefined)
    return { amount: BigInt(0), decimals: 0, balance: 0 }
  return {
    amount,
    decimals,
    balance: Number(utils.undecimalize(amount, decimals)),
  }
}

/**
 * Get account balance by mint. This hook needs WalletProvider, MintProvider, and AccountProvider for work.
 * WalletProvider Ref: https://docs.sentre.io/senhub/development/providers/wallet-provider
 * MintProvider Ref: https://docs.sentre.io/senhub/development/providers/mint-provider
 * AccountProvider Ref: https://docs.sentre.io/senhub/development/providers/account-provider
 * @param mintAddress Mint address
 * @returns Decimals
 */
const useAccountBalance = (mintAddress: string) => {
  const [accountAddress, setAccountAddress] = useState('')
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { accounts } = useAccount()
  const decimals = useMintDecimals(mintAddress)
  const { amount } = accounts[accountAddress]

  if (!account.isAddress(walletAddress) || !account.isAddress(mintAddress))
    return buildResult()

  const getAccountAddress = useCallback(async () => {
    const {
      sentre: { splt },
    } = window
    const address = await splt.deriveAssociatedAddress(
      walletAddress,
      mintAddress,
    )
    if (!account.isAddress(address)) return setAccountAddress('')
    return setAccountAddress(address)
  }, [walletAddress, mintAddress])

  useEffect(() => {
    getAccountAddress()
  }, [getAccountAddress])

  return buildResult(amount, decimals)
}

export default useAccountBalance
