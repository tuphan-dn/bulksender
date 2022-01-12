import { useEffect, useCallback } from 'react'
import { account } from '@senswap/sen-js'

import {
  useRootDispatch,
  useRootSelector,
  RootDispatch,
  RootState,
} from 'os/store'
import { updateWallet } from 'os/store/wallet.reducer'

// Watch id
let watchId: any = null

const WalletWatcher = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const { address } = useRootSelector((state: RootState) => state.wallet)

  const watchData = useCallback(async () => {
    if (!account.isAddress(address)) {
      try {
        await window.sentre.lamports.unwatch(watchId)
      } catch (er) {
        /* Nothing */
      }
      watchId = null
    } else {
      if (watchId) return console.warn('Already watched')
      watchId = window.sentre.lamports.watch(
        address,
        (er: string | null, re: number | null) => {
          if (er) return console.warn(er)
          return dispatch(updateWallet({ lamports: BigInt(re || 0) }))
        },
      )
    }
  }, [dispatch, address])

  useEffect(() => {
    watchData()
  }, [watchData])

  return null
}

export default WalletWatcher
