import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Badge, Divider } from 'antd'
import AppIcon from 'os/components/appIcon'
import GroupAppIcon from 'os/components/groupAppIcon'
import More from './more'

import { RootState } from 'os/store'

const InAppMenu = () => {
  const history = useHistory()
  const { params } = useRouteMatch<{ appId: string }>('/app/:appId') || {}
  const { appPage } = useSelector((state: RootState) => state.page)
  return (
    <Row gutter={[12, 12]} wrap={false} align="middle">
      {appPage.flat().map((appId) => (
        <Col key={appId}>
          <Badge dot={params?.appId === appId} color="cyan" offset={[-4, 4]}>
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

const InDashboardMenu = () => {
  const history = useHistory()
  const { params } =
    useRouteMatch<{ pageId: string }>('/dashboard/:pageId') || {}
  const { appPage } = useSelector((state: RootState) => state.page)

  const currentPageId = Number(params?.pageId) || 0

  return (
    <Row gutter={[12, 12]} wrap={false} align="middle">
      {appPage.map((page, i) => (
        <Col key={i}>
          <Badge dot={currentPageId === i} color="cyan" offset={[-4, 4]}>
            <GroupAppIcon
              page={page}
              size={32}
              onClick={() => history.push(`/dashboard/${i}`)}
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

const ContextMenu = () => {
  const { pathname } = useLocation()
  const { width } = useSelector((state: RootState) => state.ui)
  const { address } = useSelector((state: RootState) => state.wallet)

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
        {pathname.startsWith('/dashboard') ? (
          <InDashboardMenu />
        ) : (
          <InAppMenu />
        )}
      </Col>
    </Row>
  )
}

export default ContextMenu
