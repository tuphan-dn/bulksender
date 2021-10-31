import { useHistory } from 'react-router-dom'

import { Row, Col } from 'antd'
import AppIcon from 'os/components/appIcon'
import Search from './search'

import register from 'senhub.register'

const Market = () => {
  const history = useHistory()
  const to = (appId: string) => history.push(`/store/${appId}`)

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Search />
      </Col>
      {Object.keys(register).map((appId) => (
        <Col key={appId}>
          <AppIcon appId={appId} onClick={() => to(appId)} />
        </Col>
      ))}
    </Row>
  )
}

export default Market
