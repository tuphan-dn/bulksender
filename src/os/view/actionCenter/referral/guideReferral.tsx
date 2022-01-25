import { useCallback, useEffect, useMemo, useState } from 'react'
import { account } from '@senswap/sen-js'

import { Col, Row, Typography, Steps } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { RootState, useRootSelector } from 'os/store'
import PDB from 'shared/pdb'

export type GuideReferralProps = { referrerAddress?: string }

const GuideReferral = ({ referrerAddress = '' }: GuideReferralProps) => {
  const {
    wallet: { address: walletAddress },
    accounts,
  } = useRootSelector((state: RootState) => state)
  const [validReferrer, setValidReferrer] = useState(false)

  const getValidReferrer = useCallback(async () => {
    if (!accounts) return
    const db = new PDB(walletAddress).createInstance('sentre')
    const validReferrer = await db.getItem(referrerAddress)
    if (validReferrer) return setValidReferrer(true)
    return setValidReferrer(false)
  }, [accounts, referrerAddress, walletAddress])

  const currentStep = useMemo(() => {
    let step = 0
    if (account.isAddress(walletAddress)) step = 1
    if (account.isAddress(referrerAddress)) step = 2
    if (validReferrer) step = 3
    return step
  }, [referrerAddress, validReferrer, walletAddress])

  useEffect(() => {
    getValidReferrer()
  }, [getValidReferrer])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Referral guide</Typography.Title>
      </Col>
      <Col span={24}>
        <Steps size="small" current={currentStep} direction="vertical">
          <Steps.Step
            title={'Connect wallet to join the Sentre'}
            description={
              <Typography.Text type="secondary">
                Launch <Typography.Text>hub.sentre.io</Typography.Text> and then
                select a wallet to connect.
              </Typography.Text>
            }
            key={1}
          />
          <Steps.Step
            title={'Enter referral link'}
            description={
              <Typography.Text type="secondary">
                Click the icon{' '}
                <Typography.Text>
                  <IonIcon name="menu-outline" />
                </Typography.Text>{' '}
                in the upper right corner{' '}
                <IonIcon name="chevron-forward-outline" />{' '}
                <Typography.Text>User</Typography.Text>{' '}
                <IonIcon name="chevron-forward-outline" />{' '}
                <Typography.Text>
                  Enter the referral link or scan the QR code
                </Typography.Text>{' '}
                <IonIcon name="chevron-forward-outline" />{' '}
                <Typography.Text>Confirm</Typography.Text>
              </Typography.Text>
            }
            key={2}
          />
          <Steps.Step
            title={'Using Sen Swap application'}
            description={
              <Typography.Text type="secondary">
                Swap to any token more than{' '}
                <Typography.Text>100 USD</Typography.Text> to finish referral
                and claim reward.
              </Typography.Text>
            }
            key={3}
          />
        </Steps>
      </Col>
    </Row>
  )
}
export default GuideReferral
