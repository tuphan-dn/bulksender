import { useCallback, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { RootState, useRootSelector } from 'os/store'
import { setReferrer } from 'os/helpers/utils'

const Referral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const { referrer: referrerAddress } =
    useParams<{ referrer: string | undefined }>()

  const setAddress = useCallback(async () => {
    if (
      !account.isAddress(walletAddress) ||
      !account.isAddress(referrerAddress)
    )
      return
    await setReferrer(walletAddress, referrerAddress)
  }, [walletAddress, referrerAddress])

  useEffect(() => {
    setAddress()
  }, [setAddress])

  return <Redirect to="/welcome" />
}

export default Referral
