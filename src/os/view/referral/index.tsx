import { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { RootState, useRootSelector } from 'os/store'
import { setReferrer, getReferrer } from 'os/helpers/utils'
import ConfirmSuccessFully from '../actionCenter/referral/confirmSuccess'

const Referral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [visible, setVisible] = useState(false)
  const { referrer: referrerAddress } =
    useParams<{ referrer: string | undefined }>()

  const setAddress = useCallback(async () => {
    if (
      !account.isAddress(walletAddress) ||
      !account.isAddress(referrerAddress)
    )
      return
    const dbReferralAddress = await getReferrer(walletAddress)
    if (!account.isAddress(dbReferralAddress)) {
      await setReferrer(walletAddress, referrerAddress)
      return setVisible(true)
    }
  }, [walletAddress, referrerAddress])

  useEffect(() => {
    setAddress()
  }, [setAddress])

  if (visible)
    return <ConfirmSuccessFully visible={visible} onCancel={setVisible} />
  return <Fragment />
}

export default Referral
