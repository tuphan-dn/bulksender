import { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import Joyride, {
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
  TooltipRenderProps,
} from 'react-joyride'

import { Layout, Row, Col, Card, Affix } from 'antd'
import PrivateRoute from 'os/components/privateRoute'
import Header from 'os/view/header'
import Welcome from 'os/view/welcome'
import Dashboard from 'os/view/dashboard'
import Page from 'os/view/page'
import Market from 'os/view/market'
import AppViewer from './market/appViewer'
import Sync from './sync'

import Watcher from 'os/view/watcher'
import { RootState } from 'os/store'
import 'os/static/styles/dark.os.less'
import 'os/static/styles/light.os.less'
import { setWalkthroughState } from 'os/store/walkthrough.reducer'

const Tooltip = ({
  index,
  step,
  tooltipProps,
  skipProps,
}: TooltipRenderProps) => {
  return (
    <div
      key={index}
      {...tooltipProps}
      style={{
        background: '#F4F4F5',
        padding: '24px',
        borderRadius: '16px',
        width: '360px',
      }}
    >
      {step.title && (
        <div style={{ color: '#212433', fontWeight: '700', fontSize: '20px' }}>
          {step.title}
        </div>
      )}
      <div
        style={{
          fontWeight: '400',
          fontSize: '14px',
          color: '#212433',
          marginTop: '8px',
          marginBottom: '24px',
        }}
      >
        {step.content}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
            <div
              style={{
                width: `${item === index + 1 ? '20px' : '12px'}`,
                height: '4px',
                background: `${item === index + 1 ? '#F9575E' : '#FEDDDF'}`,
                margin: '0px 4px',
                borderRadius: '8px',
              }}
            />
          ))}
        </div>
        <div {...skipProps} id="skip" style={{ cursor: 'pointer' }}>
          Skip
        </div>
      </div>
    </div>
  )
}

const View = () => {
  const {
    ui: { theme },
    wallet: { address },
    walkthrough,
    page,
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const { run, stepIndex } = walkthrough

  const [steps, setSteps] = useState<Step[]>([])

  useEffect(() => {
    return document.body.setAttribute('id', theme)
  }, [theme])

  useEffect(() => {
    ;(async () => {
      if (
        !account.isAddress(address) ||
        !page.appIds ||
        page.appIds?.length !== 0
      )
        return
      dispatch(
        setWalkthroughState({
          run: true,
        }),
      )
      setSteps([
        {
          content: (
            <div>
              Click the <b>Store</b> button to search DeFi apps
            </div>
          ),
          disableBeacon: true,
          disableOverlayClose: true,
          placement: 'bottom',
          spotlightClicks: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: '#store',
          title: (
            <div
              style={{
                textAlign: 'left',
                color: '#212433',
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              Search an app
            </div>
          ),
        },
        {
          content: (
            <div>
              Find an app in the list and click the <b>Install</b> button to set
              up the app.
            </div>
          ),
          placement: 'top',
          spotlightPadding: 0,
          spotlightClicks: true,
          disableBeacon: true,
          disableOverlayClose: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: '#app',
          title: 'List apps',
        },
        {
          content: (
            <div>
              Click the <b>Open</b> button to explore more interesting features.
            </div>
          ),
          disableBeacon: true,
          disableOverlayClose: true,
          placement: 'top',
          spotlightClicks: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: '#open',
          title: 'Open the app',
        },
        {
          content: (
            <div>
              Helps you keep an overview and quickly work with many applications
              at the same time.
            </div>
          ),
          disableBeacon: true,
          disableOverlayClose: true,
          hideCloseButton: true,
          hideFooter: true,
          placement: 'bottom',
          spotlightClicks: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
          target: '#dashboard',
          title: 'Dashboard',
        },
      ])
    })()
  }, [address, dispatch, page])

  const handleJoyrideCallback = (props: CallBackProps) => {
    const { type, status } = props

    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (options.includes(status)) {
      dispatch(
        setWalkthroughState({
          run: false,
        }),
      )
    } else if (([EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      dispatch(
        setWalkthroughState({
          run: false,
        }),
      )
      setTimeout(() => {
        dispatch(
          setWalkthroughState({
            run: true,
          }),
        )
      }, 400)
    }
  }

  return (
    <Layout>
      {/* Header */}
      <Affix>
        <Card
          style={{
            borderRadius: '0px 0px 16px 16px',
            zIndex: 999,
          }}
          bodyStyle={{ padding: 16 }}
          bordered={false}
        >
          <Header />
        </Card>
      </Affix>
      {/* Body */}
      <Layout style={{ padding: '24px 12px 0px 12px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Switch>
              <Route exact path="/welcome" component={Welcome} />
              <PrivateRoute
                exact
                path="/dashboard/:pageId?"
                component={Dashboard}
              />
              <PrivateRoute exact path="/app/:appId" component={Page} />
              <Route exact path="/store" component={Market} />
              <Route exact path="/store/:appId" component={AppViewer} />
              <PrivateRoute exact path="/sync" component={Sync} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          </Col>
        </Row>
      </Layout>
      {/* WalkThrough Tutorial */}
      <Joyride
        continuous={true}
        run={run}
        steps={steps}
        stepIndex={stepIndex}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        tooltipComponent={Tooltip}
      />
      {/* In-Background Run Jobs */}
      <Watcher />
    </Layout>
  )
}

export default View
