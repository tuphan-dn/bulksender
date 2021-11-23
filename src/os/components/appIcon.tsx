import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { Space, Avatar, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import { StaticLoader } from 'os/components/appLoader'

import { RootState } from 'os/store'

type Props = {
  appId: string
  size?: number
  onClick?: () => void
  name?: boolean
  direction?: 'vertical' | 'horizontal'
  children?: ReactNode
}

const RawVerticalAppIcon = (props: Props & { src: ReactNode }) => {
  const { src, appId, onClick = () => {}, size = 64, name = true } = props
  const { register } = useSelector((state: RootState) => state.page)
  const { name: appName } = register[appId] || { name: 'Unknown' }

  return (
    <Space
      direction="vertical"
      style={{ width: size, textAlign: 'center', lineHeight: 1 }}
      onClick={onClick}
    >
      <Avatar
        src={src}
        shape="square"
        size={size}
        style={{ cursor: 'pointer' }}
      >
        <IonIcon name="image-outline" />
      </Avatar>
      {name ? (
        <Typography.Text
          style={{
            fontSize: Math.floor(size / 4.5),
          }}
        >
          {appName}
        </Typography.Text>
      ) : null}
    </Space>
  )
}

const RawHorizontalAppIcon = (props: Props & { src: ReactNode }) => {
  const { src, appId, onClick = () => {}, size = 32, name = true } = props
  const { register } = useSelector((state: RootState) => state.page)
  const { name: appName } = register[appId] || { name: 'Unknown' }

  return (
    <Space
      style={{
        cursor: 'pointer',
        lineHeight: 1,
      }}
      onClick={onClick}
    >
      <Avatar src={src} shape="square" size={size}>
        <IonIcon name="image-outline" />
      </Avatar>
      {name ? <Typography.Text>{appName}</Typography.Text> : null}
    </Space>
  )
}

const RawAppIcon = (props: Props & { src: ReactNode }) => {
  const { direction = 'vertical' } = props
  if (direction === 'vertical') return <RawVerticalAppIcon {...props} />
  return <RawHorizontalAppIcon {...props} />
}

const AppIcon = (props: Props) => {
  const { appId } = props
  
  return (
    <StaticLoader
      defaultData=""
      type="logo"
      appId={appId}
      render={(src) => <RawAppIcon {...props} src={src} />}
    />
  )
}
export default AppIcon
