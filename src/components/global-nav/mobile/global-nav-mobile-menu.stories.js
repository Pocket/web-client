import React from 'react'
import GlobalNavMobileMenu from './global-nav-mobile-menu'
import { DiscoverIcon } from 'components/icons/components/DiscoverIcon'
import { ListViewIcon } from 'components/icons/components/ListViewIcon'

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
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: 'My List',
      url: 'https://getpocket.com/my-list',
      icon: <ListViewIcon />
    },
    {
      name: 'disabled-link',
      id: 'disabled-link',
      label: 'Disabled Link',
      url: 'https://getpocket.com/my-list',
      isDisabled: true
    },
    {
      name: 'no-icon',
      id: 'no-icon',
      label: 'No Icon',
      url: 'https://getpocket.com/my-list'
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
