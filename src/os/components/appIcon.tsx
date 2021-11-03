import { Component, ReactNode, Suspense } from 'react'

import { Space, Avatar, Typography, Spin } from 'antd'
import IonIcon from 'shared/ionicon'
import { RemoteStatic } from 'os/components/appLoader'

import register from 'senhub.register'

type Props = {
  appId: string
  size?: number
  onClick?: () => void
  name?: boolean
}

class ErrorBoundary extends Component<Props, { failed: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = {
      failed: false,
    }
  }

  componentDidCatch(error: Error) {
    return this.setState({ failed: Boolean(error) })
  }

  render() {
    const { failed } = this.state
    const { children } = this.props

    if (failed || !children) return <RawAppIcon {...this.props} src={null} />
    return children
  }
}

const RawAppIcon = (props: Props & { src: ReactNode }) => {
  const { src, appId, onClick = () => {}, size = 64, name = true } = props
  const { name: appName } = register[appId] || { name: 'Unknown' }

  return (
    <Space
      direction="vertical"
      style={{ width: size, textAlign: 'center' }}
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

const AppIcon = (props: Props) => {
  const { appId } = props
  const { url } = register[appId] || { url: '' }
  const manifest = { url, scope: appId, module: './static' }

  return (
    <ErrorBoundary {...props}>
      <Suspense fallback={<Spin />}>
        <RemoteStatic
          type="logo"
          manifest={manifest}
          render={(src) => <RawAppIcon {...props} src={src} />}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
export default AppIcon
