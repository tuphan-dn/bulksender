import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import axios from 'axios'

import { useRootSelector, RootState } from 'os/store'
import PDB from 'shared/pdb'
import { getReferrer } from 'os/helpers/utils'

import configs from 'os/configs'
import ReferralSuccessFully from '../actionCenter/referral/referralSuccess'

const {
  stat: { baseURL: statURL },
} = configs
const api = axios.create({
  baseURL: statURL,
  timeout: 60000,
})
export enum EndPoint {
  endpointReferral = 'public/api/v1/referral',
}
export const SWAP_SUCCESS_RANGE = 100

type ConfirmReferralParam = {
  signatures: string[]
  address: string
  referrer: string
}

const Logger = () => {
  const {
    wallet: { address: walletAddress },
    accounts,
  } = useRootSelector((state: RootState) => state)
  const [visible, setVisible] = useState(false)

  const confirmReferralSuccess = useCallback(
    async (data: ConfirmReferralParam) => {
      try {
        const db = new PDB(walletAddress).createInstance('sentre')
        const validConfirmReferrer = await db.getItem(data.referrer)
        if (validConfirmReferrer) return
        const res = await api.post(EndPoint.endpointReferral, data)
        await db.setItem(res.data.referrer, res)
        setVisible(true)
      } catch (er) {
        console.log(er)
      }
    },
    [walletAddress],
  )

  const watch = useCallback(async () => {
    if (!account.isAddress(walletAddress) || !accounts) return
    const db = new PDB(walletAddress).createInstance('sen_swap')
    const referrerAddress = await getReferrer(walletAddress)
    if (!account.isAddress(referrerAddress)) return
    const swapLogs: { txId: string[]; amount: number } = (await db.getItem(
      'validate_swap',
    )) || { txId: [], amount: 0 }
    if (!swapLogs.txId.length && swapLogs.amount < SWAP_SUCCESS_RANGE) return
    const params = {
      signatures: swapLogs.txId,
      address: walletAddress,
      referrer: referrerAddress,
    }
    await confirmReferralSuccess(params)
  }, [accounts, confirmReferralSuccess, walletAddress])

  useEffect(() => {
    watch()
  }, [watch])

  return <ReferralSuccessFully visible={visible} onCancel={setVisible} />
}

export default Logger
