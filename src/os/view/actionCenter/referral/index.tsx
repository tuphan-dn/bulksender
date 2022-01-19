import { Button, Col, Divider, Input, Row, Space, Typography } from 'antd'
import EnterReferral from './enterReferral'
import ShareReferral from './shareReferral'
import IonIcon from 'shared/antd/ionicon'

import { RootState, useRootSelector } from 'os/store'
import { shortenAddress } from 'shared/util'

import './index.less'
import GuideReferral from './guideReferral'

const Referral = () => {
  const { address } = useRootSelector((state: RootState) => state.wallet)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text>Your referral link</Typography.Text>
          </Col>
          <Col span={24}>
            <Input
              value={shortenAddress(address)}
              size="large"
              suffix={
                <Space>
                  <Button
                    type="text"
                    size="small"
                    icon={<IonIcon name="qr-code-outline" />}
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<IonIcon name="copy-outline" />}
                  />
                </Space>
              }
            />
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Send this link for friend or
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text>Share</Typography.Text>
          <ShareReferral />
        </Space>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      <Col span={24}>
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <EnterReferral />
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Enter the link of the referrer for both of you to receive the
              reward.
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <GuideReferral />
      </Col>
    </Row>
  )
}
export default Referral
