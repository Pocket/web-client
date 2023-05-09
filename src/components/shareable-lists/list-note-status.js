import { ListStatusToggle } from './list-status-toggle'
import { VisibilityOptions } from './visibility-options'

// temporary component for convenience
// this will go away once we release notes to the public
export const ListNoteStatus = ({
  handleSetStatus,
  status,
  listItemNoteVisibility,
  enrolledDev
}) => {
  const StatusDropdown = enrolledDev ? VisibilityOptions : ListStatusToggle

  return (
    <StatusDropdown
      handleSetStatus={handleSetStatus}
      status={status}
      listItemNoteVisibility={listItemNoteVisibility}
    />
  )
}
