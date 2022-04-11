import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount } from '@senhub/providers'

import { useAllMintAddresses } from './useAllMintAddresses'

export const useRecommendedMintAddresses = () => {
  const [recommendedMintAddresses, setRecommendedMintAddresses] = useState<
    string[]
  >([])
  const { accounts } = useAccount()
  const allMintAddresses = useAllMintAddresses()

  const myMintAddresses = useMemo(() => {
    return Object.values(accounts)
      .map(({ mint }) => mint)
      .filter((mintAddress, index, self) => self.indexOf(mintAddress) === index)
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
