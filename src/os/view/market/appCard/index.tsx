import { CSSProperties, Suspense, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Card, Col, Row, Skeleton } from 'antd'
import AppCardInfo from './appCardInfo'

import { RemoteStatic } from 'os/components/appLoader'
import { RootState } from 'os/store'

const AppCard = ({
  appId,
  style,
}: {
  appId: string
  style?: CSSProperties
}) => {
  const history = useHistory()
  const { register } = useSelector((state: RootState) => state.page)
  const [cardHeight, setCardHeight] = useState(0)
  const ref = useRef(null)

  const to = (appId: string) => history.push(`/store/${appId}`)

  useEffect(() => {
    setCardHeight(((ref?.current as any)?.offsetWidth - 24) * 0.75)
  }, [ref])

  const appData = register[appId]
  const manifest = { url: appData?.url || '', scope: appId, module: './static' }
  return (
    <Row ref={ref}>
      <Col span={24}>
        <Suspense fallback={<Skeleton active />}>
          <RemoteStatic
            type="panel"
            manifest={manifest}
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
