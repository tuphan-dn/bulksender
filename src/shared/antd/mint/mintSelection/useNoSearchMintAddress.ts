import { useCallback, useEffect, useState } from 'react'

import useSortMintByBalance from 'shared/hooks/useSortMintByBalance'
import { useAllMintAddresses } from './useAllMintAddresses'

export const useNoSearchMintAddresses = () => {
  const [sortedNoSearchAddress, setSortedNoSearchAddress] = useState<string[]>(
    [],
  )
  const allMintAddresses = useAllMintAddresses()
  const sortMintsByBalances = useSortMintByBalance()

  const sortAddress = useCallback(async () => {
    const sortedAddress = await sortMintsByBalances(allMintAddresses)
    setSortedNoSearchAddress(sortedAddress)
  }, [allMintAddresses, sortMintsByBalances])

  useEffect(() => {
    sortAddress()
  }, [sortAddress])

  return sortedNoSearchAddress
}
