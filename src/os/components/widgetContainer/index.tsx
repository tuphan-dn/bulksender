import {
  CSSProperties,
  ElementType,
  forwardRef,
  Fragment,
  ReactNode,
} from 'react'

import { Row, Col } from 'antd'
import { DefaultCard, SolidCard } from './card'

const SPACING = 4

type Props = WidgetConfig & {
  children: ReactNode
  Wrapper?: ElementType
  style?: CSSProperties
}

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

const WidgetBody = (props: Props) => {
  const { Wrapper = Fragment, children, type = 'solid' } = props
  let CardWrapper = DefaultCard
  if (type === 'solid') CardWrapper = SolidCard
  return (
    <Col span={24} style={{ height: `calc(100% - ${SPACING}px)` }}>
      <Wrapper>
        <CardWrapper>{children}</CardWrapper>
      </Wrapper>
    </Col>
  )
}

const WidgetContainer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { size, children, style = {}, ...rest } = props

  // Compute widget size
  let responsive = getWidgetResponsive(size)

  // Widget style
  const widgetStyle: any = {
    height: 1400 / 4 - 16 + SPACING,
    ...style,
  }

  return (
    <Col style={widgetStyle} {...rest} {...responsive} ref={ref}>
      <Row gutter={[SPACING, SPACING]} style={{ height: '100%' }}>
        <WidgetBody {...props} />
      </Row>
    </Col>
  )
})

export default WidgetContainer
