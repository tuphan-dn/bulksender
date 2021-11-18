import { useSelector } from 'react-redux'

import { Col, Image, Row } from 'antd'
import { SwiperSlide } from 'swiper/react'
import { SwiperOs } from 'os/components/swiperOS'

import { RootState } from 'os/store'
import { StaticMultiLoader } from 'os/components/appLoader'

import ERROR_IMG from 'os/static/images/error-image.svg'

const ScreenShot = ({ appId }: { appId: string }) => {
  const { width } = useSelector((state: RootState) => state.ui)

  const calculatePerCard = (data: string[]) => {
    if (data.length < 2 || width < 768) return 1
    return 2
  }

  return (
    <Row gutter={[24, 24]} justify="center" className="app-detail-carousel">
      <Col span={24}>
        <StaticMultiLoader
          appId={appId}
          type="panel"
          render={(data) =>
            !data?.length ? (
              <Image style={{ height: 252 }} src={ERROR_IMG} />
            ) : (
              <SwiperOs slidesPerView={calculatePerCard(data)}>
                {data.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <Image style={{ height: 252 }} src={src} />
                  </SwiperSlide>
                ))}
              </SwiperOs>
            )
          }
        />
      </Col>
    </Row>
  )
}

export default ScreenShot
