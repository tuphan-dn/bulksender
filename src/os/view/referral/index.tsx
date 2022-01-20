import { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { RootState, useRootSelector } from 'os/store'
import PDB from 'shared/pdb'

const Referral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const { referrer } = useParams<{ referrer: string | undefined }>()

  useEffect(() => {
    if (!account.isAddress(walletAddress) || !account.isAddress(referrer))
      return
    const db = new PDB(walletAddress).createInstance('sentre')
    db.setItem('referrerAddress', referrer)
  }, [walletAddress, referrer])

  return <Redirect to="/welcome" />
}

export default Referral
