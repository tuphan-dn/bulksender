import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

import AppCard from '../appCard'
import { SwiperOs } from 'os/components/swiperOS'
import IonIcon from 'shared/ionicon'
import { SwiperSlide } from 'swiper/react'
import { Button, Col, Row, Typography } from 'antd'

import { CategoryOptions, useAppCategory } from './hooks'
import { setValue } from 'os/store/search.reducer'

const AppCategorySlice = ({
  seeAll = true,
  ...options
}: { seeAll?: boolean } & CategoryOptions) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title, appIds } = useAppCategory(options)

  //not displayed category if no application exists
  if (!appIds.length) return null

  return (
    <Row gutter={[20, 20]} align="bottom">
      {/* title */}
      <Col flex="auto">
        <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography.Title>
      </Col>
      {/* see all button*/}
      {seeAll && (
        <Col>
          <Typography.Text type="danger">
            <Button
              size="small"
              type="text"
              onClick={() => {
                dispatch(setValue(''))
                history.push({
                  pathname: '/store',
                  search: `?category=${options.category}`,
                })
              }}
              className="btn-see-all"
            >
              See all
              <IonIcon name="chevron-forward-outline" />
            </Button>
          </Typography.Text>
        </Col>
      )}
      {/* list app in the category */}
      <Col span={24}>
        <SwiperOs>
          {appIds.map((appId) => (
            <SwiperSlide
              key={appId}
              style={{
                maxWidth: 334,
                width: '75vw',
              }}
            >
              <AppCard appId={appId} />
            </SwiperSlide>
          ))}
        </SwiperOs>
      </Col>
    </Row>
  )
}
export default AppCategorySlice
