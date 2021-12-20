import { useState, useEffect } from 'react'

import { Card, Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from 'os/store'

const PAGE_PADDING = 20
const ELEMENT_PADDING = 24
const HEIGHT_RATIO = 1.94

const BannerBottom = () => {
  const [listBanner, setListBanner] = useState<string[]>([])
  const { width } = useSelector((state: RootState) => state.ui)

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

  const bannerHeightRatio = width < 768 ? HEIGHT_RATIO : HEIGHT_RATIO * 2
  const bannerWidth =
    width < 768
      ? width - PAGE_PADDING * 2
      : width - PAGE_PADDING * 2 - ELEMENT_PADDING

  return (
    <Row gutter={[24, 16]}>
      {listBanner.map((banner, index) => {
        return (
          <Col md={12} xs={24} key={index}>
            <Card
              key={index}
              style={{
                height: Math.min(
                  (1920 - PAGE_PADDING - ELEMENT_PADDING) / HEIGHT_RATIO / 2,
                  bannerWidth / bannerHeightRatio,
                ),
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
