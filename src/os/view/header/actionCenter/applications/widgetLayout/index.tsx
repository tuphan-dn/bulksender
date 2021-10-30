import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
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

import { RootDispatch } from 'os/store'
import { setActionCenterVisible } from 'os/store/ui.reducer'

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
  disabled = false,
}: {
  pages: AppPage
  onChange?: (pages: AppPage) => void
  disabled?: boolean
}) => {
  const history = useHistory()
  const dispatch = useDispatch<RootDispatch>()
  const [internalPages, setInternalPages] = useState(pages)
  const [activeId, setActiveId] = useState<string>('')
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const open = async (appId: string) => {
    await dispatch(setActionCenterVisible(false))
    return history.push(`/page/${appId}`)
  }

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
        {internalPages.map((appIds, i) => (
          <Col key={i} span={24}>
            <DroppablePage index={i} items={appIds} disabled={disabled}>
              {appIds.map((appId) => (
                <DraggableIcon
                  key={appId}
                  appId={appId}
                  disabled={disabled}
                  size={64}
                  onClick={() => open(appId)}
                />
              ))}
            </DroppablePage>
          </Col>
        ))}
      </Row>
      <DragOverlay>
        {activeId ? (
          <span style={{ opacity: 0.5 }}>
            <AppIcon appId={activeId} />
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default WidgetLayout
