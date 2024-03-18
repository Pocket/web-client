import React from 'react'

import { SearchIcon } from '@ui/icons/SearchIcon'
import { AddIcon } from '@ui/icons/AddIcon'
import { EditIcon } from '@ui/icons/EditIcon'
import { NotificationIcon } from '@ui/icons/NotificationIcon'
import GlobalNav from './global-nav'

export default {
  title: 'GlobalNav/TopNav',
  component: GlobalNav
}

const baseProps = {
  selectedLink: 'discover',
  appRootSelector: '#root',
  accountName: 'Fluffers',
  flagsReady: true
}

export const standard = () => <GlobalNav {...baseProps} />
export const loggedInUser = () => <GlobalNav {...baseProps} isLoggedIn />
export const premiumUser = () => (
  <GlobalNav {...baseProps} isLoggedIn isPremium avatarSrc="http://placekitten.com/150/150" />
)
export const withTools = () => (
  <GlobalNav
    {...baseProps}
    isLoggedIn
    avatarSrc="http://placekitten.com/150/150"
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
export const childrenSpecified = () => (
  <GlobalNav {...baseProps}>
    <p style={{ margin: 0 }}>show this text instead of the standard nav kit please</p>
  </GlobalNav>
)
