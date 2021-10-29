import { Space, Avatar, Typography } from 'antd'
import { StaticLoader } from 'os/components/appLoader'
import IonIcon from 'shared/ionicon'

import register from 'senhub.register'

const AppIcon = ({
  appId,
  size = 64,
  onClick = () => {},
}: {
  appId: string
  size?: number
  onClick?: () => void
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
          <Typography.Paragraph
            style={{ fontSize: size / 4.5, textAlign: 'center' }}
          >
            {register[appId].name}
          </Typography.Paragraph>
        </Space>
      )}
    />
  )
}

export default AppIcon
