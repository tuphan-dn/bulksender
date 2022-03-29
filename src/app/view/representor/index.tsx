import { useSelector } from 'react-redux'

import { Row, Col, Card, Typography } from 'antd'
import Line from './line'
import Add from './add'
import Decimals from './decimals'

import { AppState } from 'app/model'

const Representor = () => {
  const {
    main: { data },
  } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Decimals />
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ padding: 16, height: 384 }} className="scrollbar">
          <Row gutter={[8, 8]}>
            {!data.length ? (
              <Col span={24}>
                <Typography.Text type="secondary">No Data</Typography.Text>
              </Col>
            ) : null}
            {data.map(([address, amount], i) => {
              return (
                <Col key={address + i} span={24}>
                  <Line index={i} accountAddress={address} amount={amount} />
                </Col>
              )
            })}
            <Col span={24}>
              <Add />
            </Col>
            <Col span={24} />
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Representor
