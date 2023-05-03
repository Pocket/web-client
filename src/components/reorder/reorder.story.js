import { useState } from 'react'
import { ReorderList, ReorderItem } from './reorder'
import { css } from 'linaria'
import { COLORS } from 'mocks/_data/colors'

export default {
  title: 'Components/Reorder'
}

const listStyles = css`
  padding: 5px;
  background: tan;

  &.isDraggingOver {
    background: lightblue;
  }
`

const itemStyles = css`
  padding: 10px;
  background: lavender;

  &.isDragging {
    background: pink;
  }
`

export const simple = () => {
  const [items, setItems] = useState(COLORS)
  const updateList = (newItems) => setItems(newItems)

  return (
    <ReorderList listItems={items} updateList={updateList} className={listStyles}>
      {items.map((color, index) => (
        <ReorderItem id={color} index={index} className={itemStyles}>
          {color}
        </ReorderItem>
      ))}
    </ReorderList>
  )
}
