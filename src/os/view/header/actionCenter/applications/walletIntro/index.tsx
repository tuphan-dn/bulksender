import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import numbro from 'numbro'

import { explorer, shortenAddress, asyncWait } from 'shared/util'
import { RootState } from 'os/store'
import { fetchCGK } from 'shared/helper'

import { Row, Col, Tooltip, Space, Card, Typography } from 'antd'
import Wallet from '../../../wallet'
import CardIcon from './cardIcon'
import PriceChange from './priceChange'
import { QR } from './QRcode'
import './index.less'

const CARD_TEXT_STYLE = { color: '#BEC4EC', fontSize: 12 }
const CARD_TITLE_STYLE = { color: '#E9E9EB', fontWeight: 700 }

const WalletIntro = () => {
  const { address, lamports } = useSelector((state: RootState) => state.wallet)
  const [copied, setCopied] = useState(false)
  const [isHiddenBalance, setIsHiddenBalance] = useState(false)
  const [cgkData, setCgkData] = useState<CgkData>()

  const balance = numbro(utils.undecimalize(lamports, 9)).format('0.[000]')
  const balanceValue = useMemo(() => {
    if (!cgkData) return 0
    return numbro(Number(balance) * cgkData.price).format('0,0.[000]')
  }, [balance, cgkData])

  const explore = () => window.open(explorer(address), '_blank')

  useEffect(() => {
    ;(async () => {
      const cgkData = await fetchCGK('solana')
      setCgkData(cgkData)
    })()
  }, [])

  const onCopy = async () => {
    setCopied(true)
    navigator.clipboard.writeText(address)
    await asyncWait(1500)
    setCopied(false)
  }

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
                  <Typography.Text style={CARD_TEXT_STYLE}>SOL</Typography.Text>
                  <CardIcon
                    name={`eye${isHiddenBalance ? '-off-' : '-'}outline`}
                    onClick={() => setIsHiddenBalance(!isHiddenBalance)}
                  />
                </Space>
              </Tooltip>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Typography.Text style={CARD_TEXT_STYLE}>
                Wallet address
              </Typography.Text>
            </Col>
            <Col span={12}>
              <Space direction="vertical" size={0}>
                <Typography.Title level={3} style={CARD_TITLE_STYLE}>
                  {!isHiddenBalance ? balance : '******'}
                </Typography.Title>
                <Typography.Text style={{ ...CARD_TEXT_STYLE, fontSize: 14 }}>
                  {!isHiddenBalance ? `~ $${balanceValue}` : 'ಠ_ಠ'}
                </Typography.Text>
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: 'end' }}>
              <Space size={10}>
                <Typography.Text style={{ color: '#E9E9EB' }} onClick={explore}>
                  {shortenAddress(address, 3, '...')}
                </Typography.Text>

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
              <Typography.Text style={CARD_TEXT_STYLE}>
                24h SOL price
              </Typography.Text>
            </Col>

            <Col span={12} style={{ paddingLeft: 6 }}>
              <PriceChange
                price={cgkData?.price}
                priceChange={cgkData?.priceChange}
              />
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
