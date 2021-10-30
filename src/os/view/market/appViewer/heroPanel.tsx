import { Row, Col, Card, Typography, Divider } from 'antd'
import AppIcon from 'os/components/appIcon'
import AppPanel from 'os/components/appPanel'

import register from 'senhub.register'

const TitleAndValue = ({
  title,
  value,
  divider = false,
}: {
  title: string
  value: string
  divider?: boolean
}) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col flex="auto">
            <Typography.Text type="secondary">{title}</Typography.Text>
          </Col>
          <Col>
            <Typography.Text>{value}</Typography.Text>
          </Col>
        </Row>
      </Col>
      {divider ? (
        <Col span={24}>
          <Divider style={{ marginTop: 0, marginBottom: 8 }} />
        </Col>
      ) : null}
    </Row>
  )
}

const HeroPanel = ({ appId }: { appId: string }) => {
  const {
    description,
    author: { name, email },
    name: appName,
  } = register[appId]

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AppPanel appId={appId} />
      </Col>
      <Col span={24}>
        <Card>
          <Row gutter={[24, 24]}>
            <Col>
              <AppIcon appId={appId} size={48} name={false} />
            </Col>
            <Col span={24}>
              <TitleAndValue title="Name" value={appName} divider />
            </Col>
            <Col span={24}>
              <TitleAndValue title="Author" value={name} divider />
            </Col>
            <Col span={24}>
              <TitleAndValue title="Support" value={email} divider />
            </Col>
            <Col span={24}>
              <TitleAndValue title="Description" value={description} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default HeroPanel
