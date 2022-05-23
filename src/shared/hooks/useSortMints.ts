import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount } from '@senhub/providers'

const useSortMints = (mints: string[]) => {
  const [sortedMints, setSortedMints] = useState<string[]>([])
  const { accounts } = useAccount()

  const mapMintAmounts = useMemo(() => {
    const mapMints: Record<string, number> = {}
    for (const account of Object.values(accounts)) {
      mapMints[account.mint] = Number(account.amount.toString())
    }
    return mapMints
  }, [accounts])

  const sortMints = useCallback(
    async (mintAddresses: string[]) => {
      const sortedMints = mintAddresses.sort((a, b) => {
        let amountA = mapMintAmounts[a]
        let amountB = mapMintAmounts[b]
        if (amountA === undefined) amountA = -1
        if (amountB === undefined) amountB = -1
        return Number(amountB) - Number(amountA)
      })
      return setSortedMints(sortedMints)
    },
    [mapMintAmounts],
  )
  useEffect(() => {
    sortMints(mints)
  }, [mints, sortMints])

  return { sortedMints, sortMints }
}

export default useSortMints
