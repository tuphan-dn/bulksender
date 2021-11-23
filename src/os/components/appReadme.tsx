import { useEffect, createRef, ReactNode } from 'react'
import { Remarkable } from 'remarkable'

import { Row, Col } from 'antd'

import { StaticLoader } from 'os/components/staticLoader'

type Props = {
  appId: string
  children?: ReactNode
}

const Markdown = ({ src }: { src: string }) => {
  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    ;(async () => {
      let txt = ''
      try {
        // Parse data
        if (!src) throw new Error('Invalid source url ')
        txt = await (await fetch(src)).text()
      } catch (error) {
        txt = 'Cannot load the README.md'
      }
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

const AppReadme = (props: Props) => {
  const { appId } = props
  return (
    <StaticLoader
      type="readme"
      appId={appId}
      render={(src) => <Markdown src={src} />}
    />
  )
}

export default AppReadme
