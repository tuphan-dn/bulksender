import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Col, Row } from 'antd'
import IonIcon from 'shared/ionicon'

import { RootDispatch, RootState } from 'os/store'
import { installApp, uninstallApp } from 'os/store/page.reducer'

const AppInstall = ({
  installed,
  appId,
}: {
  installed: boolean
  appId: string
}) => {
  const dispatch = useDispatch<RootDispatch>()
  const { infix } = useSelector((state: RootState) => state.ui)
  const history = useHistory()

  const to = () => history.push(`/app/${appId}`)

  const isMobile = infix === 'xs' || infix === 'sm'
  const setFloatElement = () => {
    if (isMobile) return 'start'
    return 'end'
  }

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
