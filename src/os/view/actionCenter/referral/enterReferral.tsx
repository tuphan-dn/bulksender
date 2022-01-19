import { useState } from 'react'

import { Button, Col, Input, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const EnterReferral = () => {
  const [value, setValue] = useState('')

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Input
          size="large"
          placeholder="Enter referral link"
          value={value}
          onChange={(val) => setValue(val.target.value)}
          suffix={
            <Button
              type="text"
              size="small"
              onClick={() => {}}
              icon={<IonIcon name="arrow-up-circle-outline" />}
            />
          }
        />
      </Col>
      <Col>
        <Button type="primary" size="large" onClick={() => {}} block>
          Confirm
        </Button>
      </Col>
    </Row>
  )
}
export default EnterReferral
