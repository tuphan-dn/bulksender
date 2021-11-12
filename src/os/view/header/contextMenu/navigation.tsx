import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Row, Col, Badge } from 'antd'
import AppIcon from 'os/components/appIcon'
import More from './more'

import { RootState } from 'os/store'

const Navigation = () => {
  const history = useHistory()
  const { params } = useRouteMatch<{ appId: string }>('/app/:appId') || {}
  const { appIds } = useSelector((state: RootState) => state.page)
  return (
    <Row gutter={[12, 12]} wrap={false} align="middle">
      {appIds.map((appId) => (
        <Col key={appId}>
          <Badge dot={params?.appId === appId} color="#5D6CCF" offset={[-4, 4]}>
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
