import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  Row,
  Col,
  Button,
  Popover,
  Typography,
  Divider,
  Badge,
  Tooltip,
} from 'antd'
import IonIcon from 'shared/ionicon'
import Wallet from '../wallet'
import Mode from './mode'
import Network, { parseType } from './network'

import { RootState } from 'os/store'

const QuickSettings = () => {
  const history = useHistory()
  const { networkStatus } = useSelector((state: RootState) => state.ui)

  const content = (
    <Row gutter={[16, 16]} style={{ maxWidth: 300 }}>
      <Col span={24}>
        <Row gutter={[16, 16]} align="middle">
          <Col flex="auto">
            <Typography.Title level={5} type="secondary">
              Quick Settings
            </Typography.Title>
          </Col>
          <Col>
            <Tooltip title="Go to Settings">
              <Button
                size="small"
                icon={<IonIcon name="file-tray-full-outline" />}
                onClick={() => history.push('/settings')}
                block
              />
            </Tooltip>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Mode />
      </Col>
      <Col span={24}>
        <Network />
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} />
      </Col>
      <Col span={24}>
        <Wallet />
      </Col>
    </Row>
  )

  return (
    <Popover placement="topRight" trigger="click" content={content}>
      <Badge status={parseType(networkStatus)} offset={[-4, 4]} dot>
        <Button
          type="text"
          className="contained"
          icon={<IonIcon name="settings-outline" />}
        />
      </Badge>
    </Popover>
  )
}

export default QuickSettings
