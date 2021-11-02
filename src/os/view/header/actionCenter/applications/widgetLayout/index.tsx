import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

import { Row, Col, Button } from 'antd'
import IonIcon from 'shared/ionicon'
import AppIcon from 'os/components/appIcon'
import DroppablePage from './droppablePage'
import DraggableIcon from './draggableIcon'
import DraggableAction from './draggableAction'

import { RootDispatch, RootState } from 'os/store'
import { setActionCenterVisible } from 'os/store/ui.reducer'
import { uninstallApp, updatePage } from 'os/store/page.reducer'

// Mixed Strategy
const mixedStrategy = (
  ...args: Parameters<typeof rectIntersection | typeof closestCorners>
) => {
  const intersecting = rectIntersection(...args)
  return intersecting ? intersecting : closestCorners(...args)
}

const WidgetLayout = ({ disabled = true }: { disabled?: boolean }) => {
  const history = useHistory()
  const dispatch = useDispatch<RootDispatch>()
  const [internalPages, setInternalPages] = useState<AppPage>([])
  const [activeId, setActiveId] = useState<string>('')
  const [actionId, setActionId] = useState('')
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
  const { appPage } = useSelector((state: RootState) => state.page)

  useEffect(() => {
    setInternalPages(appPage)
  }, [appPage])

  const open = async (appId: string) => {
    await dispatch(setActionCenterVisible(false))
    return history.push(`/app/${appId}`)
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
      if (over?.id?.startsWith('action-')) return setActionId(over.id)
      else setActionId('')

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

  const onDragEnd = async ({ over, active }: DragEndEvent) => {
    let newPages = internalPages
    if (over?.id === 'action-remove') {
      const activeId = active.id
      newPages = newPages.map((appIds) =>
        appIds.filter((appId) => appId !== activeId),
      )
      await setInternalPages(newPages)
      return dispatch(uninstallApp(activeId))
    }
    setActiveId('')
    return dispatch(updatePage(newPages))
  }

  const onAddPage = () => {
    const newPages = [...internalPages, []]
    return dispatch(updatePage(newPages))
  }

  const onRemovePage = (pageIdx: number) => {
    const newPages = internalPages.filter((val, idx) => idx !== pageIdx)
    return dispatch(updatePage(newPages))
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
            <DroppablePage
              index={i}
              items={appIds}
              disabled={disabled}
              onRemove={onRemovePage}
            >
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
        {!disabled && (
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <DraggableAction id="action-remove">
                  <Button
                    block
                    disabled={!activeId}
                    type={actionId ? 'primary' : undefined}
                    className="contained"
                    icon={<IonIcon name="trash-outline" />}
                  >
                    Drop to delete
                  </Button>
                </DraggableAction>
              </Col>
              <Col span={12}>
                <Button
                  block
                  className="contained"
                  icon={<IonIcon name="add-outline" />}
                  onClick={onAddPage}
                >
                  New Page
                </Button>
              </Col>
            </Row>
          </Col>
        )}
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
