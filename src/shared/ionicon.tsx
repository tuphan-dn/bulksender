import { forwardRef } from 'react'

const IonIcon = forwardRef<
  HTMLElement,
  { name: string; className?: string } & any
>(({ name, className, ...props }, ref) => {
  const cln = className ? 'anticon ' + className : 'anticon'
  return (
    <span className={cln} {...props}>
      <ion-icon ref={ref} name={name} />
    </span>
  )
})

export default IonIcon
