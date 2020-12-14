import React from 'react'
import { ItemActions } from 'components/item-menus/flat'
import { SaveIcon } from '@pocket/web-ui'
import { ReportIcon } from '@pocket/web-ui'

export function ActionsDiscover({ id, isAuthenticated, save_status }) {
  const onSaveClick = () => {}
  const onReportFeedback = () => {}

  return (
    <div className="actions">
      <ItemActions
        menuItems={[
          {
            label: 'Save To Pocket',
            icon: <SaveIcon />,
            onClick: onSaveClick
          }
        ]}
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
