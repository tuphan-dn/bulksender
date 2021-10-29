import { useHistory, useRouteMatch } from 'react-router-dom'

import { Row, Col, Badge } from 'antd'
import AppIcon from 'os/components/appIcon'

import register from 'senhub.register'

const ContextMenu = () => {
  const history = useHistory()
  const { params } = useRouteMatch<{ appId: string }>('/page/:appId') || {}
  const currentAppId = params?.appId

  return (
    <Row gutter={[12, 12]}>
      {Object.keys(register).map((appId) => (
        <Col key={appId}>
          <Badge dot={currentAppId === appId} color="cyan" offset={[-2, 2]}>
            <AppIcon
              appId={appId}
              size={32}
              name={false}
              onClick={() => history.push(`/page/${appId}`)}
            />
          </Badge>
        </Col>
      ))}
    </Row>
  )
}

export default ContextMenu
