import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import numbro from 'numbro'

import { Row, Col, Typography, Tooltip, Space } from 'antd'
import IonIcon from 'shared/ionicon'

import { explorer, shortenAddress } from 'shared/util'
import { RootState } from 'os/store'

const WalletIntro = () => {
  const { address, lamports } = useSelector((state: RootState) => state.wallet)

  const balance = numbro(utils.undecimalize(lamports, 9)).format('0.[00]')

  if (!account.isAddress(address)) return <Fragment />
  return (
    <Row gutter={[16, 16]} align="middle" wrap={false}>
      <Col flex="auto">
        <Tooltip title={`${utils.undecimalize(lamports, 9)} SOL`}>
          <Typography.Text>
            {balance} <span style={{ color: '#03E1FF' }}>◎</span>
          </Typography.Text>
        </Tooltip>
      </Col>
      <Col>
        <Space>
          <Typography.Link
            style={{ color: 'inherit' }}
            href={explorer(address)}
            target="_blank"
          >
            {shortenAddress(address, 3, '...')}
          </Typography.Link>
          <IonIcon name="open-outline" />
        </Space>
      </Col>
    </Row>
  )
}

export default WalletIntro
