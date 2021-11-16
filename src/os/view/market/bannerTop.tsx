import { useEffect, useState } from 'react'

import { Card, Carousel } from 'antd'

const BannerTop = () => {
  const [listBanner, setListBanner] = useState<string[]>([])

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
    <Carousel autoplay>
      {listBanner.map((banner, index) => {
        return (
          <div>
            <Card
              key={index}
              className="shadowed"
              style={{
                height: '33vw',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${banner})`,
              }}
              bordered={false}
            ></Card>
          </div>
        )
      })}
    </Carousel>
  )
}

export default BannerTop
