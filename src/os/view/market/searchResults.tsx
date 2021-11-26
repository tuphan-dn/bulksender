import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Row, Col, Button, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import SearchEngine from './searchEngine'
import AppCard from './appCard'

import { setLoading, setValue } from 'os/store/search.reducer'
import { RootDispatch, RootState } from 'os/store'

let searching: NodeJS.Timeout

const SearchResult = ({ value }: { value: string }) => {
  const history = useHistory()
  const dispatch = useDispatch<RootDispatch>()
  const { register } = useSelector((state: RootState) => state.page)
  const [appIds, setAppIds] = useState<AppIds>([])

  const onSearch = useCallback(async () => {
    const engine = new SearchEngine(register)
    await dispatch(setLoading(true))

    if (searching) clearTimeout(searching)
    searching = setTimeout(async () => {
      const appIds = engine.search(value)
      setAppIds(appIds)
      await dispatch(setLoading(false))
      return window.scrollTo(0, 0)
    }, 500)
  }, [dispatch, register, value])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          size="small"
          icon={<IonIcon name="arrow-back-outline" />}
          style={{ marginLeft: -8 }}
          onClick={() => {
            history.push('/store')
            dispatch(setValue(''))
          }}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Typography.Title level={2}>Search Result</Typography.Title>
      </Col>

      {appIds.map((appId) => (
        <Col lg={6} md={8} sm={12} xs={24} key={appId}>
          <AppCard appId={appId} />
        </Col>
      ))}
    </Row>
  )
}

export default SearchResult
