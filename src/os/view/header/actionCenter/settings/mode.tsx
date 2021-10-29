import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Row, Col, Switch, Typography, Card } from 'antd'

import { RootDispatch, RootState } from 'os/store'
import { setMode } from 'os/store/flags.reducer'

const Mode = () => {
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  const { mode } = useSelector((state: RootState) => state.flags)

  const onSwitch = async (checked: boolean) => {
    const mode = checked ? 'professional' : 'focus'
    const page = checked ? '/dashboard' : '/page'
    await dispatch(setMode(mode))
    return history.push(page)
  }

  return (
    <Card bodyStyle={{ padding: 16 }} hoverable>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col flex="auto">
              <Typography.Text>Pro Mode</Typography.Text>
            </Col>
            <Col>
              <Switch
                size="small"
                checked={mode === 'professional'}
                onChange={onSwitch}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary" style={{ fontSize: 12 }}>
            By enabling the professional mode, your workspace will be a screen
            of widgets.
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default Mode
