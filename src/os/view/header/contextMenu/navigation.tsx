import { useHistory, useRouteMatch } from 'react-router-dom'

import { Row, Col, Badge } from 'antd'
import AppIcon from 'os/components/appIcon'
import More from './more'

import { useRootSelector, RootState } from 'os/store'

import './index.os.less'

const Navigation = () => {
  const history = useHistory()
  const { params } = useRouteMatch<{ appId: string }>('/app/:appId') || {}
  const appIds = useRootSelector((state: RootState) => state.page.appIds)

  return (
    <Row gutter={[12, 12]} wrap={false} align="middle">
      {appIds.map((appId) => (
        <Col key={appId}>
          <Badge
            dot={params?.appId === appId}
            className="sentre-active-app"
            offset={[-5, 5]}
          >
            <AppIcon
              appId={appId}
              size={32}
              name={false}
              onClick={() => history.push(`/app/${appId}`)}
            />
          </Badge>
        </Col>
      ))}
      <Col>
        <More />
      </Col>
    </Row>
  )
}

export default Navigation
