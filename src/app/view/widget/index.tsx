import { Row, Col, Card, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setWidth } from 'app/controller/ui.controller'
import { AppDispatch, AppState } from 'app/model'

const Widget = ({ backgroundColor }: { backgroundColor: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { width } = useSelector((state: AppState) => state.ui)

  useEffect(() => {
    window.onresize = () => {
      dispatch(setWidth())
    }
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
              <Typography.Text>{`Screen size: ${width}`}</Typography.Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Widget
