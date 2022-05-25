/**
 * IonIcon 5
 * Credit https://ionic.io/ionicons
 */

import { forwardRef, Fragment } from 'react'
import { CUSTOM_ICONS } from './customs'
import { Helmet } from 'react-helmet'

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
    <Fragment>
      <Helmet>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        />
      </Helmet>
      <span className={cln} {...props}>
        {CUSTOM_ICONS[name] ? (
          <ion-icon ref={ref} src={CUSTOM_ICONS[name]} />
        ) : (
          <ion-icon ref={ref} name={name} />
        )}
      </span>
    </Fragment>
  )
})

export default IonIcon
