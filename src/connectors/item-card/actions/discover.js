import React from 'react'
import { ItemActions } from 'components/item-menus/flat'
import { ReportIcon } from '@pocket/web-ui'
import { SaveToPocket } from 'components/save-to-pocket/save-to-pocket'

export function ActionsDiscover({
  id,
  isAuthenticated,
  onSave = () => {},
  onReportFeedback = () => {}
}) {
  return (
    <div className="actions">
      <SaveToPocket
        saveAction={onSave}
        isAuthenticated={isAuthenticated}
        id={id}
      />
      <ItemActions
        menuItems={[]}
        overflowItems={[
          {
            label: 'Report',
            actionText: 'Report',
            icon: <ReportIcon />,
            onClick: onReportFeedback
          }
        ]}
      />
    </div>
  )
}
