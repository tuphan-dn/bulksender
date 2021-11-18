import { useCallback, useEffect, useState } from 'react'

import { usePool, useMint } from 'senhub/providers'

const MintName = ({ mintAddress }: { mintAddress: string }) => {
  const [name, setName] = useState('')
  const { pools } = usePool()
  const { tokenProvider } = useMint()

  const getName = useCallback(async () => {
    const { name } = (await tokenProvider.findByAddress(mintAddress)) || {}
    // Normal mint
    if (name) return setName(name)
    // LP mint
    const poolData = Object.values(pools).find(
      ({ mint_lpt }) => mint_lpt === mintAddress,
    )
    if (poolData) {
      const { mint_a, mint_b } = poolData
      const { symbol: symbol_a } =
        (await tokenProvider.findByAddress(mint_a)) || {}
      const { symbol: symbol_b } =
        (await tokenProvider.findByAddress(mint_b)) || {}
      return setName(`${symbol_a} • ${symbol_b} LPT`)
    }
    // Unknown mint
    const shortenName = mintAddress.substring(0, 6)
    return setName(shortenName)
  }, [tokenProvider, mintAddress, pools])

  useEffect(() => {
    getName()
  }, [getName])

  return <span>{name}</span>
}

export default MintName
