import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Col, Row } from 'antd'

import { RootDispatch } from 'os/store'
import { installApp, uninstallApp } from 'os/store/page.reducer'
import IonIcon from 'shared/ionicon'
import { Fragment } from 'react'

const AppInstall = ({
  installed,
  appId,
}: {
  installed: boolean
  appId: string
}) => {
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()

  const to = () => history.push(`/app/${appId}`)

  return (
    <Row gutter={[12, 12]} justify="end">
      {installed ? (
        <Fragment>
          <Col span={12}>
            <Button
              icon={<IonIcon name="trash-outline" />}
              onClick={() => dispatch(uninstallApp(appId))}
              block
            >
              Uninstall
            </Button>
          </Col>

          <Col span={12}>
            <Button
              type="primary"
              icon={<IonIcon name="open-outline" />}
              onClick={to}
              block
            >
              Open
            </Button>
          </Col>
        </Fragment>
      ) : (
        <Col flex="auto">
          <Button
            type="primary"
            icon={<IonIcon name="cloud-download-outline" />}
            onClick={() => dispatch(installApp(appId))}
            block
          >
            Install
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default AppInstall
