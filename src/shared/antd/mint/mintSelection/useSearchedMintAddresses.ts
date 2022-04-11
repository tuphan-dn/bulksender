import { useCallback, useEffect, useState } from 'react'
import { useMint } from '@senhub/providers'

let searching: NodeJS.Timeout

export const useSearchedMintAddresses = (keyword: string = '') => {
  const [loading, setLoading] = useState(false)
  const [searchedMintAddresses, setSearchedMintAddresses] = useState<
    string[] | undefined
  >()
  const { tokenProvider } = useMint()

  const getRecommendedMintAddresses = useCallback(async () => {
    if (!keyword) {
      setLoading(false)
      return setSearchedMintAddresses(undefined)
    }
    if (searching) clearTimeout(searching)
    setLoading(true)
    searching = setTimeout(async () => {
      const addresses = (await tokenProvider.find(keyword)).map(
        ({ address }) => address,
      )
      setLoading(false)
      return setSearchedMintAddresses(addresses)
    }, 500)
  }, [keyword, tokenProvider])

  useEffect(() => {
    getRecommendedMintAddresses()
  }, [getRecommendedMintAddresses])

  return { searchedMintAddresses, loading }
}
