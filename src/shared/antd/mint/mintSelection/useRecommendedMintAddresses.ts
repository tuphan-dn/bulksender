import { useCallback, useEffect, useMemo, useState } from 'react'

import { account } from '@senswap/sen-js'
import { useAccount, useWallet } from '@senhub/providers'
import { useAllMintAddresses } from './useAllMintAddresses'
import { createPDB } from 'shared/pdb'
import configs from 'app/configs'
import useSortMintByBalance from 'shared/hooks/useSortMintByBalance'

const {
  manifest: { appId },
} = configs

const EMPTY_MINT_ADDRESS = ''

export const useRecommendedMintAddresses = () => {
  const [recommendedMintAddresses, setRecommendedMintAddresses] = useState<
    string[]
  >([])
  const {
    wallet: { address },
  } = useWallet()
  const { accounts } = useAccount()
  const allMintAddresses = useAllMintAddresses()
  const sortMintsByBalances = useSortMintByBalance()

  const myMintAddresses = useMemo(() => {
    return Object.values(accounts)
      .map(({ mint, amount }) => {
        if (amount > BigInt(0)) return mint
        return EMPTY_MINT_ADDRESS
      })
      .filter(
        (mintAddress, index, self) =>
          account.isAddress(mintAddress) && self.indexOf(mintAddress) === index,
      )
  }, [accounts])

  const getRecommendedMintAddresses = useCallback(async () => {
    const addresses = myMintAddresses.filter((mintAddress) =>
      allMintAddresses.includes(mintAddress),
    )

    const defaultMint = (await sortMintsByBalances(addresses)).slice(0, 5)

    const pdb = createPDB(address, appId)
    if (pdb) {
      const cachedMints: string[] =
        (await pdb.getItem('recommended_token')) || []
      if (cachedMints.length === 0) {
        await pdb.setItem('recommended_token', defaultMint)
        return setRecommendedMintAddresses(defaultMint)
      }

      return setRecommendedMintAddresses(cachedMints)
    }
    return setRecommendedMintAddresses(defaultMint)
  }, [address, allMintAddresses, myMintAddresses, sortMintsByBalances])

  useEffect(() => {
    getRecommendedMintAddresses()
  }, [getRecommendedMintAddresses])

  return { recommendedMintAddresses, setRecommendedMintAddresses }
}
