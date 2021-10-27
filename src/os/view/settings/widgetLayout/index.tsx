import { useDndContext } from '@dnd-kit/core'

import { Row, Col, Avatar } from 'antd'
import { StaticLoader } from 'os/components/appLoader'
import IonIcon from 'shared/ionicon'

import register from 'senhub.register'

const WidgetLayout = () => {
  const dndContext = useDndContext()
  console.log(dndContext)

  return (
    <Row gutter={[16, 16]}>
      {Object.keys(register).map((appId, i) => (
        <Col key={appId + i}>
          <StaticLoader
            type="logo"
            {...register[appId]}
            render={(src) => (
              <Avatar
                src={src}
                shape="square"
                size={64}
                style={{ cursor: 'pointer' }}
              >
                <IonIcon name="image-outline" />
              </Avatar>
            )}
          />
        </Col>
      ))}
    </Row>
  )
}

export default WidgetLayout
