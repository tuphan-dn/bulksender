import { Component, ReactNode, Suspense } from 'react'
import { useSelector } from 'react-redux'

import { Space, Avatar, Typography, Spin } from 'antd'
import IonIcon from 'shared/ionicon'
import { RemoteStatic } from 'os/components/appLoader'

import { RootState } from 'os/store'

type Props = {
  appId: string
  size?: number
  onClick?: () => void
  name?: boolean
  direction?: 'vertical' | 'horizontal'
  children?: ReactNode
}

class ErrorBoundary extends Component<Props, { failed: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = {
      failed: false,
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children)
      return this.setState({ failed: false })
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
  const { register } = useSelector((state: RootState) => state.page)
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
