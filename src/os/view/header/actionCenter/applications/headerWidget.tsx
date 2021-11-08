import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { RootDispatch, RootState } from 'os/store'
import { uninstallApp, updatePage } from 'os/store/page.reducer'
import WidgetLayout from './widgetLayout'
import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import { useHistory } from 'react-router-dom'
import { setActionCenterVisible } from 'os/store/ui.reducer'

const HeaderWidget = ({ disabled = true }: { disabled?: boolean }) => {
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  const { appIds, register } = useSelector((state: RootState) => state.page)
  const [statusUninstall, setStatusUninstall] = useState({
    isOpen: false,
    appId: '',
  })

  const onChange = (appIds: AppIds) => {
    dispatch(updatePage(appIds))
  }

  const onConfirmUninstall = (appId: string) => {
    setStatusUninstall({
      isOpen: true,
      appId,
    })
  }

  const onUninstall = async () => {
    await dispatch(uninstallApp(statusUninstall.appId))
    onCloseUninstall()
  }

  const onCloseUninstall = () => {
    setStatusUninstall({
      isOpen: false,
      appId: '',
    })
  }
  const onGotoStore = () => {
    history.push('/store')
    dispatch(setActionCenterVisible(false))
  }

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        {disabled && !appIds.length ? (
          <Typography.Text type="secondary"> No application</Typography.Text>
        ) : null}
        {!disabled && !appIds.length ? (
          <Button
            block
            type="primary"
            className="contained"
            icon={<IonIcon name="bag-handle-outline" />}
            onClick={onGotoStore}
          >
            Go to store
          </Button>
        ) : null}
        <WidgetLayout
          disabled={disabled}
          appIds={appIds.filter((id) => id !== statusUninstall.appId)}
          onChange={onChange}
          onRemove={onConfirmUninstall}
          removeLabel="Drag to uninstall"
        />
      </Col>
      <Modal
        closable={false}
        visible={statusUninstall.isOpen}
        okText="Uninstall"
        onOk={onUninstall}
        onCancel={onCloseUninstall}
        centered
      >
        <Row gutter={[4, 4]} >
          <Space align="baseline">
              <Typography.Text type="warning">
                <IonIcon name="alert-circle-outline" />
              </Typography.Text>
              <Space direction="vertical" size={0}>
              <Typography.Title level={5}>
                Do you want to uninstall "
                {register[statusUninstall.appId]?.name}"?
              </Typography.Title>
              <Typography.Text>
                Uninstalling this application will lose its data.
              </Typography.Text>
              </Space>
          </Space>
        </Row>
      </Modal>
    </Row>
  )
}

export default HeaderWidget
