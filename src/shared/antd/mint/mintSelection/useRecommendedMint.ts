import { useCallback, useEffect, useState } from 'react'
import { useMint, useWallet } from '@senhub/providers'

import { useAllMintAddresses } from './useAllMintAddresses'
import useSortMints from 'shared/hooks/useSortMints'
import { net } from 'shared/runtime'
import { createPDB } from 'shared/pdb'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const LIMIT_ITEM = 8
const PDB_ID = `${net}:selected_mints`

export const useRecommendedMint = () => {
  const [recommendedMints, setRecommendedMints] = useState<string[]>([])
  const {
    wallet: { address },
  } = useWallet()
  const { tokenProvider } = useMint()
  const allMintAddresses = useAllMintAddresses()
  const { sortedMints } = useSortMints(allMintAddresses)

  const getRecommendedMints = useCallback(async () => {
    const pdb = createPDB(address, appId)
    let selected_mints: string[] = []
    if (pdb) selected_mints = (await pdb.getItem(PDB_ID)) || []
    for (const mint of sortedMints) {
      if (selected_mints.includes(mint)) continue
      if (selected_mints.length >= LIMIT_ITEM) break
      const mintInfo = await tokenProvider.findByAddress(mint)
      if (!mintInfo) continue
      selected_mints.push(mint)
    }
    return setRecommendedMints(selected_mints)
  }, [address, sortedMints, tokenProvider])

  const selectMint = useCallback(
    async (mintAddress: string) => {
      const mints = recommendedMints.filter((mint) => mint !== mintAddress)
      const newMints = [mintAddress, ...mints]
      const pdb = createPDB(address, appId)
      if (pdb) await pdb.setItem(PDB_ID, newMints)
      return setRecommendedMints(newMints)
    },
    [address, recommendedMints],
  )

  useEffect(() => {
    getRecommendedMints()
  }, [getRecommendedMints])

  return {
    recommendedMints,
    selectMint,
  }
}
