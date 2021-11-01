import { Row, Col, Avatar } from 'antd'
import { StaticLoader } from 'os/components/appLoader'
import IonIcon from 'shared/ionicon'

import register from 'senhub.register'

const GroupAppIcon = ({
  page,
  size = 64,
  onClick = () => {},
}: {
  page: string[]
  size: number
  onClick: () => void
}) => {
  const limit = page.length < 4 ? page.length : 4
  const subsize = (size - 8) / 2

  return (
    <Row
      gutter={[2, 2]}
      style={{
        height: size,
        width: size,
        padding: 2,
        borderRadius: 8,
        backgroundColor: '#ccc',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {Array.from(Array(limit).keys()).map((_, i) => (
        <Col key={i} span={12} style={{ lineHeight: 0 }}>
          <StaticLoader
            type="logo"
            {...register[page[i]]}
            render={(src) => (
              <Avatar src={src} shape="square" size={subsize}>
                <IonIcon name="image-outline" />
              </Avatar>
            )}
          />
        </Col>
      ))}
    </Row>
  )
}

export default GroupAppIcon
