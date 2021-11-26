import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Card, Carousel } from 'antd'

import { RootState } from 'os/store'

const PAGE_PADDING = 20

const BannerTop = () => {
  const [listBanner, setListBanner] = useState<string[]>([])
  const { width } = useSelector((state: RootState) => state.ui)

  const fetchListBanner = async () => {
    //TODO fetch:
    setListBanner([
      'https://coin68.com/wp-content/uploads/2021/10/Sentre-Liquidity-Flow.jpg',
      'https://source.unsplash.com/1600x902/?crypto',
      'https://source.unsplash.com/1600x901/?crypto',
    ])
  }

  useEffect(() => {
    fetchListBanner()
  }, [])

  return (
    <Carousel>
      {listBanner.map((banner, index) => {
        return (
          <div key={index}>
            <Card
              style={{
                height: Math.min(1440 / 3, (width - PAGE_PADDING * 2) / 3),
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
