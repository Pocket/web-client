import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { css, cx } from 'linaria'
import { reorderArray } from 'common/utilities/object-array/object-array'

const itemStyles = css`
  user-select: none;
  cursor: grabbing;

  &.isDragging {
    cursor: grabbing;
  }
`

export const ReorderList = ({
  id = 'droppable',
  listItems,
  updateList,
  className,
  children
}) => {
  const handleOnDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) return

    const newItems = reorderArray(
      listItems,
      result.source.index,
      result.destination.index
    )

    updateList(newItems)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cx(className, snapshot.isDraggingOver && 'isDraggingOver')}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export const ReorderItem = ({
  id,
  index,
  className,
  children
}) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cx(itemStyles, className, snapshot.isDragging && 'isDragging')}
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}
