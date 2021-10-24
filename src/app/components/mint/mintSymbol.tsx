import { useCallback, useEffect, useState } from 'react'
import { PoolData } from '@senswap/sen-js'

import { usePool, useMint } from 'senhub/providers'

const MintSymbol = ({ mintAddress }: { mintAddress: string }) => {
  const [symbol, setSymbol] = useState('')
  const { pools } = usePool() as { pools: Map<string, PoolData> }
  const { tokenProvider } = useMint()

  const getSymbol = useCallback(async () => {
    const { symbol } = (await tokenProvider.findByAddress(mintAddress)) || {}
    // Normal mint
    if (symbol) return setSymbol(symbol)
    // LP mint
    const poolData = Object.values(pools).find(
      ({ mint_lpt }) => mint_lpt === mintAddress,
    )
    if (poolData) {
      const { mint_a, mint_b } = poolData
      const { symbol: symbolA } =
        (await tokenProvider.findByAddress(mint_a)) || {}
      const { symbol: symbolB } =
        (await tokenProvider.findByAddress(mint_b)) || {}
      return setSymbol(`${symbolA} • ${symbolB}`)
    }
    // Unknown mint
    return setSymbol('TOKEN')
  }, [tokenProvider, mintAddress, pools])

  useEffect(() => {
    getSymbol()
  }, [getSymbol])

  return <span>{symbol}</span>
}

export default MintSymbol
