import { useCallback, useMemo, useState } from 'react'

import { useAllMintAddresses } from './useAllMintAddresses'
import { randElements } from 'shared/util'

export const useRandomMintAddresses = (limit: number = 0) => {
  const [shuffle, setShuffle] = useState(0)
  const allMintAddresses = useAllMintAddresses()

  // A random limited list of tokens is to secure component performance
  const randomHundredAddresses = useMemo(() => {
    return randElements(allMintAddresses, limit + (shuffle - shuffle))
  }, [allMintAddresses, shuffle, limit])

  const refresh = useCallback(() => {
    return setShuffle(shuffle + 1)
  }, [shuffle])

  return { randomHundredAddresses, refresh }
}
