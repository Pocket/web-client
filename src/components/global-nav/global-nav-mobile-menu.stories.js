import React from 'react'
import { object, text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'
import GlobalNavMobileMenu from './global-nav-mobile-menu'
import { DiscoverIcon, ListViewIcon } from '../..'

const globalNavLinksKnobs = defineKnobs((props) => {
  return {
    links: object('links', props.links),
    selectedLink: text('selectedLink', props.selectedLink || 'discover'),
  }
})

const baseProps = {
  appRootSelector: '#root',
  links: [
    {
      name: 'discover',
      id: 'global-nav-discover-link',
      label: 'Discover',
      url: 'https://getpocket.com/explore',
      icon: <DiscoverIcon />,
    },
    {
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: 'My List',
      url: 'https://app.getpocket.com',
      icon: <ListViewIcon />,
    },
    {
      name: 'disabled-link',
      id: 'disabled-link',
      label: 'Disabled Link',
      url: 'https://app.getpocket.com',
      isDisabled: true,
    },
    {
      name: 'no-icon',
      id: 'no-icon',
      label: 'No Icon',
      url: 'https://app.getpocket.com',
    },
  ],
}

export default {
  title: 'Components/GlobalNav/GlobalNavMobileMenu',
  component: GlobalNavMobileMenu,
  decorators: [globalNavLinksKnobs],
}

export const standard = () => <GlobalNavMobileMenu {...baseProps} />
export const premiumNudge = () => (
  <GlobalNavMobileMenu
    isUserLoggedIn={true}
    isUserPremium={false}
    {...baseProps}
  />
)
