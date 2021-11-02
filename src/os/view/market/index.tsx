import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'

import register from 'senhub.register'
import SearchEngine from './searchEngine'
import { RootDispatch, RootState } from 'os/store'
import { setLoading } from 'os/store/search.reducer'

let searching: ReturnType<typeof setTimeout> | undefined

const Market = () => {
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  const { value } = useSelector((state: RootState) => state.search)
  const [appIds, setAppIds] = useState<string[]>()

  const to = (appId: string) => history.push(`/store/${appId}`)

  const onSearch = useCallback(async () => {
    const engine = new SearchEngine(register)
    await dispatch(setLoading(true))
    if (searching) {
      clearTimeout(searching)
      searching = undefined
    }
    if (!value) {
      await setAppIds(undefined)
      await dispatch(setLoading(false))
    }
    searching = setTimeout(async () => {
      const appIds = engine.search(value)
      await setAppIds(appIds)
      await dispatch(setLoading(false))
      return window.scrollTo(0, 0)
    }, 1000)
  }, [value, dispatch])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  return (
    <Row gutter={[16, 24]}>
      {appIds?.length ? (
        <Col span={24}>
          <Typography.Title level={4} type="secondary">
            Search Results
          </Typography.Title>
        </Col>
      ) : null}
      {appIds?.map((appId) => (
        <Col key={appId}>
          <AppIcon appId={appId} onClick={() => to(appId)} />
        </Col>
      ))}
      <Col span={24}>
        <Typography.Title level={4} type="secondary">
          All applications
        </Typography.Title>
      </Col>
      {Object.keys(register).map((appId) => (
        <Col key={appId}>
          <AppIcon appId={appId} onClick={() => to(appId)} />
        </Col>
      ))}
    </Row>
  )
}

export default Market
