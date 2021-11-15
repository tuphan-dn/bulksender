import { useLocation } from 'react-router'

import { Col, Row } from 'antd'
import Backup from './backup'
import Restore from './restore'

const Sync = () => {
  const locationSearch = useLocation().search
  const cid = new URLSearchParams(locationSearch).get('cid')

  return (
    <Row justify="center">
      <Col>{cid === null ? <Backup /> : <Restore />}</Col>
    </Row>
  )
}
export default Sync
