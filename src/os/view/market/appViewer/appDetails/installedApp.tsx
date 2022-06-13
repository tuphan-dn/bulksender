import { Fragment, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router'
import { account } from '@senswap/sen-js'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import {
  useRootDispatch,
  useRootSelector,
  RootDispatch,
  RootState,
} from 'os/store'
import { installApp, uninstallApp } from 'os/store/page.reducer'
import { openWallet } from 'os/store/wallet.reducer'
import { updateVisited } from 'os/store/flags.reducer'

export type InstalledAppProps = {
  installed: boolean
  appId: string
}

const InstalledApp = ({ installed, appId }: InstalledAppProps) => {
  const dispatch = useRootDispatch<RootDispatch>()
  const infix = useRootSelector((state: RootState) => state.ui.infix)
  const walletAddress = useRootSelector(
    (state: RootState) => state.wallet.address,
  )
  const history = useHistory()

  const to = useCallback(() => history.push(`/app/${appId}`), [history, appId])

  const isMobile = useMemo(() => infix === 'xs' || infix === 'sm', [infix])
  const justify = useMemo(() => (isMobile ? 'start' : 'end'), [isMobile])

  const onInstall = async () => {
    if (!account.isAddress(walletAddress)) return dispatch(openWallet())
    await dispatch(updateVisited(true))
    return dispatch(installApp(appId))
  }

  return (
    <Row gutter={[12, 12]} justify={justify}>
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
    </Row>
  )
}

export default InstalledApp
