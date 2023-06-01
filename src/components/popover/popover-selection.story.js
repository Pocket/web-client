import { SelectionPopover } from './popover-selection'
import { useState } from 'react'
import { css } from '@emotion/css'

export default {
  title: 'Article/Annotations'
}

export const Selection = () => {
  const [highlight, setHighlight] = useState(null)

  const toggleHighlight = () => {
    const selection = window.getSelection()
    if (selection.toString()) {
      setHighlight(selection)
    } else if (highlight) {
      setHighlight(null)
    }
  }

  const clearSelection = () => {
    window.getSelection().removeAllRanges()
    toggleHighlight()
  }

  return (
    <div onMouseUp={toggleHighlight}>
      <div className={contentStyle}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto cumque necessitatibus
        minus, commodi laudantium pariatur nesciunt veniam, animi et, dolore explicabo quis! Eveniet
        porro deleniti id, laboriosam ipsam maiores temporibus?
      </div>
      {highlight ? <SelectionPopover anchor={highlight} disablePopup={clearSelection} /> : null}
    </div>
  )
}

const contentStyle = css`
  margin-top: 6rem;
  max-width: 400px;
`
