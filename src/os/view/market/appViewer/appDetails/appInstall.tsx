import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { account } from '@senswap/sen-js'

import { Button, Col, Modal, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import WalletConnection from 'os/view/header/wallet/login/walletConnection'

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
  const { address } = useSelector((state: RootState) => state.wallet)
  const [visible, setVisible] = useState(false)
  const history = useHistory()

  const to = () => history.push(`/app/${appId}`)

  const isMobile = infix === 'xs' || infix === 'sm'
  const setFloatElement = () => {
    if (isMobile) return 'start'
    return 'end'
  }

  const onInstall = () => {
    !account.isAddress(address) ? setVisible(true) : dispatch(installApp(appId))
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
            onClick={onInstall}
            block={isMobile}
          >
            Install
          </Button>
        </Col>
      )}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close" />}
        footer={null}
      >
        <WalletConnection textAlert="You have to connect wallet to install the app." />
      </Modal>
    </Row>
  )
}

export default AppInstall
