import { ReactNode } from 'react'

import { Grid } from 'antd'
import { Swiper } from 'swiper/react'
import { Navigation, SwiperOptions } from 'swiper'
import 'swiper/css/bundle'

import './index.os.less'

export const SwiperOs = ({
  children,
  ...rest
}: { children: ReactNode } & SwiperOptions) => {
  const { xs } = Grid.useBreakpoint()

  return (
    <Swiper
      slidesPerView={'auto'}
      lazy
      spaceBetween={24}
      modules={[Navigation]}
      navigation={!xs}
      {...rest}
    >
      {children}
    </Swiper>
  )
}
