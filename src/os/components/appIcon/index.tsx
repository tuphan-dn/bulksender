import { ReactNode, useMemo } from 'react'

import { Space, Avatar, Typography, Badge, AvatarProps } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { StaticLoader } from 'os/components/staticLoader'

import { useRootSelector, RootState } from 'os/store'
import configs from 'os/configs'
import './index.os.less'

const {
  register: { devAppId },
} = configs

type AppIconProps = {
  appId: string
  size?: number
  onClick?: () => void
  name?: boolean
  direction?: 'vertical' | 'horizontal'
  children?: ReactNode
}

const AppAvatar = ({
  appId,
  avatarProps,
}: {
  appId: string
  avatarProps: AvatarProps
}) => {
  return appId === devAppId ? (
    <Badge.Ribbon className="sentre-ribbon-dev" text="dev" placement="start">
      <Avatar {...avatarProps}>
        <IonIcon name="image-outline" />
      </Avatar>
    </Badge.Ribbon>
  ) : (
    <Avatar {...avatarProps}>
      <IonIcon name="image-outline" />
    </Avatar>
  )
}

const RawVerticalAppIcon = ({
  src,
  appId,
  onClick = () => {},
  size = 64,
  name = true,
}: AppIconProps & { src: ReactNode }) => {
  const register = useRootSelector((state: RootState) => state.page.register)
  const { name: appName } = useMemo(
    () => register[appId] || { name: 'Unknown' },
    [register, appId],
  )

  return (
    <Space
      direction="vertical"
      style={{ width: size, textAlign: 'center', lineHeight: 1.25 }}
      onClick={onClick}
    >
      <AppAvatar
        appId={appId}
        avatarProps={{
          src,
          shape: 'square',
          size,
          style: { cursor: 'pointer' },
        }}
      />
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

const RawHorizontalAppIcon = ({
  src,
  appId,
  onClick = () => {},
  size = 32,
  name = true,
}: AppIconProps & { src: ReactNode }) => {
  const register = useRootSelector((state: RootState) => state.page.register)
  const { name: appName } = useMemo(
    () => register[appId] || { name: 'Unknown' },
    [register, appId],
  )

  return (
    <Space
      style={{
        cursor: 'pointer',
        lineHeight: 1,
      }}
      onClick={onClick}
    >
      <AppAvatar
        appId={appId}
        avatarProps={{
          src,
          shape: 'square',
          size,
          style: { cursor: 'pointer' },
        }}
      />
      {name ? <Typography.Text>{appName}</Typography.Text> : null}
    </Space>
  )
}

const RawAppIcon = (props: AppIconProps & { src: ReactNode }) => {
  const { direction = 'vertical', ...rest } = props
  if (direction === 'vertical') return <RawVerticalAppIcon {...rest} />
  return <RawHorizontalAppIcon {...rest} />
}

const AppIcon = (props: AppIconProps) => {
  return (
    <StaticLoader
      type="logo"
      appId={props.appId}
      render={(src) => <RawAppIcon {...props} src={src} />}
    />
  )
}
export default AppIcon
