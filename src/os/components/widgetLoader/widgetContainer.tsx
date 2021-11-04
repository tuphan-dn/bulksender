import { forwardRef, ReactNode } from 'react'

import { Col } from 'antd'
import { DefaultCard, SolidCard } from './card'

const getWidgetResponsive = (size: WidgetSize = 'small') => {
  switch (size) {
    case 'large':
      return { xs: { span: 24 }, md: { span: 24 }, xl: { span: 24 } }
    case 'middle':
      return { xs: { span: 24 }, md: { span: 24 }, xl: { span: 12 } }
    default:
      return { xs: { span: 24 }, sm: { span: 12 }, xl: { span: 6 } }
  }
}

const WidgetContainer = forwardRef<
  HTMLDivElement,
  WidgetConfig & {
    children: ReactNode
  }
>((props, ref) => {
  const { size = 'small', type = 'solid', children, ...rest } = props

  // Widget type
  let CardWrapper = DefaultCard
  if (type === 'solid') CardWrapper = SolidCard
  // Widget size
  let responsive = getWidgetResponsive(size)
  const height = 1440 / 4 - 24

  return (
    <Col {...rest} style={{ height }} {...responsive} ref={ref}>
      <CardWrapper>{children}</CardWrapper>
    </Col>
  )
})

export default WidgetContainer
