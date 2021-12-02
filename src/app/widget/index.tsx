import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Typography, Space, Button } from 'antd'
import IonIcon from 'shared/ionicon'

import { AppDispatch, AppState } from 'app/model'
import { increaseCounter } from 'app/model/main.controller'
import { env } from 'shared/runtime'
import { useUI } from 'senhub/providers'

const Widget = () => {
  const {
    ui: { width, infix },
  } = useUI()
  const dispatch = useDispatch<AppDispatch>()
  const { counter } = useSelector((state: AppState) => state.main)
  const increase = useCallback(() => dispatch(increaseCounter()), [dispatch])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space align="center">
          <IonIcon name="apps-outline" />
          <Typography.Title level={4}>Widget</Typography.Title>
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Text>
          Env: {env} - {width}px - {infix}
        </Typography.Text>
      </Col>
      <Col>
        <Typography.Text>Counter: {counter}</Typography.Text>
      </Col>
      <Col>
        <Button onClick={increase}>Increase</Button>
      </Col>
    </Row>
  )
}

export default Widget
