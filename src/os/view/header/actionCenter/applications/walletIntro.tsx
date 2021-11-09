import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import numbro from 'numbro'

import { Row, Col, Typography, Tooltip, Space, Card } from 'antd'
import IonIcon from 'shared/ionicon'
import Wallet from '../../wallet'

import { explorer, shortenAddress } from 'shared/util'
import { RootState } from 'os/store'
import CardImg from 'os/static/images/card-bg.png'

const WalletIntro = () => {
  const { address, lamports } = useSelector((state: RootState) => state.wallet)

  const balance = numbro(utils.undecimalize(lamports, 9)).format('0.[000]')
  const explore = () => window.open(explorer(address), '_blank')

  if (!account.isAddress(address)) return <Fragment />
  return (
    <Card
      bodyStyle={{ padding: 16 }}
      hoverable
      style={{
        backgroundImage: `url(${CardImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundOrigin: 'border-box',
      }}
    >
      <Row gutter={[4, 4]}>
        <Col span={12}>
          <Tooltip
            placement="topLeft"
            title={`${utils.undecimalize(lamports, 9)} SOL`}
          >
            <Space size={6}>
              <span style={{ color: '#03E1FF' }}>◎</span>
              <Typography.Text style={{ color: '#BEC4EC' }}>
                SOL
              </Typography.Text>
              <Typography.Text style={{ color: '#BEC4EC' }}>
                <IonIcon name="eye-outline" />
              </Typography.Text>
            </Space>
          </Tooltip>
        </Col>
        <Col span={12} style={{ textAlign: 'end' }}>
          <Typography.Text style={{ color: '#BEC4EC' }}>
            Wallet address
          </Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Title level={3} style={{ color: '#E9E9EB' }}>
            {balance}
          </Typography.Title>
          <Typography.Text style={{ color: '#BEC4EC' }}>
            ~ $3746.09
          </Typography.Text>
        </Col>
        <Col span={12} style={{ textAlign: 'end' }}>
          <Space>
            <Typography.Text
              type="secondary"
              onClick={explore}
              style={{ cursor: 'pointer', color: '#BEC4EC' }}
            >
              {shortenAddress(address, 3, '...')}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              onClick={explore}
              style={{ cursor: 'pointer', color: '#BEC4EC' }}
            >
              <IonIcon name="open-outline" />
            </Typography.Text>
            <Typography.Text
              type="secondary"
              onClick={explore}
              style={{ cursor: 'pointer', color: '#BEC4EC' }}
            >
              <IonIcon name="copy-outline" />
            </Typography.Text>
          </Space>
        </Col>

        <Col span={24}>
          <Typography.Text type="secondary" style={{ color: '#BEC4EC' }}>
            24h SOL price
          </Typography.Text>
        </Col>

        <Col span={12}>
          <Typography.Text style={{ color: '#16FB48' }}>
            <IonIcon name="arrow-up-outline" />
          </Typography.Text>

          <Typography.Text style={{ color: '#16FB48' }}>
            $15.5/2..9
          </Typography.Text>
        </Col>
        <Col span={12} style={{ textAlign: 'end' }}>
          <Wallet />
        </Col>
      </Row>
    </Card>
  )
}

export default WalletIntro
