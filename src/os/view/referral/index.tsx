import { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
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
  const history = useHistory()

  const onClose = useCallback(() => {
    setVisible(false)
    history.push('/dashboard')
  }, [history])

  const setReferrerAddress = useCallback(async () => {
    if (
      !account.isAddress(walletAddress) ||
      !account.isAddress(referrerAddress)
    )
      return setVisible(false)
    const currentReferrerAddress = await getReferrer(walletAddress)
    if (account.isAddress(currentReferrerAddress)) return setVisible(false)
    const ok = await setReferrer(walletAddress, referrerAddress)
    if (!ok) return onClose()
    return setVisible(true)
  }, [walletAddress, referrerAddress, onClose])

  useEffect(() => {
    setReferrerAddress()
  }, [setReferrerAddress])

  return <ConfirmSuccessFully visible={visible} onCancel={onClose} />
}

export default Referral
