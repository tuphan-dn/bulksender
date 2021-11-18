import { useParams, useHistory } from 'react-router-dom'

import { Row, Col, Card, Button } from 'antd'
import AppDetails from './appDetails'
import ScreenShot from './screenshot'
import IonIcon from 'shared/ionicon'
import AppCategory from '../appCategory/slice'

import './index.os.less'

const AppViewer = () => {
  const history = useHistory()
  const { appId } = useParams<{ appId: string }>()

  const onBack = () => history.goBack()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button icon={<IonIcon name="arrow-back-outline" />} onClick={onBack}>
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Card>
          <Row gutter={[24, 24]}>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <AppDetails appId={appId} />
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <ScreenShot appId={appId} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <AppCategory category="other" />
      </Col>
    </Row>
  )
}

export default AppViewer
