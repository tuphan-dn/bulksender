import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, AccountData } from '@senswap/sen-js'
import { useAccount, useWallet } from 'senhub/providers'

import { Row, Col, Button, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { asyncWait, explorer } from 'shared/util'
import { TransferData } from 'app/model/main.controller'
import Bulksender from 'app/lib'
import Merge from './merge'
import { toBigInt } from 'app/lib/utils'

const {
  sol: { spltAddress, splataAddress, bulksenderAddress, node },
} = configs

const Actions = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean | string>(false)
  const [bulk, setBulk] = useState<Array<TransferData>>([])
  const { data, mintAddress } = useSelector((state: AppState) => state.main)
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

  // Send a bulk
  const send = useCallback(async () => {
    await setLoading(true)
    const bulksender = new Bulksender(
      bulksenderAddress,
      spltAddress,
      splataAddress,
      node,
    )
    for (const transferData of bulk) {
      try {
        const {
          sentre: { wallet },
        } = window
        if (!wallet) throw new Error('Cannot connect wallet')
        const { txId } = await bulksender.checkedBulkTransfer(
          transferData.map(([_, amount]) => toBigInt(amount)),
          transferData.map(([address, _]) => address),
          mintAddress,
          wallet,
        )
        window.notify({
          type: 'success',
          description: 'Successfully transfer tokens. Click to view details.',
          onClick: () => window.open(explorer(txId), '_blank'),
        })
      } catch (er: any) {
        window.notify({ type: 'error', description: er.message })
      }
    }
    await setLoading(false)
  }, [bulk, mintAddress])

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

  // Compute bulk
  const computeBulk = useCallback(async () => {
    if (error) return setBulk([])
    const {
      sentre: { wallet },
    } = window
    if (!wallet) return setError('Cannot connect wallet')

    await setLoading(true)
    const bulksender = new Bulksender(
      bulksenderAddress,
      spltAddress,
      splataAddress,
      node,
    )
    let currentData = [...data]
    const newBulk: Array<TransferData> = [[]]
    while (currentData.length) {
      const [address, amount] = currentData.shift() as [string, string]
      const currentBulk = newBulk[newBulk.length - 1]
      const simulatedBulk = [...currentBulk, [address, amount]] as TransferData
      await asyncWait(500) // Avoid too many requests
      let ok = false
      try {
        ok = await bulksender.simulateBulkTransfer(
          simulatedBulk.map(([_, amount]) => toBigInt(amount)),
          simulatedBulk.map(([address, _]) => address),
          mintAddress,
          wallet,
        )
      } catch (er) {
        // Nothing
      }
      if (ok) newBulk[newBulk.length - 1] = simulatedBulk
      else if (currentBulk.length <= 1) {
        await setError(
          'Cannot handle the transaction. Make sure that your SOL balance is enough to pay fees.',
        )
        return setLoading(false)
      } else newBulk.push([[address, amount]])
    }
    await setBulk(newBulk)
    return setLoading(false)
  }, [error, data, mintAddress])

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
            <Button
              type="text"
              size="small"
              icon={<IonIcon name="refresh-outline" />}
              onClick={computeBulk}
            >
              Refresh
            </Button>
            <Typography.Text type={bulk.length ? undefined : 'secondary'}>
              To send tokens to <strong>{data.length}</strong> address(es), you
              will need to sign <strong>{bulk.length}</strong> time(s) with the
              total estimated fee is ~{bulk.length * 0.005} SOL.
            </Typography.Text>
          </Space>
        )}
      </Col>
      <Col span={12}>
        <Merge disabled={!duplicated || !!error || loading} />
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          icon={<IonIcon name="send" />}
          onClick={send}
          disabled={!!error}
          loading={loading}
          block
        >
          Send
        </Button>
      </Col>
    </Row>
  )
}

export default Actions
