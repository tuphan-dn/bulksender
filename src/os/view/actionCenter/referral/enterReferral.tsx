import { useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { RootState, useRootSelector } from 'os/store'
import PDB from 'shared/pdb'
import { shortenAddress } from 'shared/util'

const EnterReferral = () => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)
  const [referrerAddress, setReferrerAddress] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(walletAddress)) return
      const db = new PDB(walletAddress).createInstance('sentre')
      const referrer: string | null = await db.getItem('referrerAddress')
      if (referrer && account.isAddress(referrer)) setReferrerAddress(referrer)
    })()
  }, [walletAddress])

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Input
          size="large"
          placeholder="Enter referral link"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          suffix={
            <Button
              type="text"
              size="small"
              onClick={() => {}}
              icon={<IonIcon name="arrow-up-circle-outline" />}
            />
          }
        />
      </Col>
      <Col>
        <Button type="primary" size="large" onClick={() => {}} block>
          Confirm
        </Button>
      </Col>
      <Col span={24}>
        <Space style={{ fontSize: 12 }}>
          <Typography.Text type="secondary">You was refered by</Typography.Text>
          <Typography.Text>{shortenAddress(referrerAddress)}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}
export default EnterReferral
