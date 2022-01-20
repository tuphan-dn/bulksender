import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Row, Typography, Space } from 'antd'

import configs from 'os/configs'
import { RootState, useRootSelector } from 'os/store'
import PDB from 'shared/pdb'
import { shortenAddress, explorer } from 'shared/util'
import IonIcon from 'shared/antd/ionicon'

const {
  referral: { base },
} = configs

const EnterReferral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [referrerAddress, setReferrerAddress] = useState('')
  const [value, setValue] = useState('')

  const loadReferrerAddress = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return
    const db = new PDB(walletAddress).createInstance('sentre')
    const referrer: string | null = await db.getItem('referrerAddress')
    if (referrer && account.isAddress(referrer)) setReferrerAddress(referrer)
  }, [walletAddress])

  const validLink = account.isAddress(referrerAddress)

  const onConfirm = useCallback(async () => {
    const temp = value.split('/')
    const referrer = temp.find((e) => account.isAddress(e))
    if (!account.isAddress(walletAddress))
      return window.notify({
        type: 'error',
        description: 'Wallet is not connected',
      })
    if (account.isAddress(referrerAddress))
      return window.notify({
        type: 'warning',
        description: 'Cannot change the referrer address',
      })
    if (walletAddress === referrer)
      return window.notify({
        type: 'warning',
        description: 'Cannot invite yourself',
      })
    if (!value.startsWith(base) || !account.isAddress(referrer))
      return window.notify({
        type: 'warning',
        description: 'Broken referral link',
      })
    const db = new PDB(walletAddress).createInstance('sentre')
    await db.setItem('referrerAddress', referrer)
    return loadReferrerAddress()
  }, [value, walletAddress, loadReferrerAddress, referrerAddress])

  useEffect(() => {
    loadReferrerAddress()
  }, [loadReferrerAddress])

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Input
          size="large"
          placeholder="Referral link"
          value={validLink ? base + referrerAddress : value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={validLink}
        />
      </Col>
      <Col>
        <Button
          type="primary"
          size="large"
          onClick={onConfirm}
          disabled={validLink}
          block
        >
          Confirm
        </Button>
      </Col>
      <Col span={24} style={{ fontSize: 12 }}>
        {!validLink ? (
          <Typography.Text type="secondary">
            Enter the referral link to receive the reward for both.
          </Typography.Text>
        ) : (
          <Space size={4}>
            <Typography.Text type="secondary">
              You was invited by
            </Typography.Text>
            <Typography.Text
              style={{ cursor: 'pointer' }}
              onClick={() => window.open(explorer(referrerAddress), '_blank')}
            >
              {shortenAddress(referrerAddress)} <IonIcon name="open-outline" />
            </Typography.Text>
          </Space>
        )}
      </Col>
    </Row>
  )
}
export default EnterReferral
