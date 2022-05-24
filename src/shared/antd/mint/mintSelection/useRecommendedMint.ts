import { useCallback, useEffect, useState } from 'react'
import { useWallet } from '@senhub/providers'

import { useAllMintAddresses } from './useAllMintAddresses'
import { useSortMints } from 'shared/hooks/useSortMints'
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
  const allMintAddresses = useAllMintAddresses()
  const { sortedMints } = useSortMints(allMintAddresses)

  const getRecommendedMints = useCallback(async () => {
    let mints: string[] = []
    const pdb = createPDB(address, appId)
    if (pdb) mints = (await pdb.getItem(PDB_ID)) || []

    for (const mint of sortedMints) {
      if (mints.length >= LIMIT_ITEM) break
      if (mints.includes(mint)) continue
      mints.push(mint)
    }
    return setRecommendedMints(mints.slice(0, LIMIT_ITEM))
  }, [address, sortedMints])

  const addRecommendMint = useCallback(
    async (mintAddress: string) => {
      const mints = recommendedMints.filter((mint) => mint !== mintAddress)
      const newMints = [mintAddress, ...mints].slice(0, LIMIT_ITEM)
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
    addRecommendMint,
  }
}
