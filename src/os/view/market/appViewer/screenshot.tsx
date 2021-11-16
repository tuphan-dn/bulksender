import { Col, Image, Row, Grid } from 'antd'
import { SwiperSlide } from 'swiper/react'

import { SwiperOs } from 'os/components/swiperOs'
import { useSelector } from 'react-redux'
import { RootState } from 'os/store'

const ScreenShot = ({ appId }: { appId: string }) => {
  const { width } = useSelector((state: RootState) => state.ui)
  const { xl, lg, md } = Grid.useBreakpoint()

  const lgHeight = ((width - 96) / 4) * (3 / 4)
  const lgHeigt = ((width - 72) / 2) * (3 / 4)
  const mdHeight = ((width - 96) / 2) * (3 / 4)
  const smHeight = (width - 72) * (3 / 4)

  const calculatePerCard = () => {
    if (xl) return 2
    if (lg) return 1
    if (md) return 2
    return 1
  }

  const calculateCardHeight = () => {
    if (xl) return lgHeight
    if (lg) return lgHeigt
    if (md) return mdHeight
    return smHeight
  }

  return (
    <Row gutter={[24, 24]} justify="center" className="app-detail-carousel">
      <Col span={24}>
        <SwiperOs slidesPerView={calculatePerCard()}>
          {[1, 2, 3, 4].map((e, idx) => (
            <SwiperSlide>
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
