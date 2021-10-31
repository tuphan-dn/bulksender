import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Badge, Divider } from 'antd'
import AppIcon from 'os/components/appIcon'
import More from './more'

import { RootState } from 'os/store'

const ContextMenu = () => {
  const history = useHistory()
  const { width } = useSelector((state: RootState) => state.ui)
  const { address } = useSelector((state: RootState) => state.wallet)
  const { appPage } = useSelector((state: RootState) => state.page)
  const { params } = useRouteMatch<{ appId: string }>('/page/:appId') || {}

  if (!account.isAddress(address)) return null
  return (
    <Row gutter={[12, 12]} wrap={false} align="middle">
      <Col>
        <Divider
          type="vertical"
          style={{ margin: `0px ${width < 768 ? 4 : 8}px` }}
        />
      </Col>
      <Col flex="auto" style={{ width: 0 }} className="scrollbar">
        <Row gutter={[12, 12]} wrap={false} align="middle">
          {appPage.flat().map((appId) => (
            <Col key={appId}>
              <Badge dot={params?.appId === appId} color="cyan" offset={[-4, 4]}>
                <AppIcon
                  appId={appId}
                  size={32}
                  name={false}
                  onClick={() => history.push(`/page/${appId}`)}
                />
              </Badge>
            </Col>
          ))}
          <Col>
            <More />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ContextMenu
