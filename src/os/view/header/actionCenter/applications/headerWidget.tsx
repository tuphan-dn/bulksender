import { useDispatch, useSelector } from 'react-redux'

import { RootDispatch, RootState } from 'os/store'
import { uninstallApp, updatePage } from 'os/store/page.reducer'
import WidgetLayout from './widgetLayout'
import { Col, Row, Typography } from 'antd'

const HeaderWidget = ({ disabled = true }: { disabled?: boolean }) => {
  const dispatch = useDispatch<RootDispatch>()
  const { appIds } = useSelector((state: RootState) => state.page)

  const onChange = (appIds: AppIds) => {
    dispatch(updatePage(appIds))
  }

  const onUninstallApp = (appId: string) => {
    dispatch(uninstallApp(appId))
  }

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Typography.Paragraph>All widgets</Typography.Paragraph>
        <WidgetLayout
          disabled={disabled}
          appIds={appIds}
          onChange={onChange}
          onRemove={onUninstallApp}
          removeLabel="Drag to uninstall"
        />
      </Col>
    </Row>
  )
}

export default HeaderWidget
