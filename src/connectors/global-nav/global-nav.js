import React from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { appSetMode } from 'connectors/app/app.state'

import GlobalNavComponent from 'components/global-nav/global-nav'
import GlobalNavSearch from './global-nav-search'
import GlobalNavAdd from './global-nav-add'
import GlobalNavBulkEdit from './global-nav-bulk-edit'

import { DiscoverIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { SearchIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { EditIcon } from '@pocket/web-ui'
import { NotificationIcon } from '@pocket/web-ui'

import { BASE_URL } from 'common/constants'
import { getTopLevelPath } from 'common/utilities'
import { userOAuthLogIn } from 'connectors/user/user.state'

// check empty avatar value coming from endpoint (sample default avatar url to overwrite https://pocket-profile-images.s3.amazonaws.com/profileBlue.png)
export const enforceDefaultAvatar = (avatarUrl = '') => {
  const DISALLOWED_PROFILE_IMGS = ['profileBlue.png'] // file names of default urls returned by BE. If a user avatar url contains one of these, we prefer to return an empty string, in order to use the Web UI's Avatar default image instead
  const hasInvalidDefaultImage = DISALLOWED_PROFILE_IMGS.reduce(
    (isAvatarOk, disallowedImg) => {
      if (!avatarUrl) return true // handle null
      if (isAvatarOk === false) return isAvatarOk

      return avatarUrl.includes(disallowedImg)
    },
    true
  )

  return hasInvalidDefaultImage ? '' : avatarUrl
}

/**
 * This component only decorates the WebUI GlobalNav with analytics handling.
 * It has no stories or tests because of this, and will pass through any props
 * provided to it to the GlobalNav component.
 */
const GlobalNav = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const selectedLink =
    props.selectedLink !== undefined
      ? props.selectedLink
      : getTopLevelPath(router.pathname)

  const appMode = useSelector((state) => state?.app?.mode)
  const userStatus = useSelector((state) => state?.user?.user_status)
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false) //prettier-ignore
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const retrievedAvatar = useSelector((state) => state?.user?.profile?.avatar_url) // prettier-ignore

  const avatarSrc = enforceDefaultAvatar(retrievedAvatar)
  const accountName = useSelector((state) => state?.user?.first_name)
  const userId = useSelector((state) => state?.user?.user_id)
  const profileUrl = `${BASE_URL}/@${userId}?src=navbar`

  const links = [
    {
      name: 'discover',
      id: 'global-nav-discover-link',
      label: 'Discover',
      url: '/discover',
      icon: <DiscoverIcon />
    },
    {
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: 'My List',
      url: '/my-list',
      icon: <ListViewIcon />
    }
  ]

  /**
   * Tools are what we use on myList
   */
  const showNav = selectedLink === 'my-list' && isLoggedIn
  const tools = showNav
    ? [
        { name: 'search', label: 'Search', icon: <SearchIcon /> },
        { name: 'add-item', label: 'Save a URL', icon: <AddIcon /> },
        { name: 'bulk-edit', label: 'Bulk Edit', icon: <EditIcon /> }
      ]
    : []

  const toolClick = (name) => {
    if (name === 'search') dispatch(appSetMode('search'))
    if (name === 'add-item') dispatch(appSetMode('add'))
    if (name === 'bulk-edit') dispatch(appSetMode('bulk'))
  }

  const resetNav = () => dispatch(appSetMode('default'))

  const navChildren = {
    search: GlobalNavSearch,
    add: GlobalNavAdd,
    bulk: GlobalNavBulkEdit
  }

  const NavTakeover = navChildren[appMode]

  const onLoginClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(userOAuthLogIn())
  }

  return (
    <GlobalNavComponent
      pocketLogoOutboundUrl={'/'}
      appRootSelector="#__next"
      links={links}
      selectedLink={selectedLink}
      isLoggedIn={isLoggedIn}
      isPremium={isPremium}
      avatarSrc={avatarSrc}
      accountName={accountName}
      profileUrl={profileUrl}
      userStatus={userStatus}
      onToolClick={toolClick}
      onLoginClick={onLoginClick}
      tools={tools}>
      {NavTakeover ? <NavTakeover onClose={resetNav} /> : null}
    </GlobalNavComponent>
  )
}

export default GlobalNav
