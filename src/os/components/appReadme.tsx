import { useEffect, createRef, Component, Suspense, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Remarkable } from 'remarkable'

import { Row, Col, Typography, Spin } from 'antd'
import { RemoteStatic } from 'os/components/appLoader'

import { RootState } from 'os/store'

type Props = {
  appId: string
  children?: ReactNode
}

const Markdown = ({ src }: { src: string }) => {
  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    ;(async () => {
      if (!src) throw new Error('Invalid source url')
      const txt = await (await fetch(src)).text()
      // Parse data
      const md = new Remarkable({ html: true })
      if (ref.current) ref.current.innerHTML = md.render(txt)
    })()
  }, [src, ref])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} ref={ref} />
    </Row>
  )
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

    if (failed || !children)
      return <Typography.Text>Cannot load the README.md</Typography.Text>
    return children
  }
}

const AppReadme = (props: Props) => {
  const { register } = useSelector((state: RootState) => state.page)
  const { appId } = props
  const { url } = register[appId] || { url: '' }
  const manifest = { url, scope: appId, module: './static' }

  if (!url) return null
  return (
    <ErrorBoundary {...props}>
      <Suspense fallback={<Spin />}>
        <RemoteStatic
          type={'readme'}
          manifest={manifest}
          render={(src) => <Markdown src={src} />}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppReadme
