import { Fragment, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { useRootSelector, RootState } from 'os/store'
import configs from 'os/configs'

const {
  sol: { sntrAddress },
} = configs

const Logger = () => {
  const {
    accounts,
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [accountAddress, setAccountAddress] = useState('')

  useEffect(() => {
    ;(async () => {
      const {
        sentre: { splt },
      } = window
      const accountAddress = await splt.deriveAssociatedAddress(
        walletAddress,
        sntrAddress,
      )
      if (account.isAddress(accountAddress))
        return setAccountAddress(accountAddress)
    })()
  }, [])

  const { amount } = accounts[accountAddress] || {}

  return <Fragment />
}

export default Logger
