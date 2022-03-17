import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import axios from 'axios'

import ReferralSuccess from './referralSuccess'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import PDB from 'shared/pdb'
import { getReferrer } from 'os/helpers/utils'
import configs from 'os/configs'
import { loadReferred } from 'os/store/flags.reducer'

const {
  stat: { baseURL: statURL },
} = configs

const SWAP_THRESHOLD = 100 // USD

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
  const dispatch = useRootDispatch<RootDispatch>()

  const confirmReferralSuccess = useCallback(
    async (params: ConfirmReferralParam) => {
      if (!account.isAddress(walletAddress)) return
      const db = new PDB(walletAddress).createInstance('sentre')
      const referred = await db.getItem('referred')
      if (referred) return
      try {
        const api = axios.create({ baseURL: statURL })
        const {
          data: { status, error },
        } = await api.post('public/api/v1/referral', params)
        if (status === 'OK') await db.setItem('referred', true)
        else throw new Error(error)
        await dispatch(loadReferred())
        return setVisible(true)
      } catch (er) {
        /* Nothing */
      }
    },
    [walletAddress, dispatch],
  )

  const watch = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return
    const db = new PDB(walletAddress).createInstance('sen_swap')
    const referrerAddress = await getReferrer(walletAddress)
    if (!account.isAddress(referrerAddress)) return
    const swapLogs: { txIds: string[]; amount: number } = (await db.getItem(
      'validated_swap_transaction',
    )) || { txIds: [], amount: 0 }
    if (!swapLogs.txIds.length || swapLogs.amount < SWAP_THRESHOLD) return
    const params: ConfirmReferralParam = {
      signatures: swapLogs.txIds,
      address: walletAddress,
      referrer: referrerAddress,
    }
    await confirmReferralSuccess(params)
  }, [confirmReferralSuccess, walletAddress])

  useEffect(() => {
    watch()
  }, [accounts, watch])

  return <ReferralSuccess visible={visible} onCancel={setVisible} />
}

export default Logger
