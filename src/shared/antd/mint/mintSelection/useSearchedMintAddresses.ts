import { useCallback, useEffect, useState } from 'react'

import { useMint } from '@senhub/providers'
import { useAllMintAddresses } from './useAllMintAddresses'

let searching: NodeJS.Timeout

export const useSearchedMintAddresses = (keyword: string = '') => {
  const [loading, setLoading] = useState(false)
  const [searchedMints, setSearchedMints] = useState<string[]>([])
  const { tokenProvider } = useMint()
  const mints = useAllMintAddresses()

  const getRecommendedMintAddresses = useCallback(async () => {
    if (!keyword) {
      setLoading(false)
      return setSearchedMints(mints)
    }
    if (searching) clearTimeout(searching)
    setLoading(true)
    searching = setTimeout(async () => {
      const addresses = (await tokenProvider.find(keyword)).map(
        ({ address }) => address,
      )
      setLoading(false)
      return setSearchedMints(addresses)
    }, 500)
  }, [keyword, mints, tokenProvider])

  useEffect(() => {
    getRecommendedMintAddresses()
  }, [getRecommendedMintAddresses])

  return { searchedMintAddresses: searchedMints, loading }
}
