import { SelectionPopover } from './popover-selection'
import { useState } from 'react'
import Lorem from 'react-lorem-component'

export default {
  title: 'Components/PopoverSelection'
}

export const normal = () => {
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
      <Lorem
        count={4}
        paragraphLowerBound={8}
        paragraphUpperBound={20}
      />
      {highlight ? (
        <SelectionPopover
            anchor={highlight}
            disablePopup={clearSelection}
        />
      ) : null}
    </div>
  )
}
