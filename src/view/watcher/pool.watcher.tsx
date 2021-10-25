import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { RootDispatch, RootState } from 'store'
import { getPools, upsetPool } from 'store/pools.reducer'
import configs from 'configs'

const {
  sol: { taxmanAddress },
} = configs

// Watch id
let watchId = 0

const PoolWatcher = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { address: walletAddress } = useSelector(
    (state: RootState) => state.wallet,
  )

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getPools()).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of pools',
      })
    }
  }, [dispatch, walletAddress])
  // Watch account changes
  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')
    const { swap } = window.senos || {}
    const filters = [{ memcmp: { bytes: taxmanAddress, offset: 65 } }]
    watchId = swap?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetPool({ address, data }))
    }, filters)
  }, [dispatch])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await window.senos.swap.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default PoolWatcher