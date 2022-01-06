import { useSelector } from 'react-redux'

import { Card, Col, Row } from 'antd'

import { RootState } from 'os/store'

import storePanel4 from 'os/static/images/store-panel4.png'
import storePanel5 from 'os/static/images/store-panel5.png'

const PAGE_PADDING = 20
const ELEMENT_PADDING = 24
const HEIGHT_RATIO = 1.777777
const PANELS = [
  {
    src: storePanel4,
    redirect:
      'https://sentre.medium.com/sentre-to-change-its-token-name-to-sntr-532af58fab31',
  },
  {
    src: storePanel5,
    redirect:
      'https://sentre.medium.com/sentre-to-repay-users-with-a-retroactive-airdrop-event-f7fbb70ae4ca',
  },
]

const BannerBottom = () => {
  const {
    ui: { width },
  } = useSelector((state: RootState) => state)

  const bannerHeightRatio = width < 768 ? HEIGHT_RATIO : HEIGHT_RATIO * 2
  const bannerWidth =
    width < 768 ? width - PAGE_PADDING : width - PAGE_PADDING - ELEMENT_PADDING

  return (
    <Row gutter={[24, 16]}>
      {PANELS.map((item, index) => {
        return (
          <Col md={12} xs={24} key={index}>
            <Card
              style={{
                height: Math.min(
                  (1920 - PAGE_PADDING - ELEMENT_PADDING) / HEIGHT_RATIO / 2,
                  bannerWidth / bannerHeightRatio,
                ),
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${item.src})`,
                cursor: 'pointer',
              }}
              bordered={false}
              onClick={() => window.open(item.redirect, '_blank')}
            />
          </Col>
        )
      })}
    </Row>
  )
}

export default BannerBottom
