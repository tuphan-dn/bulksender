import { forwardRef, lazy, Suspense } from 'react'

const IonIcon = forwardRef<HTMLElement, { name: string; className?: string }>(
  ({ name, className, ...props }, ref) => {
    const cln = className ? 'anticon ' + className : 'anticon'
    return (
      <span className={cln} {...props}>
        <ion-icon ref={ref} name={name} />
      </span>
    )
  },
)

export default IonIcon

export const RemoteIonIcon = forwardRef<
  HTMLElement,
  { name: string; className?: string }
>((props, ref) => {
  const Component = lazy(() => import('senhub/ionicon'))
  return (
    <Suspense fallback="ionicon">
      <Component {...props} ref={ref} />
    </Suspense>
  )
})
