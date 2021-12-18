import { useSelector } from 'react-redux'

import { Col, Image, Row } from 'antd'
import { SwiperSlide } from 'swiper/react'
import { SwiperOs } from 'os/components/swiperOS'

import { RootState } from 'os/store'
import { MultiStaticLoader } from 'os/components/staticLoader'

import imgError from 'os/static/images/error-image.svg'
import { defaultImage } from 'app/static.app'

const ScreenShot = ({ appId }: { appId: string }) => {
  const { width } = useSelector((state: RootState) => state.ui)

  const calculatePerCard = () => {
    if (width < 768) return 1
    return 2
  }
  const calculateHeightImage = () => {
    let height = 0
    if (width > 991) {
      height = (3 * (((width - 39 - 24) / 2 - 24) / 2 - 12)) / 4
    }
    if (width <= 991) {
      height = (3 * ((width - 39 - 24) / 2 - 24)) / 4
    }
    if (width <= 767) {
      height = (3 * (width - 39 - 24 - 24)) / 4
      return height
    }
    return height
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
