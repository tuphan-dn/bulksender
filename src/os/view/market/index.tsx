import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'antd'
import AppCategory from './appCategory'
import SeeAll from './seeAll'
import SearchEngine from './searchEngine'
import BannerTop from './bannerTop'
import BannerBottom from './bannerBottom'

import { setLoading } from 'os/store/search.reducer'
import { RootDispatch, RootState } from 'os/store'

let searching: NodeJS.Timeout

const Market = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { value } = useSelector((state: RootState) => state.search)
  const { register } = useSelector((state: RootState) => state.page)
  const [seeAll, setSeeAll] = useState<{
    visible: boolean
    appIds: AppIds
    title: string
  }>({
    visible: false,
    appIds: [],
    title: '',
  })

  const onSearch = useCallback(async () => {
    const engine = new SearchEngine(register)
    await dispatch(setLoading(true))
    if (searching) clearTimeout(searching)
    if (!value) await dispatch(setLoading(false))

    searching = setTimeout(async () => {
      const appIds = engine.search(value)
      await setSeeAll({
        visible: !!value,
        appIds: appIds,
        title: 'Search Results',
      })
      await dispatch(setLoading(false))
      return window.scrollTo(0, 0)
    }, 1000)
  }, [value, dispatch, register])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  const onSeeAll = (appIds: AppIds, title: string) =>
    setSeeAll({ visible: true, appIds, title })

  const onBack = () => setSeeAll({ visible: false, appIds: [], title: '' })

  if (seeAll.visible) return <SeeAll {...seeAll} onBack={onBack} />
  return (
    <Row gutter={[16, 48]}>
      <Col span={24}>
        <BannerTop />
      </Col>
      <Col span={24}>
        <AppCategory
          onSeeAll={onSeeAll}
          title="Suggested for you"
          category="suggest"
        />
      </Col>
      <Col span={24}>
        <AppCategory
          onSeeAll={onSeeAll}
          title="Top dapps"
          category="top-dapps"
        />
      </Col>
      <Col span={24}>
        <AppCategory onSeeAll={onSeeAll} title="Other" category="other" />
      </Col>
      <Col span={24}>
        <BannerBottom />
      </Col>
    </Row>
  )
}

export default Market
