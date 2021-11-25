import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button, Col, Modal, Row, Space, Typography, Switch } from 'antd'
import IonIcon from 'shared/ionicon'
import WidgetLayout from './widgetLayout'

import { RootDispatch, RootState } from 'os/store'
import { uninstallApp, updatePage } from 'os/store/page.reducer'
import { setVisibleActionCenter } from 'os/store/ui.reducer'

const AllApplications = () => {
  const history = useHistory()
  const dispatch = useDispatch<RootDispatch>()
  const [disabled, setDisabled] = useState(true)
  const [appId, setAppId] = useState('')
  const [visible, setVisible] = useState(false)
  const { appIds, register } = useSelector((state: RootState) => state.page)

  const onChange = (appIds: AppIds) => dispatch(updatePage(appIds))
  const onClose = async () => {
    await setAppId('')
    return setVisible(false)
  }
  const onConfirm = async (appId: string) => {
    await setAppId(appId)
    return setVisible(true)
  }
  const onUninstall = async () => {
    await dispatch(uninstallApp(appId))
    return onClose()
  }
  const onGotoStore = async () => {
    await dispatch(setVisibleActionCenter(false))
    return history.push('/store')
  }

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Title level={5}>All applications</Typography.Title>
      </Col>
      <Col>
        <Switch onChange={(checked) => setDisabled(!checked)} size="small" />
      </Col>
      <Col span={24}>
        <WidgetLayout
          placeholder="No installed application"
          disabled={disabled}
          appIds={appIds.filter((id) => id !== appId)}
          onChange={onChange}
          onRemove={onConfirm}
          removeLabel="Drag to uninstall"
        />
      </Col>
      {!appIds.length ? (
        <Col span={24}>
          <Button
            block
            type="primary"
            className="contained"
            icon={<IonIcon name="bag-handle-outline" />}
            onClick={onGotoStore}
          >
            Go to store
          </Button>
        </Col>
      ) : null}
      <Modal closable={false} visible={visible} footer={null} centered>
        <Row gutter={[24, 24]} justify="end">
          <Col span={24}>
            <Space align="baseline">
              <Typography.Text type="warning">
                <IonIcon name="alert-circle-outline" />
              </Typography.Text>
              <Space direction="vertical">
                <Typography.Title level={5}>
                  Do you want to uninstall {register[appId]?.name}?
                </Typography.Title>
                <Typography.Text>
                  Uninstalling this application will clear all its data.
                </Typography.Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={onUninstall}>
                Uninstall
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default AllApplications
