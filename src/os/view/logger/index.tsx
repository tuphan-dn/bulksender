import { Fragment, useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { useRootSelector, RootState } from 'os/store'
import configs from 'os/configs'
import PDB from 'shared/pdb'

const {
  sol: { sntrAddress },
} = configs

const THRESHOLD = BigInt(1000 * 10 ** 9)

const Logger = () => {
  const {
    accounts,
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [accountAddress, setAccountAddress] = useState('')

  const getAccountAddress = useCallback(async () => {
    const {
      sentre: { splt },
    } = window
    if (!account.isAddress(walletAddress)) return
    const accountAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      sntrAddress,
    )
    if (account.isAddress(accountAddress))
      return setAccountAddress(accountAddress)
  }, [walletAddress])

  const watch = useCallback(async () => {
    if (!account.isAddress(walletAddress) || !account.isAddress(accountAddress))
      return
    const { amount } = accounts[accountAddress] || {}
    if (amount === undefined) return
    const db = new PDB(walletAddress).createInstance('sentre')
    const prevLogs: { date: number; amount: string } = (await db.getItem(
      'logs',
    )) || { date: 0, amount: '0' }
    const prevAmount = BigInt(prevLogs.amount)
    if (amount < THRESHOLD) return db.removeItem('logs')
    if (prevAmount < THRESHOLD) {
      return db.setItem('logs', {
        date: Number(new Date()),
        amount: String(amount),
      })
    }
  }, [accountAddress, accounts, walletAddress])

  useEffect(() => {
    getAccountAddress()
  }, [getAccountAddress])

  useEffect(() => {
    watch()
  }, [watch])

  return <Fragment />
}

export default Logger
