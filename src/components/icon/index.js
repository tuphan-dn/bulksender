import { forwardRef } from 'react'

const Icon = forwardRef(({ className, name, ...others }, ref) => {
  const cln = className ? 'anticon ' + className : 'anticon'
  return (
    <span className={cln} {...others}>
      <ion-icon ref={ref} name={name} />
    </span>
  )
})

export default Icon
