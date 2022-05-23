import { Fragment, useEffect } from 'react'
import LazyLoad from '@senswap/react-lazyload'

type PropsLoadMore = { callback: () => void }

const LoadMore = ({ callback }: PropsLoadMore) => {
  useEffect(() => {
    callback()
  }, [callback])

  return <Fragment />
}
const WrapLoadMore = (props: PropsLoadMore) => {
  return (
    <LazyLoad overflow>
      <LoadMore {...props} />
    </LazyLoad>
  )
}
export default WrapLoadMore
