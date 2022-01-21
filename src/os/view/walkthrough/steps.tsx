import { ReactNode } from 'react'
import { Step } from 'react-joyride'

import { Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

export const step = ({
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

export const DEFAULT_STEPS: Step[] = []

export const NEWCOMER_STEPS: Step[] = [
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

export const REFERRAL_STEPS: Step[] = [
  step({
    content: (
      <Typography.Text>
        Click the icon <IonIcon name="menu-outline" /> to access the referral
        system.
      </Typography.Text>
    ),
    target: '#button-action-center',
    title: 'Hoorays, you got invited.',
  }),
  step({
    content: (
      <Typography.Text>
        Switch to the <strong>User</strong> tab to enter the invitation link.
      </Typography.Text>
    ),
    target: '#action-center-tab-user',
    title: 'Enter the invitation link',
  }),
  step({
    content: (
      <Typography.Text>
        Click the <strong>Confirm</strong> button to get closer to the reward.
      </Typography.Text>
    ),
    target: '#button-confirm-referral',
    title: 'Confirm the invitation link',
  }),
]
