/**
 * IonIcon 5
 * Credit https://ionic.io/ionicons
 */

import { forwardRef } from 'react'
import { CUSTOM_ICONS } from './customs'

/**
 * IonIcon
 * @param name The icon name. You can find it here https://ionic.io/ionicons
 * @param className To modify the span class
 */
const IonIcon = forwardRef<
  HTMLElement,
  { name: string; className?: string } & any
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
