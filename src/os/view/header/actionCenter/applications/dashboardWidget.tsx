import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootDispatch, RootState } from 'os/store'
import { addWidget, removeWidget, updateDashboard } from 'os/store/page.reducer'

import { Button, Col, Drawer, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import AppIcon from 'os/components/appIcon'
import DragAppLayout from './widgetLayout'

const DashboardWidget = ({ disabled = true }: { disabled?: boolean }) => {
  const dispatch = useDispatch<RootDispatch>()
  const { appIds, widgetIds } = useSelector((state: RootState) => state.page)
  const [isOpenAddWidget, setIsOpenAddWidget] = useState(false)
  const [appSelected, setAppSelected] = useState<AppIds>([])

  const onChange = (appIds: AppIds) => {
    dispatch(updateDashboard(appIds))
  }

  const onRemoveWidget = (appId: string) => {
    dispatch(removeWidget(appId))
  }

  const onSelectApp = (appId: string) => {
    if (appSelected.includes(appId)) {
      return setAppSelected(appSelected.filter((id) => id !== appId))
    }
    setAppSelected([...appSelected, appId])
  }

  const onCloseAddWidget = () => {
    setAppSelected([])
    setIsOpenAddWidget(false)
  }

  const onAddWidget = () => {
    dispatch(addWidget(appSelected))
    onCloseAddWidget()
  }

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        {disabled && !widgetIds.length ? (
          <Typography.Text type="secondary">No widget</Typography.Text>
        ) : null}
        <DragAppLayout
          disabled={disabled}
          appIds={widgetIds}
          onChange={onChange}
          onRemove={widgetIds.length ? onRemoveWidget : undefined}
          removeLabel="Drag to remove"
          onAdd={() => setIsOpenAddWidget(true)}
          addLabel="Add widget"
        />
      </Col>
      {/* Drawer Add Widget Dashboard */}
      <Drawer
        visible={isOpenAddWidget}
        onClose={onCloseAddWidget}
        closable={false}
        contentWrapperStyle={{ width: '95%', maxWidth: 400 }}
        bodyStyle={{ paddingTop: 0 }}
        destroyOnClose
        title="Widget list"
        extra={
          <Button
            type="text"
            icon={<IonIcon name="close-outline" />}
            onClick={onCloseAddWidget}
          />
        }
        footer={
          <Row gutter={[16, 24]} style={{ padding: '0 24px' }}>
            <Col span={12}>
              <Button block className="contained" onClick={onAddWidget}>
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                type="primary"
                className="contained"
                onClick={onAddWidget}
                disabled={!appSelected.length}
              >
                OK
              </Button>
            </Col>
          </Row>
        }
      >
        {appIds
          .filter((appId) => !widgetIds.includes(appId))
          .map((appId) => {
            const isChecked = appSelected.includes(appId)
            return (
              <Row
                justify="space-between"
                align="middle"
                key={appId}
                style={{ height: 56, borderBottom: '0.5px solid #f0f0f0' }}
              >
                <Col>
                  <AppIcon
                    appId={appId}
                    size={32}
                    onClick={() => onSelectApp(appId)}
                    direction="horizontal"
                  />
                </Col>
                <Col>
                  <Button
                    type="text"
                    size="small"
                    icon={
                      isChecked ? (
                        <Typography.Text type="success">
                          <IonIcon name="checkmark-outline" />
                        </Typography.Text>
                      ) : null
                    }
                  />
                </Col>
              </Row>
            )
          })}
      </Drawer>
    </Row>
  )
}

export default DashboardWidget
