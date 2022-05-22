import { useEffect } from 'react'
import { useUI } from '@senhub/providers'

import { Row, Col } from 'antd'

import BG from 'app/static/images/background.webp'
import Pools from './pools'

const View = () => {
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: BG, dark: BG })
  }, [setBackground])

  return (
    <Row gutter={[24, 24]} align="middle" justify="center">
      <Col style={{ maxWidth: 1200 }} span={24}>
        <Pools />
      </Col>
    </Row>
  )
}

export default View
