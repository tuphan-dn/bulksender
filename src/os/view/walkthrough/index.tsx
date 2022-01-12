import { useEffect, ReactNode } from 'react'
import { account } from '@senswap/sen-js'
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from 'react-joyride'

import { Typography } from 'antd'
import Tooltip from './tooltip'

import {
  useRootSelector,
  RootState,
  useRootDispatch,
  RootDispatch,
} from 'os/store'
import { setWalkthrough } from 'os/store/walkthrough.reducer'
import './index.os.less'

const step = ({
  content,
  target,
  title,
}: {
  content: ReactNode
  target: string
  title: string
}) => {
  return {
    content,
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    target,
    title: <Typography.Title level={5}>{title}</Typography.Title>,
  }
}

const STEPS: Step[] = [
  step({
    content: (
      <Typography.Text>
        Click the <b>Store</b> button to explore the numerous DeFi applications.
      </Typography.Text>
    ),
    target: '#store-nav-button',
    title: 'Search an app',
  }),
  step({
    content: (
      <Typography.Text>
        Find an application in the list and click the <b>Install</b> button to
        set up the application.
      </Typography.Text>
    ),
    target: '#install-action-button',
    title: 'Install an app',
  }),
  step({
    content: (
      <Typography.Text>
        Click the <b>Open</b> button to explore more interesting features.
      </Typography.Text>
    ),
    target: '#open-action-button',
    title: 'Open the app',
  }),
  step({
    content: (
      <Typography.Text>
        Helps you keep an overview and quick actions with many applications at
        the same time.
      </Typography.Text>
    ),
    target: '#dashboard-nav-button',
    title: 'Your Dashboard',
  }),
]

const Walkthrough = () => {
  const dispatch = useRootDispatch<RootDispatch>()
  const {
    wallet: { address },
    walkthrough: { run, step },
    flags: { visited },
  } = useRootSelector((state: RootState) => state)

  useEffect(() => {
    if (account.isAddress(address) && !visited)
      dispatch(setWalkthrough({ run: true }))
  }, [address, dispatch, visited])

  const onCallback = async ({
    type,
    status,
    step: { target },
  }: CallBackProps) => {
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (options.includes(status))
      return dispatch(setWalkthrough({ run: false }))
    if ((EVENTS.TARGET_NOT_FOUND as string) === type) {
      await dispatch(setWalkthrough({ run: false }))
      const intervalId = setInterval(() => {
        const element = document.querySelector(target as string)
        const { x } = element?.getBoundingClientRect() || { x: -1 }
        // Make sure that there exits a target in the view port horizontally
        if (x > 0 && x < window.innerWidth) {
          clearInterval(intervalId)
          return dispatch(setWalkthrough({ run: true }))
        }
      }, 500)
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
