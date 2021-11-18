import { useHistory } from 'react-router'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import AppCard from '../appCard'

import { useAppCategory } from './hooks'

const CategorySeeAll = ({ category }: { category: string }) => {
  const history = useHistory()
  const { title, appIds } = useAppCategory({ category })

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
        <Typography.Title level={2}>{title}</Typography.Title>
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
