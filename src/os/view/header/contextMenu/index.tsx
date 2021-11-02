import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Divider } from 'antd'
import Navigation from './navigation'
import Search from './search'

import { RootState } from 'os/store'

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
        {pathname.startsWith('/store') ? <Search /> : <Navigation />}
      </Col>
    </Row>
  )
}

export default ContextMenu
