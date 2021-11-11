import { useSelector } from 'react-redux'

import { Row, Col, Card, Typography, Divider } from 'antd'
import AppIcon from 'os/components/appIcon'
import AppPanel from 'os/components/appPanel'

import { RootState } from 'os/store'

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
  const { register } = useSelector((state: RootState) => state.page)
  const { description, author, name } = register[appId] || {}

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <AppPanel appId={appId} />
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col>
              <AppIcon appId={appId} size={48} name={false} />
            </Col>
            <Col span={24}>
              <TitleAndValue title="Name" value={name || ''} divider />
            </Col>
            <Col span={24}>
              <TitleAndValue
                title="Author"
                value={author?.name || ''}
                divider
              />
            </Col>
            <Col span={24}>
              <TitleAndValue
                title="Support"
                value={author?.email || ''}
                divider
              />
            </Col>
            <Col span={24}>
              <TitleAndValue title="Description" value={description || ''} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default HeroPanel
