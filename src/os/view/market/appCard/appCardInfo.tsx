import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { account } from '@senswap/sen-js'
import { MouseEvent } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'
import Verification from 'os/components/verification'

import { RootState } from 'os/store'
import { installApp } from 'os/store/page.reducer'
import { setWalkthrough } from 'os/store/walkthrough.reducer'
import { openWallet } from 'os/store/wallet.reducer'
import { updateVisited } from 'os/store/flags.reducer'

type ActionButtonProps = {
  appIds: AppIds
  appId: string
  onOpen: (e: MouseEvent<HTMLButtonElement>) => void
  onInstall: (e: MouseEvent<HTMLButtonElement>) => void
}

const ActionButton = ({
  appIds,
  appId,
  onOpen = () => {},
  onInstall,
}: ActionButtonProps) => {
  return appIds.includes(appId) ? (
    <Button type="ghost" size="small" onClick={onOpen} id="open-action-button">
      Open
    </Button>
  ) : (
    <Button
      type="primary"
      onClick={onInstall}
      size="small"
      id="install-action-button"
    >
      Install
    </Button>
  )
}

const AppCardInfo = ({ appId }: { appId: string }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    page: { register, appIds },
    walkthrough: { run },
    wallet: { address: walletAddress },
  } = useSelector((state: RootState) => state)

  const manifest = register[appId]

  const onInstall = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!account.isAddress(walletAddress)) return dispatch(openWallet())
    if (run) await dispatch(setWalkthrough({ step: 2 }))
    if (appId) {
      await dispatch(updateVisited(true))
      return dispatch(installApp(appId))
    }
  }

  const onOpen = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (run) await dispatch(setWalkthrough({ step: 3 }))
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
            <ActionButton
              appIds={appIds}
              appId={appId}
              onOpen={onOpen}
              onInstall={onInstall}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default AppCardInfo
