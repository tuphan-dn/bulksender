import { ReactNode } from 'react'
import { Swiper } from 'swiper/react'
import { Navigation, SwiperOptions } from 'swiper'
import 'swiper/css/bundle'

export const SwiperOs = ({
  children,
  ...rest
}: { children: ReactNode } & SwiperOptions) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      lazy
      spaceBetween={24}
      modules={[Navigation]}
      navigation
      {...rest}
    >
      {children}
    </Swiper>
  )
}
