import { useEffect, createRef } from 'react'
import { Remarkable } from 'remarkable'

import { Row, Col } from 'antd'
import { StaticLoader } from 'os/components/appLoader'

import register from 'senhub.register'

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

const AppReadme = ({ appId }: { appId: string }) => {
  return (
    <StaticLoader
      type="readme"
      {...register[appId]}
      render={(src) => <Markdown src={src} />}
    />
  )
}

export default AppReadme
