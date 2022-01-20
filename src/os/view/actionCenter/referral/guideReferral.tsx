import { useState } from 'react'

import { Col, Row, Typography, Steps } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const GuideReferral = () => {
  const [guideStep, setGuideStep] = useState(0)
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Referral guide</Typography.Title>
      </Col>
      <Col span={24}>
        <Steps
          size="small"
          current={guideStep}
          onChange={setGuideStep}
          direction="vertical"
        >
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
                in the upper right corner {'>'}{' '}
                <Typography.Text>User</Typography.Text> {'>'}{' '}
                <Typography.Text>
                  Enter referral link or upload QR code
                </Typography.Text>{' '}
                of referrer {'>'} <Typography.Text>Confirm</Typography.Text>
              </Typography.Text>
            }
            key={2}
          />
          <Steps.Step
            title={'Deposit to Sentre pools'}
            description={
              <Typography.Text type="secondary">
                Deposit from <Typography.Text>1000 SNTR</Typography.Text> to
                Sentre pools in <Typography.Text>7 days</Typography.Text>
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
