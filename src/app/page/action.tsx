import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, AccountData } from '@senswap/sen-js'
import { useAccount, useWallet } from 'senhub/providers'

import { Row, Col, Button, Typography, Space } from 'antd'
import IonIcon from 'shared/ionicon'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { explorer, toBigInt } from 'shared/util'
import { TransferData, setData } from 'app/model/main.controller'
import Bulksender from 'app/lib'

const {
  sol: { spltAddress, splataAddress, bulksenderAddress, node },
} = configs

const Action = () => {
  const dispatch = useDispatch()
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
  // Merge duplicated addresses (must call when no error)
  const merge = useCallback(async () => {
    const nextData = [] as TransferData
    for (const [address, amount] of data) {
      const index = nextData.findIndex(([addr]) => addr === address)
      if (index >= 0) {
        nextData[index][1] = (
          toBigInt(nextData[index][1]) + toBigInt(amount)
        ).toString()
      } else {
        nextData.push([address, amount])
      }
    }
    await dispatch(setData(nextData))
  }, [data, dispatch])
  // Send a bulk
  const send = useCallback(async () => {
    await setLoading(true)
    const bulksender = new Bulksender(
      bulksenderAddress,
      spltAddress,
      splataAddress,
      node,
    )
    const {
      senos: { wallet },
    } = window
    for (const transferData of bulk) {
      try {
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
      } catch (er) {
        window.notify({ type: 'error', description: (er as any).message })
      }
    }
    await setLoading(false)
  }, [bulk, mintAddress])

  // Checked error
  const checkError = useCallback(async () => {
    // Check data length
    if (!data || !data.length) return setError(true)
    // Check wallet address
    if (!account.isAddress(mintAddress)) return setError(true)
    // Check data contents
    const failedElements = data.filter(([address, amount]) => {
      if (!account.isAddress(address)) return true
      if (!toBigInt(amount)) return true
      return false
    })
    if (failedElements.length > 0) return setError(true)
    // Check balance
    const {
      senos: { splt },
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
    await setLoading(true)
    const bulksender = new Bulksender(
      bulksenderAddress,
      spltAddress,
      splataAddress,
      node,
    )
    const {
      senos: { wallet },
    } = window
    let currentData = [...data]
    const newBulk: Array<TransferData> = [[]]
    while (currentData.length) {
      const [address, amount] = currentData.shift() as [string, string]
      const currentBulk = newBulk[newBulk.length - 1]
      const simulatedBulk = [...currentBulk, [address, amount]] as TransferData
      const ok = await bulksender.simulateBulkTransfer(
        simulatedBulk.map(([_, amount]) => toBigInt(amount)),
        simulatedBulk.map(([address, _]) => address),
        mintAddress,
        wallet,
      )
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

  useEffect(() => {
    computeBulk()
  }, [computeBulk])

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
        <Button
          type="text"
          icon={<IonIcon name="git-merge-outline" />}
          onClick={merge}
          disabled={loading || !!error || !duplicated}
          block
        >
          Merge
        </Button>
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

export default Action
