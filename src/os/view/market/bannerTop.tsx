import { useSelector } from 'react-redux'

import { Card, Carousel } from 'antd'

import { RootState } from 'os/store'

import storePanel1 from 'os/static/images/store-panel1.png'
import storePanel2 from 'os/static/images/store-panel2.png'
import storePanel3 from 'os/static/images/store-panel3.png'

const PAGE_PADDING = 20
const PANELS = [storePanel1, storePanel2, storePanel3]

const BannerTop = () => {
  const {
    ui: { width },
  } = useSelector((state: RootState) => state)

  return (
    <Carousel>
      {PANELS.map((banner, index) => {
        return (
          <div key={index}>
            <Card
              style={{
                height: Math.min(1920 / 3, (width - PAGE_PADDING * 2) / 3),
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${banner})`,
                boxShadow: 'none',
              }}
              bordered={false}
            />
          </div>
        )
      })}
    </Carousel>
  )
}

export default BannerTop
