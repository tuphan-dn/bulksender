import { Col, Row } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'

const AppDescription = ({
  description = 'App descriptions',
}: {
  description?: string
}) => {
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24}>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'More' }}>
          {description}
        </Paragraph>
      </Col>
    </Row>
  )
}

export default AppDescription
