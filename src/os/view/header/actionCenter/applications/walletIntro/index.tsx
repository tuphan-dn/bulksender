import { Fragment, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import numbro from 'numbro'

import { Row, Col, Tooltip, Space, Card } from 'antd'
import Wallet from '../../../wallet'
import CardIcon from './cardIcon'
import CardText from './cardText'

import { explorer, shortenAddress, asyncWait } from 'shared/util'
import { RootState } from 'os/store'
import './index.less'
import PriceChange from './priceChange'
import { QR } from './QRcode'
import { fetchCGK } from 'shared/helper'

const WalletIntro = () => {
  const { address, lamports } = useSelector((state: RootState) => state.wallet)
  const [copied, setCopied] = useState(false)
  const [isHiddenBalance, setIsHiddenBalance] = useState(false)
  const [price, setPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)

  const balance = numbro(utils.undecimalize(lamports, 9)).format('0.[000]')
  const explore = () => window.open(explorer(address), '_blank')
  const balanceRate = useMemo(() => {
    return numbro(Number(balance) * price).format('0,0.[000]')
  }, [balance, price])

  useEffect(() => {
    ;(async () => {
      const { price, priceChange } = (await fetchCGK('solana')) || {}
      setPrice(price || 0)
      setPriceChange(priceChange || 0)
    })()
  }, [])

  const onCopy = async () => {
    setCopied(true)
    navigator.clipboard.writeText(address)
    await asyncWait(1500)
    setCopied(false)
  }

  if (!account.isAddress(address)) return <Fragment />

  return (
    <Card className="card-wallet" bordered={false}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row gutter={[4, 4]}>
            <Col span={12}>
              <Tooltip
                placement="topLeft"
                title={`${utils.undecimalize(lamports, 9)} SOL`}
              >
                <Space size={6}>
                  <span style={{ color: '#03E1FF' }}>◎</span>
                  <CardText fontSize={12} color="#BEC4EC">
                    SOL
                  </CardText>
                  <CardIcon
                    name={`eye${isHiddenBalance ? '-off-' : '-'}outline`}
                    onClick={() => setIsHiddenBalance(!isHiddenBalance)}
                  />
                </Space>
              </Tooltip>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <CardText color="#BEC4EC">Wallet address</CardText>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size={0}>
                <CardText level={3} color="#E9E9EB">
                  {!isHiddenBalance ? balance : '******'}
                </CardText>
                <CardText color="#BEC4EC">
                  {!isHiddenBalance ? `~ $${balanceRate}` : 'ಠ_ಠ'}
                </CardText>
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Space size={10}>
                <CardText type="secondary" onClick={explore}>
                  {shortenAddress(address, 3, '...')}
                </CardText>
                <Tooltip placement="topLeft" title="Copied" visible={copied}>
                  <CardIcon name="copy-outline" onClick={onCopy} />
                </Tooltip>
                <QR address={address} />
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 4]} align="middle">
            <Col span={24}>
              <CardText color="#BEC4EC" fontSize={12}>
                24h SOL price
              </CardText>
            </Col>

            <Col span={12} style={{ paddingLeft: 6 }}>
              <PriceChange price={price} priceChange={priceChange} />
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
