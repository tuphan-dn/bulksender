import { forwardRef } from 'react'

import IconTele from 'os/static/images/icon-telegram.svg'

const CUSTOM_ICONS: Record<string, string> = {
  'logo-telegram': IconTele,
}

const IonIcon = forwardRef<
  HTMLElement,
  { name: string; className?: string; src?: string } & any
>(({ name, className, ...props }, ref) => {
  const cln = className ? 'anticon ' + className : 'anticon'

  return (
    <span className={cln} {...props}>
      {CUSTOM_ICONS[name] ? (
        <ion-icon ref={ref} src={CUSTOM_ICONS[name]} />
      ) : (
        <ion-icon ref={ref} name={name} />
      )}
    </span>
  )
})

export default IonIcon
