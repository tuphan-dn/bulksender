import { Button, Col, Row, Typography } from 'antd'
import MintInput from 'app/components/mintInput'
import React, { useState } from 'react'
import { MintSelection } from 'shared/antd/mint'
import NumericInput from 'shared/antd/numericInput'
import IonIcon from 'shared/antd/ionicon'

export const ModalContent = () => {
  const [amount, setAmount] = useState('0')
  const [price, setPrice] = useState('0')
  const [mint, setMint] = useState('')

  const onCreate = () => {}

  return (
    <Row gutter={[24, 24]}>
      {/* Token Amount */}
      <Col span={24}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Typography.Text type="secondary" className="caption">
              Token Amount
            </Typography.Text>
          </Col>
          <Col span={24}>
            <MintInput
              amount={amount}
              selectedMint={mint}
              onChangeAmount={setAmount}
              mintSelection={
                <MintSelection
                  value={mint}
                  onChange={setMint}
                  style={{ background: '#394360' }}
                />
              }
            />
          </Col>
        </Row>
      </Col>
      {/* Token Price */}
      <Col span={24}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Typography.Text type="secondary" className="caption">
              Price
            </Typography.Text>
          </Col>
          <Col span={24}>
            <NumericInput
              size="large"
              placeholder="0"
              value={price}
              onValue={setPrice}
              suffix={
                <Button
                  type="text"
                  size="small"
                  icon={<IonIcon name="reload-outline" />}
                  onClick={() => {}}
                >
                  Check
                </Button>
              }
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button type="primary" block onClick={onCreate}>
          Create
        </Button>
      </Col>
    </Row>
  )
}
