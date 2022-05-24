import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import { Card, Col, Row } from 'antd'
import AppCardInfo from './appCardInfo'

import { MultiStaticLoader } from 'os/components/staticLoader'
import imgError from 'os/static/images/error-image.svg'
import {
  RootDispatch,
  RootState,
  useRootDispatch,
  useRootSelector,
} from 'os/store'
import { setVisible } from 'os/store/search.reducer'

const AppCard = ({
  appId,
  style = {},
}: {
  appId: string
  style?: CSSProperties
}) => {
  const history = useHistory()
  const [cardHeight, setCardHeight] = useState(0)
  const dispatch = useRootDispatch<RootDispatch>()
  const visible = useRootSelector((state: RootState) => state.search.visible)
  const ref = useRef(null)

  const to = useCallback(
    async (appId: string) => {
      if (visible) await dispatch(setVisible(false))
      return history.push(`/store/${appId}`)
    },
    [dispatch, history, visible],
  )

  useEffect(() => {
    setCardHeight((ref?.current as any)?.offsetWidth * 0.75)
  }, [ref])

  return (
    <Row ref={ref}>
      <Col span={24}>
        <MultiStaticLoader
          defaultData={[imgError]}
          appId={appId}
          type="panels"
          render={(data) => (
            <Card
              style={{
                backgroundImage: `url(${data[0] || imgError})`,
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
      </Col>
    </Row>
  )
}

export default AppCard
