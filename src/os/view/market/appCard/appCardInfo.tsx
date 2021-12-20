import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Card, Col, Row, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'

import { RootState } from 'os/store'
import { installApp } from 'os/store/page.reducer'
import { account } from '@senswap/sen-js'

const ActionButton = ({
  appIds,
  appId,
  onOpen = () => {},
  onInstall,
}: {
  appIds: AppIds
  appId: string
  onOpen: (e: any) => void
  onInstall: (e: any) => void
}) => {
  return appIds.includes(appId) ? (
    <Button type="ghost" size="small" onClick={onOpen}>
      Open
    </Button>
  ) : (
    <Button type="primary" onClick={onInstall} size="small">
      Install
    </Button>
  )
}

const AppCardInfo = ({ appId }: { appId: string }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, appIds } = useSelector((state: RootState) => state.page)
  const { address } = useSelector((state: RootState) => state.wallet)
  const manifest = register[appId]

  const onInstall = (e: any) => {
    if (!appId) return
    e.stopPropagation()
    return dispatch(installApp(appId))
  }

  const onOpen = (e: any) => {
    if (!appId) return
    e.stopPropagation()
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
            <Typography.Title level={5}>{manifest?.name}</Typography.Title>
            <Typography.Text type="secondary">
              {manifest?.author.name}
            </Typography.Text>
          </Col>
          {account.isAddress(address) && (
            <Col>
              <ActionButton
                appIds={appIds}
                appId={appId}
                onOpen={(e) => onOpen(e)}
                onInstall={(e) => onInstall(e)}
              />
            </Col>
          )}
        </Row>
      </Card>
    </Col>
  )
}

export default AppCardInfo
