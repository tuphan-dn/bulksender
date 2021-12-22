import { Card, Carousel, Col, Image, Row, Space, Typography } from 'antd'

import LogoSenSwap from 'os/static/images/logo-senswap.png'

const WelcomeSlide = () => {
  return (
    <Card className="slide-container" hoverable={false} bordered={false}>
      <Carousel autoplay>
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <Row gutter={[24, 24]} justify="center">
              <Col>
                <Space direction="vertical" size={24} align="center">
                  <Image src={LogoSenSwap} preview={false} />
                  <Typography.Title level={1}>Sen Swap</Typography.Title>
                </Space>
              </Col>
              <Col span={24} style={{ textAlign: 'center' }}>
                SenSwap: An open liquidity protocol for token swap on Solana
                designed to remove technical barriers to bring AMM to more
                regular users. In SenSwap, the pool is no longer organized into
                two tokens. Now a trilogy pool, the protocol will automatically
                balance the deposit in the case of single-sided deposits
                (Simulated Single Exposure-SSE), and the native token, SNTR, ...
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </Card>
  )
}

export default WelcomeSlide
