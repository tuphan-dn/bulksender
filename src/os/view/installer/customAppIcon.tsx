import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Space, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'

import { RootState, useRootDispatch, useRootSelector } from 'os/store'
import { installApp } from 'os/store/page.reducer'

export type CustomAppIconProps = { appId: string; onCallback?: () => void }

const CustomAppIcon = ({
  appId,
  onCallback = () => {},
}: CustomAppIconProps) => {
  const register = useRootSelector((state: RootState) => state.page.register)
  const appIds = useRootSelector((state: RootState) => state.page.appIds)
  const dispatch = useRootDispatch()
  const history = useHistory()

  const { name: appName } = register[appId] || { name: 'Unknown' }
  const installed = appIds.includes(appId)

  const onInstall = useCallback(async () => {
    return dispatch(installApp(appId))
  }, [dispatch, appId])

  const onOpen = useCallback(async () => {
    history.push(`/app/${appId}`)
    return onCallback()
  }, [history, appId, onCallback])

  return (
    <Space size={16}>
      <AppIcon name={false} appId={appId} />
      <Space direction="vertical">
        <Typography.Text>{appName}</Typography.Text>
        <Button
          onClick={installed ? onOpen : onInstall}
          type={installed ? undefined : 'primary'}
          size="small"
        >
          {installed ? 'Open' : 'Install'}
        </Button>
      </Space>
    </Space>
  )
}

export default CustomAppIcon
