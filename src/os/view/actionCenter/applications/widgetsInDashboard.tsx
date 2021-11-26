import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Drawer, Row, Typography, Switch, Divider } from 'antd'
import IonIcon from 'shared/ionicon'
import AppIcon from 'os/components/appIcon'
import WidgetLayout from './widgetLayout'

import { RootDispatch, RootState } from 'os/store'
import {
  addWidgets,
  removeWidget,
  updateDashboard,
} from 'os/store/page.reducer'

const WidgetsInDashboard = () => {
  const dispatch = useDispatch<RootDispatch>()
  const [disabled, setDisabled] = useState(true)
  const [visible, setVisible] = useState(false)
  const [selectedWidgets, setSelectedWidgets] = useState<AppIds>([])
  const { register, appIds, widgetIds } = useSelector(
    (state: RootState) => state.page,
  )

  const onChange = (appIds: AppIds) => dispatch(updateDashboard(appIds))
  const onRemove = (appId: string) => dispatch(removeWidget(appId))
  const onSelect = (appId: string) => {
    if (selectedWidgets.includes(appId))
      return setSelectedWidgets(selectedWidgets.filter((id) => id !== appId))
    return setSelectedWidgets([...selectedWidgets, appId])
  }
  const onClose = () => {
    setSelectedWidgets([])
    return setVisible(false)
  }
  const onAdd = () => {
    dispatch(addWidgets(selectedWidgets))
    return onClose()
  }

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Title level={5}>Widgets in dashboard</Typography.Title>
      </Col>
      <Col>
        <Switch onChange={(checked) => setDisabled(!checked)} size="small" />
      </Col>
      <Col span={24}>
        <WidgetLayout
          placeholder="No added widget"
          disabled={disabled}
          appIds={widgetIds}
          onChange={onChange}
          onRemove={widgetIds.length ? onRemove : undefined}
          removeLabel="Drop to remove"
          onAdd={() => setVisible(true)}
          addLabel="Add widgets"
        />
      </Col>
      {/* Drawer Add Widget Dashboard */}
      <Drawer
        visible={visible}
        onClose={onClose}
        closable={false}
        contentWrapperStyle={{ width: '75%', maxWidth: 300 }}
        title={<Typography.Title level={5}>Widget list</Typography.Title>}
        extra={
          <Button
            type="text"
            icon={<IonIcon name="close-outline" />}
            onClick={onClose}
          />
        }
        footer={
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Button block onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                type="primary"
                onClick={onAdd}
                disabled={!selectedWidgets.length}
              >
                OK
              </Button>
            </Col>
          </Row>
        }
      >
        <Row gutter={[12, 12]}>
          {appIds
            .filter(
              (appId) =>
                !widgetIds.includes(appId) &&
                register[appId]?.supportedViews?.includes('widget'),
            )
            .map((appId) => (
              <Col span={24} key={appId}>
                <Row gutter={[12, 12]} justify="space-between" align="middle">
                  <Col>
                    <AppIcon
                      appId={appId}
                      size={32}
                      onClick={() => onSelect(appId)}
                      direction="horizontal"
                    />
                  </Col>
                  {selectedWidgets.includes(appId) ? (
                    <Col>
                      <Button
                        type="text"
                        icon={
                          <Typography.Text type="success">
                            <IonIcon name="checkmark-outline" />
                          </Typography.Text>
                        }
                      />
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <Divider style={{ margin: 0 }} />
                  </Col>
                </Row>
              </Col>
            ))}
        </Row>
      </Drawer>
    </Row>
  )
}

export default WidgetsInDashboard
