import { useSortable } from '@dnd-kit/sortable'
import { Col, ColProps } from 'antd'
import { ReactNode } from 'react'

/**
 * DraggableIcon render as a Col
 */
const DraggableAction = ({
  id,
  children,
  ...rest
}: {
  id: string
  children: ReactNode
} & ColProps) => {
  const { setNodeRef } = useSortable({
    id: id,
  })

  return (
    <Col id={id} ref={setNodeRef} {...rest}>
      {children}
    </Col>
  )
}

export default DraggableAction
