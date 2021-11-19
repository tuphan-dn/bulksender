/**
 * Credit https://iconsax-react.pages.dev/
 */

import { forwardRef } from 'react'
import './index.less'

export type IconsaxVariant =
  | 'Linear'
  | 'Outline'
  | 'Bold'
  | 'Bulk'
  | 'Broken'
  | 'TwoTone'

const IconSax = forwardRef<
  HTMLElement,
  { name: string; className?: string; variant?: IconsaxVariant } & any
>(({ name, className, variant = 'Linear', ...props }, ref) => {
  const { [name]: Icon } = require('iconsax-react')
  const cln = className ? 'anticon ' + className : 'anticon'

  if (!Icon) throw new Error('Invalid iconsax name')
  return (
    <span className={cln} {...props} ref={ref}>
      <Icon className="sax-icon" variant={variant} />
    </span>
  )
})

export default IconSax
