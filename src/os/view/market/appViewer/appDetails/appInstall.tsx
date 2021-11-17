import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Col, Grid, Row } from 'antd'

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
  const { xs, sm, md } = Grid.useBreakpoint()

  const to = () => history.push(`/app/${appId}`)
  const setFloatElement = () => {
    if (xs || (sm && !md)) return 'start'
    return 'end'
  }

  const isMobile = xs || (sm && !md)

  return (
    <Row gutter={[12, 12]} justify={setFloatElement()}>
      {installed ? (
        <Fragment>
          <Col span={isMobile ? 12 : undefined}>
            <Button
              icon={<IonIcon name="trash-outline" />}
              onClick={() => dispatch(uninstallApp(appId))}
              block={isMobile}
            >
              Uninstall
            </Button>
          </Col>

          <Col span={isMobile ? 12 : undefined}>
            <Button
              type="primary"
              icon={<IonIcon name="open-outline" />}
              onClick={to}
              block={isMobile}
            >
              Open
            </Button>
          </Col>
        </Fragment>
      ) : (
        <Col span={isMobile ? 24 : undefined}>
          <Button
            type="primary"
            icon={<IonIcon name="cloud-download-outline" />}
            onClick={() => dispatch(installApp(appId))}
            block={isMobile}
          >
            Install
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default AppInstall
