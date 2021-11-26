import { useHistory } from 'react-router'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import AppCard from '../appCard'

import { CategoryOptions, useAppCategory } from './hooks'

const CategorySeeAll = (options: CategoryOptions) => {
  const history = useHistory()
  const { title, appIds } = useAppCategory(options)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          size="small"
          icon={<IonIcon name="arrow-back-outline" />}
          style={{ marginLeft: -8 }}
          onClick={() => history.push('/store')}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Typography.Title level={2} style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography.Title>
      </Col>
      {appIds.map((appId) => (
        <Col lg={6} md={8} sm={12} xs={24} key={appId}>
          <AppCard appId={appId} />
        </Col>
      ))}
    </Row>
  )
}

export default CategorySeeAll
