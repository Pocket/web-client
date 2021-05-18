import React from 'react'

import GlobalNavAccount from './global-nav-account'

export default {
  title: 'GlobalNav/GlobalNavAccount',
  component: GlobalNavAccount
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
  <GlobalNavAccount {...baseProps} isLoggedIn avatarSrc="http://placekitten.com/150/150" />
)
