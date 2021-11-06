import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import numbro from 'numbro'

import { Row, Col, Typography, Tooltip, Space, Card } from 'antd'
import IonIcon from 'shared/ionicon'
import Wallet from '../../wallet'

import { explorer, shortenAddress } from 'shared/util'
import { RootState } from 'os/store'

const WalletIntro = () => {
  const { address, lamports } = useSelector((state: RootState) => state.wallet)

  const balance = numbro(utils.undecimalize(lamports, 9)).format('0.[00]')
  const explore = () => window.open(explorer(address), '_blank')

  if (!account.isAddress(address)) return <Fragment />
  return (
    <Card
      style={{
        backgroundColor: '#5D6CCF',
      }}
      bodyStyle={{ padding: 16 }}
      hoverable
    >
      <Row gutter={[8, 8]} align="middle">
        <Col span={24}>
          <Row gutter={[8, 8]} align="middle">
            <Col flex="auto">
              <Typography.Text style={{ color: '#BEC4EC' }}>
                <span style={{ color: '#03E1FF' }}>◎</span> SOL
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text
                onClick={explore}
                style={{ cursor: 'pointer', color: '#BEC4EC' }}
              >
                <Space>
                  {shortenAddress(address, 3, '...')}
                  <IonIcon name="open-outline" />
                </Space>
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} align="bottom">
            <Col flex="auto">
              <Tooltip
                placement="topLeft"
                title={`${utils.undecimalize(lamports, 9)} SOL`}
              >
                <Typography.Title level={3} style={{ color: '#E9E9EB' }}>
                  {balance}
                </Typography.Title>
              </Tooltip>
            </Col>
            <Col style={{ marginRight: -12 }}>
              <Wallet style={{ color: '#E9E9EB' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default WalletIntro
