import { useState } from 'react'
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

import register from 'senhub.register'

// Mixed Strategy
const mixedStrategy = (
  ...args: Parameters<typeof rectIntersection | typeof closestCorners>
) => {
  const intersecting = rectIntersection(...args)
  return intersecting ? intersecting : closestCorners(...args)
}

const WidgetLayout = () => {
  const [pages, setPages] = useState([Object.keys(register), []])
  const [activeId, setActiveId] = useState<string>('')
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  // Derive container
  const findContainer = ({ id, data }: { id: string; data: any }) => {
    let pageIndex = null
    let appIndex = null
    if (data?.current?.isDroppableZone) {
      pageIndex = data.current.index
      appIndex = -1
    } else {
      pages.forEach((appIds, i) =>
        appIds.forEach((appId: string, j: number) => {
          if (appId === id) {
            pageIndex = i
            appIndex = j
          }
        }),
      )
    }
    return [pageIndex, appIndex]
  }

  const onDragStart = ({ active }: DragStartEvent) => setActiveId(active.id)
  const onDragOver = ({ over, active }: DragOverEvent) => {
    const [activePageIndex, activeAppIndex] = findContainer(active)
    const [overPageIndex, overAppIndex] = over
      ? findContainer(over)
      : [activePageIndex, activeAppIndex]
    // Do nothing is still in the same page
    if (activePageIndex === overPageIndex) return
    // Mitigate the logo from a page to another page
    const newPages = [...pages]
    const activePage = [...pages[activePageIndex]]
    const overPage = [...pages[overPageIndex]]
    // Remove from the source page
    activePage.splice(activePage.indexOf(active.id), 1)
    // Add to the destination page
    if (overAppIndex === -1) overPage.push(active.id)
    else overPage.splice(overAppIndex, 0, active.id)
    // Update new pages
    newPages[activePageIndex] = activePage
    newPages[overPageIndex] = overPage
    return setPages(newPages)
  }
  const onDragEnd = ({ over, active }: DragEndEvent) => {
    const [activePageIndex] = findContainer(active)
    const [overPageIndex] = over ? findContainer(over) : [activePageIndex]
    // Do nothing is suddently drop in a different page
    if (activePageIndex !== overPageIndex) return
    // Sort the page
    const newPages = [...pages]
    const activePage = [...pages[activePageIndex]]
    const newPage = arrayMove(
      activePage,
      activePage.indexOf(active.id),
      activePage.indexOf(over?.id || active.id),
    )
    // Update new pages
    newPages[activePageIndex] = newPage
    return setPages(newPages)
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
          {pages.map((appIds, i) => (
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
