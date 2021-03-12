import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'

import { SearchIcon, AddIcon, EditIcon, NotificationIcon } from '@pocket/web-ui'
import GlobalNav from './global-nav'

const globalNavKnobs = defineKnobs((props) => {
  return {
    isLoggedIn: boolean('isLoggedIn', props.isLoggedIn),
    isPremium: boolean('isPremium', props.isPremium),
    avatarSrc: text('avatarSrc', props.avatarSrc)
  }
})

export default {
  title: 'GlobalNav/GlobalNav',
  component: GlobalNav,
  decorators: [globalNavKnobs]
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
  <GlobalNav
    {...baseProps}
    isLoggedIn
    isPremium
    avatarSrc="http://placekitten.com/150/150"
  />
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
    <p style={{ margin: 0 }}>
      show this text instead of the standard nav kit please
    </p>
  </GlobalNav>
)
