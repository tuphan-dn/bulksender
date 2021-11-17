import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Col, Grid, Row } from 'antd'
import IonIcon from 'shared/ionicon'

import { RootDispatch } from 'os/store'
import { installApp, uninstallApp } from 'os/store/page.reducer'


const AppInstall = ({
  installed,
  appId,
}: {
  installed: boolean
  appId: string
}) => {
  const dispatch = useDispatch<RootDispatch>()
  const history = useHistory()
  const { xs, sm, md } = Grid.useBreakpoint()

  const to = () => history.push(`/app/${appId}`)
  const setFloatElement = () => {
    if (xs || (sm && !md)) return 'start'
    return 'end'
  }

  const mobileView = xs || (sm && !md)

  return (
    <Row gutter={[12, 12]} justify={setFloatElement()}>
      {installed ? (
        <Fragment>
          <Col span={mobileView ? 12 : undefined}>
            <Button
              icon={<IonIcon name="trash-outline" />}
              onClick={() => dispatch(uninstallApp(appId))}
              block={mobileView}
            >
              Uninstall
            </Button>
          </Col>

          <Col span={xs || (sm && !md) ? 12 : undefined}>
            <Button
              type="primary"
              icon={<IonIcon name="open-outline" />}
              onClick={to}
              block={mobileView}
            >
              Open
            </Button>
          </Col>
        </Fragment>
      ) : (
        <Col span={mobileView ? 24 : undefined}>
          <Button
            type="primary"
            icon={<IonIcon name="cloud-download-outline" />}
            onClick={() => dispatch(installApp(appId))}
            block={mobileView}
          >
            Install
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default AppInstall
