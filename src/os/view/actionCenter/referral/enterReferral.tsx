import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Row, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import configs from 'os/configs'
import { shortenAddress, explorer } from 'shared/util'

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
  const [value, setValue] = useState('')
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const referrer = query.get('referrer') || ''

  // Parse referrer address from url
  const parseReferrerAddress = useCallback(async () => {
    if (account.isAddress(referrer)) return setValue(base + referrer)
  }, [referrer])

  const existed = account.isAddress(referrerAddress)

  useEffect(() => {
    parseReferrerAddress()
  }, [parseReferrerAddress])

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Input
          size="large"
          placeholder="Invitation link"
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
            Enter the invitation link to receive the reward for both.
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
