import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Typography } from 'antd'
import { setWidth } from 'app/controller/ui.controller'
import { AppDispatch, AppState } from 'app/model'

const Page = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { width } = useSelector((state: AppState) => state.ui)

  useEffect(() => {
    window.onresize = () => {
      dispatch(setWidth())
    }
  }, [dispatch])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>
        <Typography.Title level={3}>
          {`Hello World from Remote Page.`}
        </Typography.Title>
        <Typography.Text>{`Screen size: ${width}`}</Typography.Text>
      </Col>
    </Row>
  )
}

export default Page
