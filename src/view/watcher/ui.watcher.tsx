import { Fragment, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Connection } from '@solana/web3.js'

import { notification } from 'antd'

import configs from 'configs'
import { RootDispatch } from 'store'
import { resize, setNetworkStatus } from 'store/ui.reducer'

const {
  sol: { node },
} = configs
const connection = new Connection(node)
let intervalId: ReturnType<typeof setTimeout> | undefined

export type Notification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}

declare global {
  interface Window {
    notify: ({ type, description, onClick }: Notification) => void
  }
}

const UIWatcher = () => {
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch<RootDispatch>()

  // Notification system
  window.notify = ({ type, description, onClick = () => {} }: Notification) => {
    return api[type]({
      message: type.toUpperCase(),
      description,
      onClick,
      style: { cursor: 'pointer' },
    })
  }

  // Intervally ping solana cluster
  const ping = useCallback(async () => {
    try {
      if (!window.navigator.onLine) return dispatch(setNetworkStatus(0))
      const start = Date.now()
      await connection.getVersion()
      const end = Date.now()
      const duration = end - start
      if (duration < 250) return dispatch(setNetworkStatus(3))
      if (duration < 1000) return dispatch(setNetworkStatus(2))
      return dispatch(setNetworkStatus(1))
    } catch (er) {
      return dispatch(setNetworkStatus(0))
    }
  }, [dispatch])
  useEffect(() => {
    if (intervalId) clearInterval(intervalId)
    ping() // Init the network status
    intervalId = setInterval(ping, 10000)
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [ping])

  // Listen window events
  useEffect(() => {
    window.onresize = () => dispatch(resize())
  }, [dispatch])

  return <Fragment>{contextHolder}</Fragment>
}

export default UIWatcher
