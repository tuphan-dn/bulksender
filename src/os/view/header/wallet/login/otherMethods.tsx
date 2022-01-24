import { Col, Row } from 'antd'
import React from 'react'
import KeyStore from './keystore'
import SecretKey from './secretKey'

const OtherMethods = () => {
  return (
    <Row>
      <Col span={24}>
        <KeyStore />
      </Col>
      <Col span={24} style={{ height: 16 }} /> {/* Safe space */}
      <Col span={24}>
        <SecretKey />
      </Col>
    </Row>
  )
}

export default OtherMethods
