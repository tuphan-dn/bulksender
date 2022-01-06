import { Fragment } from 'react'

import { Card, Carousel, Col, Image, Row, Space, Typography } from 'antd'

import { DataSlice } from './dataSlice'

const WelcomeSlide = () => {
  return (
    <Card className="slide-container" hoverable={false} bordered={false}>
      <Carousel autoplay>
        {DataSlice.map(({ title, logo, content }) => (
          <Fragment key={title}>
            <Row gutter={[24, 24]} justify="center">
              <Col>
                <Space direction="vertical" size={24} align="center">
                  <Image src={logo} preview={false} />
                  <Typography.Title level={1}>{title}</Typography.Title>
                </Space>
              </Col>
              <Col span={24} style={{ textAlign: 'center' }}>
                {content}
              </Col>
            </Row>
          </Fragment>
        ))}
      </Carousel>
    </Card>
  )
}

export default WelcomeSlide
