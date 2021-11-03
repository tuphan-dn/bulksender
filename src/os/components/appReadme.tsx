import { useEffect, createRef, Component, Suspense } from 'react'
import { Remarkable } from 'remarkable'

import { Row, Col, Typography, Spin } from 'antd'
import { RemoteStatic } from 'os/components/appLoader'

import register from 'senhub.register'

type Props = {
  appId: string
}

const Markdown = ({ src }: { src: string }) => {
  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    ;(async () => {
      try {
        if (!src) throw new Error('Invalid src')
        const txt = await (await fetch(src)).text()
        // Parse data
        const md = new Remarkable({ html: true })
        if (ref.current) ref.current.innerHTML = md.render(txt)
      } catch (er) {
        if (ref.current)
          ref.current.innerHTML = '<p>Cannot load the README.md</p>'
      }
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
  const { appId } = props
  const { url } = register[appId]
  const manifest = { url, scope: appId, module: './static' }

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
