import { Col, Image, Row } from 'antd'
import { SwiperSlide } from 'swiper/react'

import { SwiperOs } from 'os/components/swiperOS'
import { useSelector } from 'react-redux'
import { RootState } from 'os/store'

const ScreenShot = ({ appId }: { appId: string }) => {
  const { width, infix } = useSelector((state: RootState) => state.ui)

  const xlHeight = ((width - 96) / 4) * (3 / 4)
  const lgHeight = ((width - 72) / 2) * (3 / 4)
  const mdHeight = ((width - 96) / 2) * (3 / 4)
  const smHeight = (width - 72) * (3 / 4)

  const calculatePerCard = () => {
    if (infix === 'xl' || infix === 'md' || infix === 'xxl') return 2
    return 1
  }

  const calculateCardHeight = () => {
    if (infix === 'xl' || infix === 'xxl') return xlHeight
    if (infix === 'lg') return lgHeight
    if (infix === 'md') return mdHeight
    return smHeight
  }

  return (
    <Row gutter={[24, 24]} justify="center" className="app-detail-carousel">
      <Col span={24}>
        <SwiperOs slidesPerView={calculatePerCard()}>
          {[1, 2, 3, 4].map((e, idx) => (
            <SwiperSlide key={idx}>
              <Image
                style={{
                  height: calculateCardHeight(),
                }}
                src={`https://source.unsplash.com/1600x90${idx}/?crypto`}
              />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}

export default ScreenShot
