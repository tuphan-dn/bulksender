import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Row, Col, Button, Typography } from 'antd'
import SearchEngine from './searchEngine'

import { setLoading } from 'os/store/search.reducer'
import { RootDispatch, RootState } from 'os/store'
import IonIcon from 'shared/ionicon'
import AppCard from './appCard'

let searching: NodeJS.Timeout

const SearchResult = ({ value }: { value: string }) => {
  const history = useHistory()
  const dispatch = useDispatch<RootDispatch>()
  const ref = useRef(null)
  const { register } = useSelector((state: RootState) => state.page)
  const [appIds, setAppIds] = useState<AppIds>([])
  const [cardHeight, setCardHeight] = useState(0)

  useEffect(() => {
    setCardHeight(((ref?.current as any)?.offsetWidth - 24) * 0.75)
  }, [ref])

  const onSearch = useCallback(async () => {
    if (!value) {
      await dispatch(setLoading(false))
      return history.push('/store')
    }
    const engine = new SearchEngine(register)
    await dispatch(setLoading(true))

    if (searching) clearTimeout(searching)
    searching = setTimeout(async () => {
      const appIds = engine.search(value)
      setAppIds(appIds)
      await dispatch(setLoading(false))
      return window.scrollTo(0, 0)
    }, 500)
  }, [dispatch, history, register, value])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          size="small"
          icon={<IonIcon name="arrow-back-outline"></IonIcon>}
          onClick={() => history.push('/store')}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Typography.Title level={2}>Search Result</Typography.Title>
      </Col>

      {appIds.map((appId) => (
        <Col lg={6} md={8} sm={12} xs={24} ref={ref} key={appId}>
          <AppCard
            appId={appId}
            style={{
              height: cardHeight,
            }}
          />
        </Col>
      ))}
    </Row>
  )
}

export default SearchResult
