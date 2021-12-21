import { useSelector } from 'react-redux'

import { Col, Image, Row } from 'antd'
import { SwiperSlide } from 'swiper/react'
import { SwiperOs } from 'os/components/swiperOS'

import { RootState } from 'os/store'
import { MultiStaticLoader } from 'os/components/staticLoader'

import imgError from 'os/static/images/error-image.svg'
import { defaultImage } from 'app/static.app'

const PADDING = 24

const ScreenShot = ({ appId }: { appId: string }) => {
  const { width } = useSelector((state: RootState) => state.ui)

  const calculatePerCard = () => {
    if (width < 768) return 1
    return 2
  }
  const calculateHeightImage = () => {
    if (width > 991)
      return (3 * (((width - 39 - PADDING) / 2 - PADDING) / 2 - 12)) / 4
    if (width <= 767) return (3 * (width - 39 - PADDING - PADDING)) / 4
    return (3 * ((width - 39 - PADDING) / 2 - PADDING)) / 4
  }

  return (
    <Row gutter={[24, 24]} justify="center" className="app-detail-carousel">
      <Col span={24}>
        <MultiStaticLoader
          appId={appId}
          type="panels"
          defaultData={[imgError]}
          render={(data) => {
            if (data.length === 1) data.push(defaultImage)
            return (
              <SwiperOs slidesPerView={calculatePerCard()}>
                {data.map((src, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <Image
                        style={{ height: calculateHeightImage() }}
                        src={src}
                      />
                    </SwiperSlide>
                  )
                })}
              </SwiperOs>
            )
          }}
        />
      </Col>
    </Row>
  )
}

export default ScreenShot
