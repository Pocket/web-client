// Libraries

import { css, cx } from '@emotion/css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Dependencies
import { reorderArray } from 'common/utilities/object-array/object-array'

// Types
import type { ReactNode } from 'react'
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd'

/**
 * ReorderList
 * Allow users to reorder a list of items through drag and drop.
 *
 */
interface ListItem {
  id: string
}

interface ReorderListProps {
  id?: string
  listItems: ListItem[]
  updateList: (listItems: ListItem[]) => void
  className?: string
  children: ReactNode
}

export const ReorderList = ({
  id = 'droppable',
  listItems,
  updateList,
  className,
  children
}: ReorderListProps) => {
  const handleOnDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) return

    const newItems: ListItem[] = reorderArray(
      listItems,
      result.source.index,
      result.destination.index
    )

    updateList(newItems)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cx(className, Boolean(snapshot.isDraggingOver) && 'isDraggingOver')}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

/**
 * ReorderItem
 * A child component of ReorderList and represents an individual item within the list.
 *
 */

interface ReorderItemProps {
  id: string
  index: number
  className?: string
  children: ReactNode
}

export const ReorderItem = ({ id, index, className, children }: ReorderItemProps) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cx(itemStyles, className, Boolean(snapshot.isDragging) && 'isDragging')}>
          {children}
        </div>
      )}
    </Draggable>
  )
}

/**
 * COMPONENT STYLES
 * -------------------------------------------------------------------------- */
const itemStyles = css`
  user-select: none;
  cursor: grabbing;

  &.isDragging {
    cursor: grabbing;
  }
`
