import { useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Row, Col, Tooltip, Space, Card, Typography } from 'antd'
import Wallet from 'os/view/header/wallet'
import IconButton from './iconButton'
import PriceInfo from './priceInfo'
import Address from './address'
import Balance from './balance'

import { RootState } from 'os/store'
import './index.less'

const CARD_TEXT_STYLE = { color: '#BEC4EC', fontSize: 12 }

const WalletIntro = () => {
  const { lamports } = useSelector((state: RootState) => state.wallet)
  const [hidden, setHidden] = useState(false)

  return (
    <Card className="card-wallet" bordered={false}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row gutter={[4, 4]}>
            <Col span={12}>
              <Space size={6}>
                <span style={{ color: '#03E1FF' }}>◎</span>
                <Typography.Text style={CARD_TEXT_STYLE}>SOL</Typography.Text>
                <IconButton
                  name={hidden ? 'eye-off-outline' : 'eye-outline'}
                  onClick={() => setHidden(!hidden)}
                />
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Typography.Text style={CARD_TEXT_STYLE}>
                Wallet address
              </Typography.Text>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size={0}>
                <Tooltip
                  title={hidden ? '' : `${utils.undecimalize(lamports, 9)} SOL`}
                >
                  <Typography.Title level={3} style={{ color: '#E9E9EB' }}>
                    <Balance hidden={hidden} />
                  </Typography.Title>
                </Tooltip>
                <Typography.Text style={{ ...CARD_TEXT_STYLE, fontSize: 14 }}>
                  <Balance hidden={hidden} inUSD />
                </Typography.Text>
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Address />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 4]} align="bottom">
            <Col span={24}>
              <Typography.Text style={CARD_TEXT_STYLE}>
                24h SOL price
              </Typography.Text>
            </Col>
            <Col span={12} style={{ paddingLeft: 6 }}>
              <PriceInfo />
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Wallet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default WalletIntro
