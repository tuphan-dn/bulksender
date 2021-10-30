import { useParams } from 'react-router-dom'

import { Row, Col } from 'antd'
import HeroPanel from './heroPanel'
import Description from './description'

const AppViewer = () => {
  const { appId } = useParams<{ appId: string }>()

  return (
    <Row gutter={[24, 24]}>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <HeroPanel appId={appId} />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <Description appId={appId} />
      </Col>
    </Row>
  )
}

export default AppViewer
