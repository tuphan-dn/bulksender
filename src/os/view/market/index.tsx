import { Row, Col } from 'antd'
import Search from './search'

const Market = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Search />
      </Col>
    </Row>
  )
}

export default Market
