import { Fragment, useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import moment from 'moment'

import { useRootSelector, RootState } from 'os/store'
import configs from 'os/configs'
import PDB from 'shared/pdb'

const {
  sol: { sntrAddress },
} = configs

const SentreLogger = () => {
  const {
    accounts,
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [accountAddress, setAccountAddress] = useState('')

  const getAccountAddress = useCallback(async () => {
    if (!walletAddress) return
    const {
      sentre: { splt },
    } = window
    const accountAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      sntrAddress,
    )
    if (account.isAddress(accountAddress))
      return setAccountAddress(accountAddress)
  }, [walletAddress])

  const onLogAmountSntr = useCallback(() => {
    const { amount } = accounts[accountAddress] || {}
    if (!walletAddress || !amount) return
    const db = new PDB(walletAddress).createInstance('sentre_logger')
    const date = moment().format('MM_DD_YYYY')

    return db.setItem(date, amount)
  }, [accountAddress, accounts, walletAddress])

  useEffect(() => {
    getAccountAddress()
  }, [getAccountAddress])

  useEffect(() => {
    onLogAmountSntr()
  }, [onLogAmountSntr])

  return <Fragment />
}

export default SentreLogger
