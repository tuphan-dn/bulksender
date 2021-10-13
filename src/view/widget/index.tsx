import { Row, Col, Card, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootDispatch, RootState } from 'store'
import { resize } from 'senos/store/ui.reducer'

const Widget = ({ backgroundColor }: { backgroundColor: string }) => {
  const dispatch = useDispatch<RootDispatch>()
  const { infix } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    window.onresize = () => dispatch(resize())
  }, [dispatch])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card bodyStyle={{ backgroundColor }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Title level={3}>
                {`Hello World from Remote Widget.`}
              </Typography.Title>
              <Typography.Text>{`Screen size: ${infix}`}</Typography.Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Widget
