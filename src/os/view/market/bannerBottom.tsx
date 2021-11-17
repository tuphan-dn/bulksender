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
          <Col md={12} xs={24} key={index}>
            <Card
              key={index}
              style={{
                height: '33vw',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${banner})`,
              }}
              bordered={false}
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default BannerBottom
