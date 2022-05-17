import { useCallback, useEffect, useMemo, useState } from 'react'
import { account } from '@senswap/sen-js'
import { useAccount } from '@senhub/providers'

import { useAllMintAddresses } from './useAllMintAddresses'

const EMPTY_MINT_ADDRESS = ''

export const useRecommendedMintAddresses = () => {
  const [recommendedMintAddresses, setRecommendedMintAddresses] = useState<
    string[]
  >([])
  const { accounts } = useAccount()
  const allMintAddresses = useAllMintAddresses()

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
    return setRecommendedMintAddresses(addresses)
  }, [myMintAddresses, allMintAddresses])

  useEffect(() => {
    getRecommendedMintAddresses()
  }, [getRecommendedMintAddresses])

  return recommendedMintAddresses
}
