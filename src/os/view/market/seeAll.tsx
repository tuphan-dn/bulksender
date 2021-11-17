import { useEffect, useRef, useState } from 'react'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import AppCard from './appCard'

const SeeAll = ({
  title,
  appIds,
  onBack,
}: {
  title: string
  appIds: AppIds
  onBack: () => void
}) => {
  const ref = useRef(null)
  const [cardHeight, setCardHeight] = useState(0)

  useEffect(() => {
    setCardHeight(((ref?.current as any)?.offsetWidth - 24) * 0.75)
  }, [ref])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          icon={<IonIcon name="arrow-back-outline"></IonIcon>}
          onClick={onBack}
        >
          Back
        </Button>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}>{title}</Typography.Title>
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

export default SeeAll
