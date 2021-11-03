import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Switch, Typography, Card } from 'antd'
import IonIcon from 'shared/ionicon'

import { RootDispatch, RootState } from 'os/store'
import { setTheme } from 'os/store/ui.reducer'

const Theme = () => {
  const dispatch = useDispatch<RootDispatch>()
  const { theme } = useSelector((state: RootState) => state.ui)

  const onSwitch = (checked: boolean) => {
    return dispatch(setTheme(checked ? 'dark' : 'light'))
  }

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col flex="auto">
              <Typography.Text>Theme</Typography.Text>
            </Col>
            <Col>
              <Switch
                size="small"
                checked={theme === 'dark'}
                onChange={onSwitch}
                checkedChildren={<IonIcon name="moon-outline" />}
                unCheckedChildren={<IonIcon name="sunny-outline" />}
                disabled
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary" style={{ fontSize: 12 }}>
            Dark mode will prolong your battery life, and reduce eye strain
            (coming soon).
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default Theme
