import { Col, Collapse, Row, Typography } from 'antd'
import { REFERRAL_CONTENT } from './docReferral'

const GuideReferral = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Referral guide</Typography.Title>
      </Col>
      <Col span={24}>
        <Collapse className="referral-guide-collapse" bordered={false}>
          {REFERRAL_CONTENT.map((guide, idx) => (
            <Collapse.Panel
              header={`Step ${idx + 1}: ${guide.title}`}
              key={idx}
              showArrow={false}
            >
              <Typography.Text type="secondary">
                {guide.content}
              </Typography.Text>
            </Collapse.Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  )
}
export default GuideReferral
