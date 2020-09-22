import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { GlobalNav as GlobalNavComponent } from '@pocket/web-ui'
import { DiscoverIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { BASE_URL } from 'common/constants'

export const getSelectedLink = (currentPath) => {
  switch (currentPath) {
    default:
      return 'discover'
  }
}

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
  const router = useRouter()
  const selectedLink =
    props.selectedLink !== undefined
      ? props.selectedLink
      : getSelectedLink(router.pathname)

  const isPremium = useSelector(
    (state) => parseInt(state?.user?.premium_status, 10) === 1 || false
  )
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const retrievedAvatar = useSelector(
    (state) => state?.user?.profile?.avatar_url
  )
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

  return (
    <GlobalNavComponent
      appRootSelector="#__next"
      links={links}
      selectedLink={selectedLink}
      isLoggedIn={isLoggedIn}
      isPremium={isPremium}
      avatarSrc={avatarSrc}
      accountName={accountName}
      profileUrl={profileUrl}
    />
  )
}

export default GlobalNav
