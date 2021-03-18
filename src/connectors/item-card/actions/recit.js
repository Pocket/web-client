import React from 'react'
import { SaveToPocket } from 'components/save-to-pocket/save-to-pocket'

export function ActionsRecit({
  id,
  isAuthenticated,
  onSave = () => {},
  saveStatus
}) {
  return (
    <div className="actions">
      <SaveToPocket
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        saveStatus={saveStatus}
        id={id}
        readNow={true}
      />
    </div>
  )
}
