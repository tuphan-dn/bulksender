import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Switch, Typography } from 'antd'
import WalletIntro from './walletIntro'
import WidgetLayout from './widgetLayout'

import { RootDispatch, RootState } from 'os/store'
import { uninstallApp, updatePage } from 'os/store/page.reducer'

const Applications = () => {
  const dispatch = useDispatch<RootDispatch>()
  const [editable, setEditable] = useState(false)
  const { appPage } = useSelector((state: RootState) => state.page)

  const setPages = useCallback(
    (appPage) => {
      return dispatch(updatePage(appPage))
    },
    [dispatch],
  )

  const onRemove = useCallback(
    (appId: string) => {
      dispatch(uninstallApp(appId))
    },
    [dispatch],
  )

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <WalletIntro />
      </Col>
      <Col flex="auto">
        <Typography.Text>To customize your workspace</Typography.Text>
      </Col>
      <Col>
        <Switch onChange={setEditable} size="small" />
      </Col>
      <Col span={24}>
        <WidgetLayout
          pages={appPage}
          onChange={setPages}
          onRemove={onRemove}
          disabled={!editable}
        />
      </Col>
    </Row>
  )
}

export default Applications
