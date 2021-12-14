import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { Row, Col } from 'antd'
import BannerTop from './bannerTop'
import BannerBottom from './bannerBottom'
import SearchResult from './searchResults'
import AppCategorySeeAll from './appCategory/seeAll'
import AppCategorySlice from './appCategory/slice'

import { RootState } from 'os/store'

const CATEGORIES = ['dapps', 'solana']

const Market = () => {
  const { search } = useLocation()
  const { value } = useSelector((state: RootState) => state.search)
  const { register } = useSelector((state: RootState) => state.page)

  const tags = useMemo(() => {
    let tags: string[] = []
    for (const appId in register) {
      const newTags = register[appId]?.tags || []
      // Remove duplicate elements
      tags = Array.from(new Set([...tags, ...newTags]))
    }
    return CATEGORIES.filter((category) => tags.includes(category))
  }, [register])

  const searchLocation = useMemo(() => new URLSearchParams(search), [search])
  const category = searchLocation.get('category')

  if (value) return <SearchResult value={value} />
  if (category) return <AppCategorySeeAll category={category} />
  return (
    <Row gutter={[16, 48]} justify="center">
      <Col span={24} style={{ maxWidth: 1920, width: '100%' }}>
        <Row gutter={[16, 48]}>
          <Col span={24}>
            <BannerTop />
          </Col>
          {tags.map((tag) => (
            <Col span={24} key={tag}>
              <AppCategorySlice category={tag} />
            </Col>
          ))}
          <Col span={24}>
            <AppCategorySlice category="others" />
          </Col>
          <Col span={24}>
            <BannerBottom />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Market
