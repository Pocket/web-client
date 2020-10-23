import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import defineKnobs from 'helpers/define-knobs'

import GlobalNavAccount from './global-nav-account'

const globalNavAccountKnobs = defineKnobs((props) => {
  return {
    isLoggedIn: boolean('isLoggedIn', props.isLoggedIn),
    isPremium: boolean('isPremium', props.isPremium),
    avatarSrc: text('avatarSrc', props.avatarSrc)
  }
})

export default {
  title: 'Components/GlobalNav/GlobalNavAccount',
  component: GlobalNavAccount,
  decorators: [globalNavAccountKnobs]
}

const baseProps = {
  appRootSelector: '#root',
  accountName: 'Fluffers'
}

export const loggedOutUser = () => {
  return <GlobalNavAccount {...baseProps} />
}

export const loggedInUser = () => <GlobalNavAccount {...baseProps} isLoggedIn />

export const loggedInPremiumUser = () => (
  <GlobalNavAccount
    {...baseProps}
    isLoggedIn
    avatarSrc="http://placekitten.com/150/150"
  />
)
