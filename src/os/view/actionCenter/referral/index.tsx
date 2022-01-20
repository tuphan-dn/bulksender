import { Col, Divider, Row, Space, Typography } from 'antd'
import EnterReferral from './enterReferral'
import ShareReferral from './shareReferral'
import GuideReferral from './guideReferral'
import YourReferral from './yourReferral'

const Referral = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text>Your referral link</Typography.Text>
          </Col>
          <Col span={24}>
            <YourReferral />
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Send this link to friends or
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
        <EnterReferral />
      </Col>
      <Col span={24}>
        <GuideReferral />
      </Col>
    </Row>
  )
}
export default Referral
