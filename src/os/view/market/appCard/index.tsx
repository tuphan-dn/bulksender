import { CSSProperties, Suspense, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import { Card, Col, Row, Skeleton } from 'antd'
import AppCardInfo from './appCardInfo'

import { StaticLoader } from 'os/components/appLoader'

const AppCard = ({
  appId,
  style = {},
}: {
  appId: string
  style?: CSSProperties
}) => {
  const history = useHistory()
  const [cardHeight, setCardHeight] = useState(0)
  const ref = useRef(null)

  const to = (appId: string) => history.push(`/store/${appId}`)

  useEffect(() => {
    setCardHeight(((ref?.current as any)?.offsetWidth - 24) * 0.75)
  }, [ref])

  return (
    <Row ref={ref}>
      <Col span={24}>
        <Suspense fallback={<Skeleton active />}>
          <StaticLoader
            appId={appId}
            type="panel"
            render={(src) => (
              <Card
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  ...style,
                }}
                bodyStyle={{ padding: 0 }}
                key={appId}
                onClick={() => to(appId)}
              >
                <Row align="bottom" style={{ height: cardHeight }}>
                  <AppCardInfo appId={appId} />
                </Row>
              </Card>
            )}
          />
        </Suspense>
      </Col>
    </Row>
  )
}

export default AppCard
