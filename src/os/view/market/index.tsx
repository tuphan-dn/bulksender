import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'

import { Row, Col } from 'antd'
import BannerTop from './bannerTop'
import BannerBottom from './bannerBottom'
import AppCategorySeeAll from './appCategory/seeAll'
import AppCategorySlice from './appCategory/slice'

import { setLoading } from 'os/store/search.reducer'
import { RootDispatch, RootState } from 'os/store'
import SearchResult from './searchResults'

let canSearch = false

const Market = () => {
  const history = useHistory()
  const { search } = useLocation()
  const dispatch = useDispatch<RootDispatch>()
  const { value } = useSelector((state: RootState) => state.search)

  const searchLocation = useMemo(() => new URLSearchParams(search), [search])
  const searchValue = searchLocation.get('search')
  const category = searchLocation.get('category')

  const onSearch = useCallback(async () => {
    // searchable only after user change value
    if (value) canSearch = true
    if (!canSearch) return

    if (!value) {
      dispatch(setLoading(false))
      return history.push('/store')
    }
    return history.push('/store?search=' + value)
  }, [dispatch, history, value])
  useEffect(() => {
    onSearch()
  }, [onSearch])

  if (searchValue) return <SearchResult />
  if (category) return <AppCategorySeeAll />
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
