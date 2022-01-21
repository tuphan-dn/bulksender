import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Row, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ConfirmSuccessFully from './confirmSuccess'

import configs from 'os/configs'
import { RootState, useRootSelector } from 'os/store'
import { shortenAddress, explorer } from 'shared/util'
import PDB from 'shared/pdb'

const {
  referral: { base },
} = configs

export type EnterReferralProps = {
  referrerAddress?: string
  onConfirm?: (value: string) => void
}

const EnterReferral = ({
  referrerAddress = '',
  onConfirm = () => {},
}: EnterReferralProps) => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const referrer = query.get('referrer') || ''

  // Parse referrer address from url
  const parseReferrerAddress = useCallback(async () => {
    if (account.isAddress(referrer)) return setValue(base + referrer)
  }, [referrer])

  // For testing only
  const removeReferrerAddress = useCallback(async () => {
    if (!account.isAddress(walletAddress)) return
    const db = new PDB(walletAddress).createInstance('sentre')
    await db.removeItem('referrerAddress')
    return window.location.reload()
  }, [walletAddress])

  const existed = account.isAddress(referrerAddress)

  useEffect(() => {
    parseReferrerAddress()
  }, [parseReferrerAddress])

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Input
          size="large"
          placeholder="Referral link"
          value={existed ? base + referrerAddress : value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={existed}
        />
      </Col>
      <Col>
        <Button
          id="button-confirm-referral"
          type="primary"
          size="large"
          onClick={() => onConfirm(value)}
          disabled={existed}
          block
        >
          Confirm
        </Button>
      </Col>
      <Col span={24} style={{ fontSize: 12 }}>
        {!existed ? (
          <Typography.Text type="secondary">
            Enter the referral link to receive the reward for both.
          </Typography.Text>
        ) : (
          <Space size={4}>
            <IonIcon name="close" onClick={removeReferrerAddress} />
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
      <ConfirmSuccessFully
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </Row>
  )
}
export default EnterReferral
