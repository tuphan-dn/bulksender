import { Row, Col, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootDispatch, RootState } from 'store'
import { resize } from 'senos/store/ui.reducer'

const Widget = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { infix } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    window.onresize = () => dispatch(resize())
  }, [dispatch])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>
        <Typography.Title level={3}>
          {`Hello World from Remote App.`}
        </Typography.Title>
        <Typography.Text>{`Screen size: ${infix}`}</Typography.Text>
      </Col>
    </Row>
  )
}

export default Widget
