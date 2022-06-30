import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, AccountData, utils } from '@senswap/sen-js'
import { useAccount, useWallet } from '@sentre/senhub'

import { Row, Col, Typography, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Estimate from './estimate'
import Merge from './merge'
import Send from './send'

import { AppState } from 'model'
import { Status, TransferData } from 'model/main.controller'
import { toBigInt } from 'lib/utils'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const TX_FEE = 0.015

const Actions = () => {
  const [error, setError] = useState<boolean | string>(false)
  const [bulk, setBulk] = useState<Array<TransferData>>([])
  const data = useSelector((state: AppState) => state.main.data)
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)
  const status = useSelector((state: AppState) => state.main.status)
  const { accounts } = useAccount() as {
    accounts: { [key: string]: AccountData }
  }
  const {
    wallet: { address: walletAddress, lamports },
  } = useWallet()
  const decimals = useMintDecimals(mintAddress) || 0

  const fee = useMemo(() => bulk.length * TX_FEE, [bulk.length])

  // Need to merge
  const duplicated = useMemo(() => {
    if (!data || !data.length) return false
    const duplicatedElements = data.filter(([address], index) => {
      const expectedIndex = data.findIndex(
        ([expectedAddress]) => address === expectedAddress,
      )
      return expectedIndex !== index && expectedIndex > -1
    })
    if (duplicatedElements.length > 0) return true
    return false
  }, [data])

  // Checked error
  const checkError = useCallback(async () => {
    // Check data length
    if (!data || !data.length) return setError(true)
    // Check wallet address
    if (!account.isAddress(walletAddress))
      return setError('Please connect your wallet')
    if (!account.isAddress(mintAddress))
      return setError('Please select a token to send')
    // Check data contents
    const failedElements = data.filter(([address, amount]) => {
      if (!account.isAddress(address)) return true
      if (!toBigInt(amount)) return true
      return false
    })
    if (failedElements.length > 0) return setError(true)
    // Check sol balance
    if (Number(lamports) / 10 ** 9 < fee)
      return setError(
        `Not enough SOL to execute the transactions. It requires ${fee} SOL at least.`,
      )
    // Check token balance
    const {
      sentre: { splt },
    } = window
    const accountAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      mintAddress,
    )
    const { amount: balance } = accounts[accountAddress] || {
      amount: BigInt(0),
    }
    const amount = data.reduce((a, [_, b]) => a + toBigInt(b), BigInt(0))
    if (balance < amount)
      return setError(
        `Not enough token balance. It requires ${utils.undecimalize(
          amount,
          decimals,
        )} tokens over your balance, ${utils.undecimalize(
          balance,
          decimals,
        )} tokens.`,
      )
    // No error
    return setError(false)
  }, [data, mintAddress, accounts, walletAddress, lamports, fee, decimals])

  useEffect(() => {
    checkError()
  }, [checkError])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {typeof error === 'string' ? (
          <Space>
            <IonIcon
              name="information-circle-outline"
              style={{ color: '#F2323F' }}
            />
            <Typography.Text type="danger">{error}</Typography.Text>
          </Space>
        ) : (
          <Space>
            <IonIcon name="information-circle-outline" />
            <Typography.Text type={bulk.length ? undefined : 'secondary'}>
              To send tokens to <strong>{data.length}</strong> address(es), you
              will need to sign <strong>{bulk.length}</strong> time(s) with the
              total estimated fee is ~{fee} SOL.
            </Typography.Text>
          </Space>
        )}
      </Col>
      <Col span={12}>
        <Merge
          disabled={
            !duplicated ||
            !!error ||
            [Status.Estimated, Status.Sending, Status.Done].includes(status)
          }
        />
      </Col>
      <Col span={12}>
        {[Status.None, Status.Estimating].includes(status) ? (
          <Estimate disabled={!!error} onChange={setBulk} />
        ) : (
          <Send bulk={bulk} disabled={!!error} />
        )}
      </Col>
    </Row>
  )
}

export default Actions
