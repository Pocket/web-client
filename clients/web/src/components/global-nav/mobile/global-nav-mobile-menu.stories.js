import React from 'react'
import GlobalNavMobileMenu from './global-nav-mobile-menu'
import { DiscoverIcon } from '@ui/icons/DiscoverIcon'
import { ListViewIcon } from '@ui/icons/ListViewIcon'

const baseProps = {
  appRootSelector: '#root',
  links: [
    {
      name: 'discover',
      id: 'global-nav-discover-link',
      label: 'Discover',
      url: 'https://getpocket.com/explore',
      icon: <DiscoverIcon />
    },
    {
      name: 'saves',
      id: 'global-nav-saves-link',
      label: 'Saves',
      url: 'https://getpocket.com/saves',
      icon: <ListViewIcon />
    },
    {
      name: 'disabled-link',
      id: 'disabled-link',
      label: 'Disabled Link',
      url: 'https://getpocket.com/saves',
      isDisabled: true
    },
    {
      name: 'no-icon',
      id: 'no-icon',
      label: 'No Icon',
      url: 'https://getpocket.com/saves'
    }
  ]
}

export default {
  title: 'GlobalNav/GlobalNavMobileMenu',
  component: GlobalNavMobileMenu
}

export const standard = () => <GlobalNavMobileMenu {...baseProps} />
export const premiumNudge = () => (
  <GlobalNavMobileMenu isUserLoggedIn={true} isUserPremium={false} {...baseProps} />
)
