import { useCallback, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { RootState, useRootSelector } from 'os/store'
import PDB from 'shared/pdb'

const Referral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const { referrer } = useParams<{ referrer: string | undefined }>()

  const setReferrerAddress = useCallback(async () => {
    if (
      !account.isAddress(walletAddress) ||
      !account.isAddress(referrer) ||
      walletAddress === referrer
    )
      return
    const db = new PDB(walletAddress).createInstance('sentre')
    const currentReferrer: string | null = await db.getItem('referrerAddress')
    if (currentReferrer && account.isAddress(currentReferrer)) return
    await db.setItem('referrerAddress', referrer)
  }, [walletAddress, referrer])

  useEffect(() => {
    setReferrerAddress()
  }, [setReferrerAddress])

  return <Redirect to="/welcome" />
}

export default Referral
