import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride'

import Tooltip from './tooltip'

import { RootState } from 'os/store'
import { setWalkthrough } from 'os/store/walkthrough.reducer'
import './index.os.less'

const STEPS: Step[] = [
  {
    content: (
      <div>
        Click the <b>Store</b> button to search DeFi apps
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: '#store-nav-button',
    title: (
      <div
        style={{
          textAlign: 'left',
          color: '#212433',
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        Search an app
      </div>
    ),
  },
  {
    content: (
      <div>
        Find an app in the list and click the <b>Install</b> button to set up
        the app.
      </div>
    ),
    spotlightPadding: 0,
    spotlightClicks: true,
    disableBeacon: true,
    disableOverlayClose: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: '#install-action-button',
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
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: '#open-action-button',
    title: 'Open the app',
  },
  {
    content: (
      <div>
        Helps you keep an overview and quickly work with many applications at
        the same time.
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target: '#dashboard-nav-button',
    title: 'Dashboard',
  },
]

const Walkthrough = () => {
  const dispatch = useDispatch()
  const {
    wallet: { address },
    walkthrough: { run, step },
    flags: { visited },
  } = useSelector((state: RootState) => state)

  useEffect(() => {
    if (account.isAddress(address) && !visited)
      dispatch(setWalkthrough({ run: true }))
  }, [address, dispatch, visited])

  const onCallback = ({ type, status }: CallBackProps) => {
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (options.includes(status))
      return dispatch(setWalkthrough({ run: false }))
    if (([EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      dispatch(setWalkthrough({ run: false }))
      return setTimeout(() => dispatch(setWalkthrough({ run: true })), 400)
    }
  }

  return (
    <Joyride
      continuous={true}
      run={run}
      steps={STEPS}
      stepIndex={step}
      scrollOffset={128}
      scrollToFirstStep={true}
      showProgress={true}
      showSkipButton={true}
      callback={onCallback}
      tooltipComponent={Tooltip}
    />
  )
}

export default Walkthrough
