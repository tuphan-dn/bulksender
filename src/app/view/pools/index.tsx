import { Col, Row, Space, Typography } from 'antd'
import PoolCard from './poolCard'
import CreatePool from '../createPool'

const Pools = () => {
  return (
    <Row gutter={[48, 48]} justify="center" align="middle">
      <Col span={24}>
        <Row justify="center" align="middle">
          <Col>
            <Space>
              <Typography.Title>Top Pool</Typography.Title>
              <Typography.Title type="success">Lucid</Typography.Title>
            </Space>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <Space>
              <Typography.Text>Click</Typography.Text>
              <CreatePool />
              <Typography.Text>to create pool</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row gutter={[24, 24]} justify="center" align="middle">
          {[1, 2, 3, 4, 5].map((e, i) => (
            <Col span={24}>
              <PoolCard rank={i} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Pools
