import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Badge } from 'antd'
import AppIcon from 'os/components/appIcon'

import { RootState } from 'os/store'

const ContextMenu = () => {
  const history = useHistory()
  const { address } = useSelector((state: RootState) => state.wallet)
  const { appPage } = useSelector((state: RootState) => state.page)
  const { params } = useRouteMatch<{ appId: string }>('/page/:appId') || {}
  const currentAppId = params?.appId

  if (!account.isAddress(address)) return null
  return (
    <Row gutter={[12, 12]} wrap={false} align="middle">
      {appPage.flat().map((appId) => (
        <Col key={appId}>
          <Badge dot={currentAppId === appId} color="cyan" offset={[-4, 4]}>
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
