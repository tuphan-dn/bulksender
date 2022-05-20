import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useWallet } from '@senhub/providers'

import { useAllMintAddresses } from './useAllMintAddresses'
import useSortMintByBalance from 'shared/hooks/useSortMintByBalance'
import { net } from 'shared/runtime'
import { createPDB } from 'shared/pdb'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs
const LIMIT = 7

export const useRecommendedMintAddresses = () => {
  const [recommendedMintAddresses, setRecommendedMintAddresses] = useState<
    string[]
  >([])
  const {
    wallet: { address },
  } = useWallet()
  const { accounts } = useAccount()
  const allMintAddresses = useAllMintAddresses()
  const sortMintsByBalances = useSortMintByBalance()

  const myMintAddresses = useMemo(() => {
    const keyAccount = Object.values(accounts)
    const mintAddresses: string[] = []
    for (let i = 1; i < keyAccount.length; i++) {
      if (
        Number(keyAccount[i].amount.toString()) &&
        !mintAddresses.includes(keyAccount[i].mint)
      ) {
        mintAddresses.push(keyAccount[i].mint)
      }
    }
    return mintAddresses
  }, [accounts])

  const getRecommendedMintAddresses = useCallback(async () => {
    const addresses = myMintAddresses.filter((mintAddress) =>
      allMintAddresses.includes(mintAddress),
    )

    const defaultMint = (await sortMintsByBalances(addresses)).slice(LIMIT)

    const pdb = createPDB(address, appId)
    if (pdb) {
      const cachedMints: string[] =
        (await pdb.getItem(`${net}:recommended_token`)) || []
      if (cachedMints.length === 0) {
        await pdb.setItem(`${net}:recommended_token`, defaultMint)
        return setRecommendedMintAddresses(defaultMint)
      }

      return setRecommendedMintAddresses(cachedMints)
    }
    return setRecommendedMintAddresses(defaultMint)
  }, [address, allMintAddresses, myMintAddresses, sortMintsByBalances])

  useEffect(() => {
    getRecommendedMintAddresses()
  }, [getRecommendedMintAddresses])

  return { recommendedMintAddresses, setRecommendedMintAddresses }
}
