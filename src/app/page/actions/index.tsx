import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, AccountData } from '@senswap/sen-js'
import { useAccount, useWallet } from '@senhub/providers'

import { Row, Col, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Estimate from './estimate'
import Merge from './merge'
import Send from './send'

import { AppState } from 'app/model'
import { Status, TransferData } from 'app/model/main.controller'
import { toBigInt } from 'app/lib/utils'

const Actions = () => {
  const [error, setError] = useState<boolean | string>(false)
  const [bulk, setBulk] = useState<Array<TransferData>>([])
  const { data, mintAddress, status } = useSelector(
    (state: AppState) => state.main,
  )
  const { accounts } = useAccount() as {
    accounts: { [key: string]: AccountData }
  }
  const {
    wallet: { address: walletAddress },
  } = useWallet()

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
    // Check balance
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
    if (balance < amount) return setError('Not enough token balance')
    // No error
    return setError(false)
  }, [data, mintAddress, accounts, walletAddress])

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
              total estimated fee is ~{bulk.length * 0.005} SOL.
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
