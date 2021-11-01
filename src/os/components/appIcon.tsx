import { Space, Avatar, Typography } from 'antd'
import { StaticLoader } from 'os/components/appLoader'
import IonIcon from 'shared/ionicon'

import register from 'senhub.register'

const AppIcon = ({
  appId,
  size = 64,
  onClick = () => {},
  name = true,
}: {
  appId: string
  size?: number
  onClick?: () => void
  name?: boolean
}) => {
  return (
    <StaticLoader
      type="logo"
      {...register[appId]}
      render={(src) => (
        <Space direction="vertical" style={{ width: size }} onClick={onClick}>
          <Avatar
            src={src}
            shape="square"
            size={size}
            style={{ cursor: 'pointer' }}
          >
            <IonIcon name="image-outline" />
          </Avatar>
          {name ? (
            <Typography.Paragraph
              style={{
                fontSize: Math.floor(size / 4.5),
                textAlign: 'center',
                marginBottom: 0
              }}
            >
              {register[appId].name}
            </Typography.Paragraph>
          ) : null}
        </Space>
      )}
    />
  )
}

export default AppIcon
