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
  const [internalAppIds, setInternalPages] = useState<AppIds>([])
  const [activeId, setActiveId] = useState<string>('')
  const [actionId, setActionId] = useState('')
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
  const { appIds } = useSelector((state: RootState) => state.page)

  useEffect(() => {
    setInternalPages(appIds)
  }, [appIds])

  const open = async (appId: string) => {
    await dispatch(setActionCenterVisible(false))
    return history.push(`/app/${appId}`)
  }

  const onDragStart = ({ active }: DragStartEvent) => setActiveId(active.id)
  const onDragOver = useCallback(
    ({ over, active }: DragOverEvent) => {
      // Remove an app
      if (over?.id?.startsWith('action-')) return setActionId(over.id)
      else setActionId('')
      // Sort apps
      const activeAppIndex = active.id
      const overAppIndex = over?.id || activeAppIndex
      // Sort the page
      const newAppIds = arrayMove(
        internalAppIds,
        internalAppIds.indexOf(activeAppIndex),
        internalAppIds.indexOf(overAppIndex),
      )
      // Update new pages
      return setInternalPages(newAppIds)
    },
    [internalAppIds],
  )
  const onDragEnd = async ({ over, active }: DragEndEvent) => {
    if (over?.id === 'action-remove') {
      const activeId = active.id
      const newInternalAppIds = internalAppIds.filter(
        (appId) => appId !== activeId,
      )
      await setInternalPages(newInternalAppIds)
      return dispatch(uninstallApp(activeId))
    }
    return dispatch(updatePage(internalAppIds))
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
          <DroppablePage index={0} items={internalAppIds} disabled={disabled}>
            {internalAppIds.map((appId) => (
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
        {!disabled && (
          <Col span={24}>
            <DraggableAction id="action-remove">
              <Button
                block
                disabled={!activeId}
                type={actionId ? 'primary' : undefined}
                className="contained"
                icon={<IonIcon name="trash-outline" />}
              >
                Drop here to delete
              </Button>
            </DraggableAction>
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
