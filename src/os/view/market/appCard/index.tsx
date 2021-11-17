import { CSSProperties, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Card, Row, Skeleton } from 'antd'
import AppCardInfo from './appCardInfo'

import { RemoteStatic } from 'os/components/appLoader'
import { RootState } from 'os/store'

const AppCard = (props: { appId: string; style?: CSSProperties }) => {
  const { appId, style } = props
  const history = useHistory()
  const { register } = useSelector((state: RootState) => state.page)
  const appData = register[appId]

  const to = (appId: string) => history.push(`/store/${appId}`)

  const manifest = { url: appData?.url || '', scope: appId, module: './static' }

  return (
    <Suspense fallback={<Skeleton active />}>
      <RemoteStatic
        type="panel"
        manifest={manifest}
        render={(src) => (
          <Card
            style={{
              height: '100%',
              backgroundImage: `url(${src})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              cursor: 'pointer',
              overflow: 'hidden',
              boxShadow: 'none',
              ...style,
            }}
            bodyStyle={{ padding: 0, height: '100%' }}
            key={appId}
            onClick={() => to(appId)}
          >
            <Row align="bottom" style={{ height: '100%' }}>
              <AppCardInfo appId={appId} />
            </Row>
          </Card>
        )}
      />
    </Suspense>
  )
}

export default AppCard
