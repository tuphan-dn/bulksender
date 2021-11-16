import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SwiperSlide } from 'swiper/react'
import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import { SwiperOs } from 'os/components/swiperOS'
import AppCard from './appCard'

import { RootState } from 'os/store'

const AppCategory = ({
  title,
  category,
  onSeeAll,
}: {
  title: string
  category: string
  onSeeAll: (appIds: AppIds, title: string) => void
}) => {
  const { register } = useSelector((state: RootState) => state.page)
  const [appIds, setAppIds] = useState<AppIds>([])

  const fetchApps = useCallback(async () => {
    //TODO
    let appIds: AppIds = []
    for (let i = 0; i < 3; i++) {
      if (category) appIds = appIds.concat(Object.keys(register))
    }
    return setAppIds(appIds)
  }, [category, register])

  useEffect(() => {
    fetchApps()
  }, [fetchApps])

  return (
    <Row gutter={[20, 20]} align="bottom">
      {/* title */}
      <Col flex="auto">
        <Typography.Title level={4}>{title}</Typography.Title>
      </Col>
      {/* see all button*/}
      <Col>
        <Typography.Text type="danger">
          <Space size={2}>
            <Button
              danger
              style={{ padding: 0, height: 'auto', fontWeight: 300 }}
              type="text"
              onClick={() => onSeeAll(appIds, title)}
            >
              See all
            </Button>
            <IonIcon name="chevron-forward-outline" />
          </Space>
        </Typography.Text>
      </Col>
      {/* list app category */}
      <Col span={24}>
        <SwiperOs>
          {appIds.map((appId) => (
            <SwiperSlide
              style={{
                maxWidth: 334,
                width: '75vw',
                maxHeight: 251,
                height: 'calc(75vw * 0.75)',
              }}
            >
              <AppCard key={appId} appId={appId} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}
export default AppCategory
