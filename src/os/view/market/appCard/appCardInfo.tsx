import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'
import Verification from 'os/components/verification'

import { RootState } from 'os/store'
import { installApp } from 'os/store/page.reducer'
import { setWalkthroughState } from 'os/store/walkthrough.reducer'

const AppCardInfo = ({ appId }: { appId: string }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, appIds } = useSelector((state: RootState) => state.page)

  const { run } = useSelector((state: RootState) => state.walkthrough)

  const manifest = register[appId]

  const onInstall = (e: any) => {
    if (run === true) {
      dispatch(
        setWalkthroughState({
          stepIndex: 2,
        }),
      )
    }
    e.stopPropagation()
    return dispatch(installApp(appId))
  }

  const onOpen = (e: any, appId: string) => {
    e.stopPropagation()
    if (run === true) {
      dispatch(
        setWalkthroughState({
          stepIndex: 3,
        }),
      )
    }
    return history.push(`/app/${appId}`)
  }

  return (
    <Col span={24}>
      <Card
        bordered={false}
        className="glass"
        style={{
          borderRadius: 'unset',
        }}
        bodyStyle={{
          padding: '12px 16px',
        }}
      >
        <Row align="middle" gutter={[8, 8]}>
          <Col>
            <AppIcon size={32} appId={appId} name={false} />
          </Col>
          <Col flex="auto">
            <Space direction="vertical" size={0}>
              <Space align="center" style={{ lineHeight: 1 }}>
                <Typography.Title level={5}>{manifest?.name}</Typography.Title>
                <Verification verified={manifest?.verified} />
              </Space>
              <Typography.Text type="secondary">
                {manifest?.author.name}
              </Typography.Text>
            </Space>
          </Col>
          <Col>
            {appIds.includes(appId) ? (
              <Button
                type="ghost"
                size="small"
                onClick={(e) => onOpen(e, appId)}
                id="open"
              >
                Open
              </Button>
            ) : (
              <Button type="primary" onClick={onInstall} size="small" id="app">
                Install
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default AppCardInfo
