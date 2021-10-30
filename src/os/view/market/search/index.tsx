import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Row, Col, Card, Input, Button, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import AppIcon from 'os/components/appIcon'

import register from 'senhub.register'
import SearchEngine from './engine'
import './style.less'

let searching: ReturnType<typeof setTimeout> | undefined

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [appIds, setAppIds] = useState<string[]>()

  const { search } = useLocation()
  const history = useHistory()

  const onSearch = useCallback(
    async (keywords: string) => {
      const engine = new SearchEngine(register)
      await setKeywords(keywords)
      await setLoading(true)
      if (searching) {
        clearTimeout(searching)
        searching = undefined
      }
      if (!keywords) {
        await setAppIds(undefined)
        await setLoading(false)
        return history.push('/store')
      }
      searching = setTimeout(async () => {
        const appIds = engine.search(keywords)
        await setAppIds(appIds)
        await setLoading(false)
        return window.scrollTo(0, 0)
      }, 1000)
    },
    [history],
  )

  const parseParams = useCallback(async () => {
    const params = new URLSearchParams(search) || {}
    const keywords = params.get('search') || ''
    await onSearch(keywords)
  }, [search, onSearch])

  const to = (appId = '') => history.push(`/store/${encodeURI(appId)}`)

  useEffect(() => {
    parseParams()
  }, [parseParams])

  return (
    <Card
      className={`search-card ${keywords ? 'active' : 'passive'}`}
      bodyStyle={{ padding: 12 }}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Input
            placeholder="Search"
            value={keywords}
            size="small"
            bordered={false}
            suffix={
              keywords ? (
                <Button
                  type="text"
                  style={{ marginRight: -7 }}
                  icon={<IonIcon name="close-circle-outline" />}
                  loading={loading}
                  onClick={() => onSearch('')}
                />
              ) : (
                <Button
                  type="text"
                  style={{ marginRight: -7 }}
                  icon={<IonIcon name="search-outline" />}
                  loading={loading}
                />
              )
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearch(e.target.value || '')
            }
          />
        </Col>
        {appIds && !appIds.length ? (
          <Col span={24}>
            <Typography.Text style={{ marginLeft: 8 }} type="secondary">
              No Result
            </Typography.Text>
          </Col>
        ) : null}
        {appIds?.map((appId) => (
          <Col key={appId}>
            <AppIcon appId={appId} onClick={() => to(appId)} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default Search
