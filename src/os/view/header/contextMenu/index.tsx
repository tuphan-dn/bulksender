import { useLocation } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col } from 'antd'
import Navigation from './navigation'
import Search from './search'

import { useRootSelector, RootState } from 'os/store'

const ContextMenu = () => {
  const { pathname } = useLocation()
  const { address } = useRootSelector((state: RootState) => state.wallet)

  if (pathname.startsWith('/store')) return <Search />
  if (!account.isAddress(address)) return null
  return (
    <Row gutter={[12, 12]}>
      <Col span={24} style={{ width: 0, marginLeft: 8 }} className="scrollbar">
        <Navigation />
      </Col>
    </Row>
  )
}

export default ContextMenu
