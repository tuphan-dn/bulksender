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
    <Card bodyStyle={{ padding: 16 }} hoverable>
      <Row gutter={[16, 16]} align="middle">
        <Col flex="auto">
          <Tooltip title={`${utils.undecimalize(lamports, 9)} SOL`}>
            <Typography.Title level={3}>
              {balance} <span style={{ color: '#03E1FF' }}>◎</span>
            </Typography.Title>
          </Tooltip>
        </Col>
        <Col>
          <Typography.Title
            level={5}
            type="secondary"
            onClick={explore}
            style={{ cursor: 'pointer' }}
          >
            <Space>
              {shortenAddress(address, 3, '...')}
              <IonIcon name="open-outline" />
            </Space>
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Wallet />
        </Col>
      </Row>
    </Card>
  )
}

export default WalletIntro
