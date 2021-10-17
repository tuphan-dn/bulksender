import { forwardRef, Suspense } from 'react'
import { useRemoteModule } from 'react-dynamic-remote-component'

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
  const { default: Component } = useRemoteModule({
    url: 'https://descartesnetwork.github.io/senhub/index.js',
    scope: 'senhub',
    module: './ionicon',
  })
  return (
    <Suspense fallback="ionicon">
      <Component {...props} ref={ref} />
    </Suspense>
  )
})
