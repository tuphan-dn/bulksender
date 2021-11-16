import { forwardRef } from 'react'

const IonIcon = forwardRef<
  HTMLElement,
  { name: string; className?: string; src?: string } & any
>(({ name, className, src, ...props }, ref) => {
  const cln = className ? 'anticon ' + className : 'anticon'
  return (
    <span className={cln} {...props}>
      <ion-icon ref={ref} name={name} src={src} />
    </span>
  )
})

export default IonIcon
