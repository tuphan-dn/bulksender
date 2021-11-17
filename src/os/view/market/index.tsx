import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { Row, Col } from 'antd'
import BannerTop from './bannerTop'
import BannerBottom from './bannerBottom'
import AppCategorySeeAll from './appCategory/seeAll'
import AppCategorySlice from './appCategory/slice'

import { RootState } from 'os/store'
import SearchResult from './searchResults'

const Market = () => {
  const { search } = useLocation()
  const { value } = useSelector((state: RootState) => state.search)

  const searchLocation = useMemo(() => new URLSearchParams(search), [search])
  const category = searchLocation.get('category')

  if (value) return <SearchResult value={value} />
  if (category) return <AppCategorySeeAll category={category} />
  return (
    <Row gutter={[16, 48]}>
      <Col span={24}>
        <BannerTop />
      </Col>
      <Col span={24}>
        <AppCategorySlice category="suggest" />
      </Col>
      <Col span={24}>
        <AppCategorySlice category="top-dapps" />
      </Col>
      <Col span={24}>
        <AppCategorySlice category="other" />
      </Col>
      <Col span={24}>
        <BannerBottom />
      </Col>
    </Row>
  )
}

export default Market
