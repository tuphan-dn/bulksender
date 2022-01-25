import { useMemo } from 'react'
import { account } from '@senswap/sen-js'

import { Col, Row, Typography, Steps } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { RootState, useRootSelector } from 'os/store'

export type GuideReferralProps = { referrerAddress?: string }

const GuideReferral = ({ referrerAddress = '' }: GuideReferralProps) => {
  const {
    wallet: { address: walletAddress },
  } = useRootSelector((state: RootState) => state)

  const currentStep = useMemo(() => {
    let step = 0
    if (account.isAddress(walletAddress)) step = 1
    if (account.isAddress(referrerAddress)) step = 2
    return step
  }, [referrerAddress, walletAddress])

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
            title={'Deposit to Sentre pools'}
            description={
              <Typography.Text type="secondary">
                Deposit more than <Typography.Text>1000 SNTR</Typography.Text>{' '}
                to your wallet in <Typography.Text>7 days</Typography.Text>
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
