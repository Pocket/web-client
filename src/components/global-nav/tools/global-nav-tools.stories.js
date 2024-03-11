import React from 'react'

import GlobalNavTools from './global-nav-tools'
import { SearchIcon } from '@ui/icons/SearchIcon'
import { AddIcon } from '@ui/icons/AddIcon'
import { EditIcon } from '@ui/icons/EditIcon'
import { NotificationIcon } from '@ui/icons/NotificationIcon'

export default {
  title: 'GlobalNav/GlobalNavTools',
  component: GlobalNavTools
}

export const standard = () => (
  <GlobalNavTools
    tools={[
      { name: 'search', label: 'Search', icon: <SearchIcon /> },
      { name: 'add-item', label: 'Save a URL', icon: <AddIcon /> },
      { name: 'bulk-edit', label: 'Bulk Edit', icon: <EditIcon /> },
      {
        name: 'notifications',
        label: 'View Activity',
        icon: <NotificationIcon />
      }
    ]}
  />
)
