import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintName, MintSymbol } from 'shared/antd/mint'
import { numeric } from 'shared/util'
import CardContent from './cardContent'
import './style.less'

type PoolCardProps = { rank: number }

const PoolCard = ({ rank }: PoolCardProps) => {
  return (
    <Card bordered={false} className={`pool-card top-${rank}`}>
      <Row gutter={[24, 24]} align="middle">
        <Col>
          <Typography.Title level={5}>{rank}</Typography.Title>
        </Col>
        <Col>
          <MintAvatar
            mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ"
            size={48}
          />
        </Col>
        <Col span={4}>
          <Space direction="vertical">
            <Typography.Title level={5}>
              <MintName mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ" />
            </Typography.Title>
            <Typography.Title level={5} className="symbol">
              <MintSymbol mintAddress="5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ" />
            </Typography.Title>
          </Space>
        </Col>

        <Col span={3}>
          <CardContent
            label="APY"
            value={numeric(Math.random()).format('0.00[00]%')}
          />
        </Col>
        <Col span={4}>
          <CardContent
            label="Total Value Locked"
            value={numeric(Math.random() * 100000).format('0,0.00[00]')}
            mintAddress="2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj"
          />
        </Col>
        <Col span={4}>
          <CardContent
            label="Your Liquidity"
            value={numeric(Math.random() * 100000).format('0,0.00[00]')}
            mintAddress="2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj"
          />
        </Col>
        <Col span={4}>
          <CardContent
            label="Your Liquidity"
            value={numeric(Math.random() * 100000).format('0,0.00[00]')}
            mintAddress="2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj"
          />
        </Col>
        <Col>
          <Button
            type="text"
            style={{ padding: 0, background: 'transparent' }}
            onClick={() => {}}
          >
            <IonIcon name="arrow-forward-outline" style={{ fontSize: 32 }} />
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default PoolCard
