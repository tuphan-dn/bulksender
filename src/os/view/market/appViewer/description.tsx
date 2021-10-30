import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Row, Col, Button, Card, Space } from 'antd'
import IonIcon from 'shared/ionicon'
import AppReadme from 'os/components/appReadme'

import { RootDispatch, RootState } from 'os/store'
import { installApp, uninstallApp } from 'os/store/page.reducer'

const Description = ({ appId }: { appId: string }) => {
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  const { address } = useSelector((state: RootState) => state.wallet)
  const { appPage } = useSelector((state: RootState) => state.page)

  const isInstalled = () => {
    return account.isAddress(address) && appPage.flat().includes(appId)
  }

  const to = () => history.push(`/page/${appId}`)
  const onBack = () => history.goBack()

  return (
    <Row gutter={[24, 24]} justify="space-between">
      <Col>
        <Button
          type="text"
          className="contained"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={onBack}
        >
          Back
        </Button>
      </Col>
      <Col>
        {isInstalled() ? (
          <Space>
            <Button
              type="text"
              className="contained"
              icon={<IonIcon name="trash-outline" />}
              onClick={() => dispatch(uninstallApp(appId))}
            >
              Uninstall
            </Button>
            <Button type="primary" onClick={to}>
              Open
            </Button>
          </Space>
        ) : (
          <Button
            type="primary"
            icon={<IonIcon name="cloud-download-outline" />}
            onClick={() => dispatch(installApp(appId))}
          >
            Install
          </Button>
        )}
      </Col>
      <Col span={24}>
        <Card>
          <AppReadme appId={appId} />
        </Card>
      </Col>
    </Row>
  )
}

export default Description
