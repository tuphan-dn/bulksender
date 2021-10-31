import { Row, Col, Image } from 'antd'
import { StaticLoader } from 'os/components/appLoader'

import register from 'senhub.register'

const AppPanel = ({
  appId,
  onClick = () => {},
}: {
  appId: string
  onClick?: () => void
}) => {
  return (
    <StaticLoader
      type="panel"
      {...register[appId]}
      render={(src) => (
        <Row>
          <Col span={24} style={{ lineHeight: 0 }}>
            <Image src={src} width="100%" onClick={onClick} preview={false} />
          </Col>
        </Row>
      )}
    />
  )
}

export default AppPanel
