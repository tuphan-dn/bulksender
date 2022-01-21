import { MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Space, Typography } from 'antd'
import AppIcon from 'os/components/appIcon'

import { RootState, useRootDispatch, useRootSelector } from 'os/store'
import { installApp } from 'os/store/page.reducer'
import { closeModalInstall } from 'os/store/search.reducer'

const CustomAppIcon = ({ appId }: { appId: string }) => {
  const {
    page: { register, appIds },
    search: { currentAppId },
  } = useRootSelector((state: RootState) => state)
  const { name: appName } = register[appId] || { name: 'Unknown' }
  const dispatch = useRootDispatch()
  const history = useHistory()

  const onInstall = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (appId === currentAppId) dispatch(closeModalInstall())
    return dispatch(installApp(appId))
  }

  const onOpen = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    history.push(`/app/${appId}`)
    return dispatch(closeModalInstall())
  }

  const installed = appIds.includes(appId)

  return (
    <Space size={16}>
      <AppIcon name={false} appId={appId} />
      <Space direction="vertical">
        <Typography.Text>{appName}</Typography.Text>
        <Button
          onClick={installed ? onOpen : onInstall}
          type="primary"
          size="small"
        >
          {installed ? 'Open' : 'Install'}
        </Button>
      </Space>
    </Space>
  )
}

export default CustomAppIcon
