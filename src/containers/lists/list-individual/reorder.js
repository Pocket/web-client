import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { css, cx } from 'linaria'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ListSortHeader } from 'components/headers/lists-header'
import { IndividualListReorderCard } from 'connectors/lists/individual-list.reorder.card'
import { reorderArray } from 'common/utilities/object-array/object-array'

const itemStyles = css`
  user-select: none;
  cursor: grab;

  &.isDragging {
    /*
      in case we want to add custom styles to the item being dragged around
      we'll want to target article here
    */
  }
`

const listStyles = css`
  &.isDraggingOver {
    /*
      in case we want to add custom styles to the list background
      behind the item being dragged around
    */
  }
`

export const ReorderList = ({ id, toggleSort }) => {
  const dispatch = useDispatch()

  const { title, description, listItemIds } = useSelector((state) => state.listsDisplay[id])
  const [items, setItems] = useState(listItemIds)

  const handleSave = () => {
    // dispatch(saveListOrderAction(items))
    // dispatch(sendSnowplowEvent('shareable-list.sort.save', analyticsData??))
    toggleSort()
  }

  const handleCancel = () => {
    // dispatch(sendSnowplowEvent('shareable-list.sort.cancel', analyticsData??))
    toggleSort()
  }

  const handleOnDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) return

    const newItems = reorderArray(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(newItems)
  }

  return (
    <main className="main">
      <ListSortHeader
        title={title}
        description={description}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cx(listStyles, snapshot.isDraggingOver && 'isDraggingOver')}
            >
              {items.map((id, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cx(itemStyles, snapshot.isDragging && 'isDragging')}
                    >
                      <IndividualListReorderCard
                        key={id}
                        id={id}
                        position={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  )
}
