import { useMemo } from 'react'
import { account } from '@senswap/sen-js'

import { Col, Row, Typography, Steps } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { RootState, useRootSelector } from 'os/store'

export type GuideReferralProps = { referrerAddress?: string }

const GuideReferral = ({ referrerAddress = '' }: GuideReferralProps) => {
  const {
    wallet: { address: walletAddress },
    flags: { referred },
  } = useRootSelector((state: RootState) => state)

  const currentStep = useMemo(() => {
    let step = 0
    if (account.isAddress(walletAddress)) step = 1
    if (account.isAddress(referrerAddress)) step = 2
    if (referred) step = 3
    return step
  }, [referrerAddress, referred, walletAddress])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Referral guide</Typography.Title>
      </Col>
      <Col span={24}>
        <Steps size="small" current={currentStep} direction="vertical">
          <Steps.Step
            title={'Connect wallet to join Sentre'}
            description={
              <Typography.Text type="secondary">
                Launch <Typography.Text>hub.sentre.io</Typography.Text> then
                select a wallet to connect.
              </Typography.Text>
            }
            key={1}
          />
          <Steps.Step
            title={'Enter invitation link'}
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
                  Enter the invitation link or scan the QR code
                </Typography.Text>{' '}
                <IonIcon name="chevron-forward-outline" />{' '}
                <Typography.Text>Confirm</Typography.Text>
              </Typography.Text>
            }
            key={2}
          />
          <Steps.Step
            title={'Use Sen Swap application'}
            description={
              <Typography.Text type="secondary">
                Swap at least <Typography.Text>100 USD</Typography.Text> to
                complete referral and claim reward (* To be qualified to receive
                the reward, you need to mint SNTR beforehand).
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
