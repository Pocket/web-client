import React from 'react'

import GlobalNavTools from './global-nav-tools'
import {
  SearchIcon,
  AddIcon,
  EditIcon,
  NotificationIcon,
} from 'components/icons/icons'

export default {
  title: 'Components/GlobalNav/GlobalNavTools',
  component: GlobalNavTools,
  // NOTE: not using knobs because including a React component within a prop
  // decorated with a knob results in recursion
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
        icon: <NotificationIcon />,
      },
    ]}
  />
)
