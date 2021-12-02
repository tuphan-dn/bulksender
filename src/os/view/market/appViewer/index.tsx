import { useParams, useHistory } from 'react-router-dom'

import { Row, Col, Card, Button } from 'antd'
import AppDetails from './appDetails'
import ScreenShot from './screenshot'
import IonIcon from 'shared/ionicon'
import AppCategorySlice from '../appCategory/slice'

import { CustomCategory } from '../appCategory/hooks'
import './index.os.less'

const AppViewer = () => {
  const history = useHistory()
  const { appId } = useParams<{ appId: string }>()

  const onBack = () => history.goBack()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          size="small"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={onBack}
          style={{ marginLeft: -7 }}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
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
        <AppCategorySlice
          category={CustomCategory.suggest}
          related={{ appIds: [appId] }}
          seeAll={false}
        />
      </Col>
    </Row>
  )
}

export default AppViewer
