import React from 'react'

import GlobalNavTools from './global-nav-tools'
import { SearchIcon } from 'components/icons/components/SearchIcon'
import { AddIcon } from 'components/icons/components/AddIcon'
import { EditIcon } from 'components/icons/components/EditIcon'
import { NotificationIcon } from 'components/icons/components/NotificationIcon'

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
