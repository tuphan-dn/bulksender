import { useCallback, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  closestCorners,
  rectIntersection,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { Row, Col } from 'antd'
import AppIcon from 'os/components/appIcon'
import DroppablePage from './droppablePage'
import DraggableIcon from './draggableIcon'

// Mixed Strategy
const mixedStrategy = (
  ...args: Parameters<typeof rectIntersection | typeof closestCorners>
) => {
  const intersecting = rectIntersection(...args)
  return intersecting ? intersecting : closestCorners(...args)
}

const WidgetLayout = ({
  pages,
  onChange = () => {},
}: {
  pages: string[][]
  onChange?: (pages: string[][]) => void
}) => {
  const [internalPages, setInternalPages] = useState(pages)
  const [activeId, setActiveId] = useState<string>('')
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  // Derive container
  const findContainer = useCallback(
    ({ id, data }: { id: string; data: any }) => {
      let pageIndex = null
      let appIndex = null
      if (data?.current?.isDroppableZone) {
        pageIndex = data.current.index
        appIndex = -1
      } else {
        internalPages.forEach((appIds, i) =>
          appIds.forEach((appId: string, j: number) => {
            if (appId === id) {
              pageIndex = i
              appIndex = j
            }
          }),
        )
      }
      return [pageIndex, appIndex]
    },
    [internalPages],
  )

  const onDragStart = ({ active }: DragStartEvent) => setActiveId(active.id)
  const onDragOver = useCallback(
    ({ over, active }: DragOverEvent) => {
      const [activePageIndex, activeAppIndex] = findContainer(active)
      const [overPageIndex, overAppIndex] = over
        ? findContainer(over)
        : [activePageIndex, activeAppIndex]
      // New page instances
      const newPages = [...internalPages]
      const activePage = [...internalPages[activePageIndex]]
      const overPage = [...internalPages[overPageIndex]]
      if (activePageIndex === overPageIndex) {
        // Sort the page
        const newPage = arrayMove(
          activePage,
          activePage.indexOf(active.id),
          activePage.indexOf(over?.id || active.id),
        )
        // Update new pages
        newPages[activePageIndex] = newPage
      } else {
        // Remove from the source page
        activePage.splice(activePage.indexOf(active.id), 1)
        // Add to the destination page
        if (overAppIndex === -1) overPage.push(active.id)
        else overPage.splice(overAppIndex, 0, active.id)
        // Update new pages
        newPages[activePageIndex] = activePage
        newPages[overPageIndex] = overPage
      }
      return setInternalPages(newPages)
    },
    [internalPages, findContainer],
  )
  const onDragEnd = ({ over, active }: DragEndEvent) => {
    return onChange(internalPages)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={mixedStrategy}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {internalPages.map((appIds, i) => (
            <DroppablePage key={i} index={i} items={appIds}>
              {appIds.map((appId, i) => (
                <DraggableIcon key={appId} appId={appId} />
              ))}
            </DroppablePage>
          ))}
        </Col>
      </Row>
      <DragOverlay>
        {activeId ? (
          <span style={{ opacity: 0.5 }}>
            <AppIcon appId={activeId} />{' '}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default WidgetLayout
