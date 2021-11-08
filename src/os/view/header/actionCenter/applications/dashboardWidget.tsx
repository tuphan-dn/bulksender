import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootDispatch, RootState } from 'os/store'
import { addWidget, removeWidget, updateDashboard } from 'os/store/page.reducer'

import { Button, Checkbox, Col, Drawer, Row, Typography } from 'antd'
import IonIcon from 'shared/ionicon'
import AppIcon from 'os/components/appIcon'
import DragAppLayout from './widgetLayout'

const DashboardWidget = ({ disabled = true }: { disabled?: boolean }) => {
  const dispatch = useDispatch<RootDispatch>()
  const { appIds, widgetIds } = useSelector((state: RootState) => state.page)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
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

  const onCloseDrawer = () => {
    setAppSelected([])
    setIsOpenDrawer(false)
  }

  const onAddWidget = () => {
    dispatch(addWidget(appSelected))
    onCloseDrawer()
  }

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Typography.Paragraph>
          Let's customize your dashboard
        </Typography.Paragraph>
        <DragAppLayout
          disabled={disabled}
          appIds={widgetIds}
          onChange={onChange}
          onRemove={onRemoveWidget}
          removeLabel="Drag to remove"
          onAdd={() => setIsOpenDrawer(true)}
          addLabel="Add widget"
        />
      </Col>
      {/* Drawer Add Widget Dashboard */}
      <Drawer
        visible={isOpenDrawer}
        onClose={onCloseDrawer}
        closable={false}
        contentWrapperStyle={{ width: '95%', maxWidth: 400 }}
        destroyOnClose
      >
        <Row gutter={[16, 24]}>
          {appIds
            .filter((appId) => !widgetIds.includes(appId))
            .map((appId) => {
              return (
                <Col key={appId}>
                  <AppIcon
                    appId={appId}
                    size={64}
                    onClick={() => onSelectApp(appId)}
                  />
                  <Checkbox checked={appSelected.includes(appId)}></Checkbox>
                </Col>
              )
            })}
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Button
              block
              type="primary"
              className="contained"
              icon={<IonIcon name="add-outline" />}
              onClick={onAddWidget}
              disabled={!appSelected.length}
            >
              Add Widget
            </Button>
          </Col>
        </Row>
      </Drawer>
    </Row>
  )
}

export default DashboardWidget
