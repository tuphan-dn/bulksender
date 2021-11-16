import { useState, useEffect } from 'react'

import { Card, Col, Row } from 'antd'

const BannerBottom = () => {
  const [listBanner, setListBanner] = useState<string[]>([])

  const fetchListBanner = async () => {
    //TODO fetch:
    setListBanner([
      'https://coin68.com/wp-content/uploads/2021/10/Sentre-Liquidity-Flow.jpg',
      'https://source.unsplash.com/1600x902/?crypto',
    ])
  }

  useEffect(() => {
    fetchListBanner()
  }, [])

  return (
    <Row gutter={[24, 16]}>
      {listBanner.map((banner, index) => {
        return (
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              key={index}
              className="shadowed"
              style={{
                height: '33vw',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${banner})`,
              }}
              bordered={false}
            ></Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default BannerBottom
