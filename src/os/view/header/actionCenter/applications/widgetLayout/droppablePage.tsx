import { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import { Row, Col, Button } from 'antd'
import IonIcon from 'shared/ionicon'

/**
 * DroppablePage render as a Row
 */
const DroppablePage = ({
  index,
  items,
  children,
  disabled = false,
  onRemove,
}: {
  index: number
  items: string[]
  children: ReactNode
  disabled?: boolean
  onRemove?: (index: number) => void
}) => {
  const { setNodeRef } = useDroppable({
    id: `droppable-${index}`,
    data: { isDroppableZone: true, index },
    disabled,
  })
  const style = disabled
    ? { transition: 'all 0.25s ease-in-out' }
    : {
        transition: 'all 0.25s ease-in-out',
        background: '#00000010',
        padding: 16,
        borderRadius: 16,
        minHeight: 100,
      }

  return (
    <SortableContext items={items}>
      <Row id={`droppable-${index}`} gutter={[16, 16]} ref={setNodeRef}>
        <Col span={24}>
          <div style={style}>
            <Row gutter={[16, 16]}>
              {children}
              {/* Button Remove Page */}
              {onRemove && !disabled && !items.length && (
                <Col flex="auto" style={{ textAlign: 'end' }}>
                  <Button
                    type="text"
                    icon={<IonIcon name="close-outline" />}
                    onClick={() => onRemove(index)}
                  />
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </SortableContext>
  )
}

export default DroppablePage
