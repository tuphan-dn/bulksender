import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { RootDispatch } from 'store'
import { resize } from 'store/ui.reducer'

const UIWatcher = () => {
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    window.onresize = () => dispatch(resize())
  }, [dispatch])

  return <Fragment />
}

export default UIWatcher
