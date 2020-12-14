import React from 'react'
import { ItemActions } from 'components/item-menus/flat'
import { SaveIcon } from '@pocket/web-ui'

export function ActionsMessage({ id, isAuthenticated }) {
  const onSaveClick = () => {}

  return (
    <div className="actions">
      <ItemActions
        menuItems={[
          {
            label: 'Save To Pocket',
            actionText: 'Save',
            icon: <SaveIcon />,
            onClick: onSaveClick
          }
        ]}
      />
    </div>
  )
}
