import { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import ConfirmSuccessFully from 'os/view/actionCenter/referral/confirmSuccess'

import { RootState, useRootSelector } from 'os/store'
import { setReferrer, getReferrer } from 'os/helpers/utils'

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
    const currentReferrerAddress = await getReferrer(walletAddress)
    if (account.isAddress(currentReferrerAddress)) return setVisible(false)
    try {
      await setReferrer(walletAddress, referrerAddress)
      return setVisible(true)
    } catch (er) {
      return onClose()
    }
  }, [walletAddress, referrerAddress, onClose])

  useEffect(() => {
    setReferrerAddress()
  }, [setReferrerAddress])

  return <ConfirmSuccessFully visible={visible} onCancel={onClose} />
}

export default Referral
