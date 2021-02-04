import React from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'common/setup/i18n'
import { appSetMode } from 'connectors/app/app.state'
import { listModeToggle } from 'connectors/app/app.state'
import { setListModeList } from 'connectors/app/app.state'
import { setListModeGrid } from 'connectors/app/app.state'
import { setListModeDetail } from 'connectors/app/app.state'
import { sortOrderToggle } from 'connectors/app/app.state'
import { setColorMode } from 'connectors/app/app.state'

import GlobalNavComponent from 'components/global-nav/global-nav'
import GlobalNavSearch from './global-nav-search'
import GlobalNavAdd from './global-nav-add'
import GlobalNavBulkEdit from './global-nav-bulk-edit'

import { DiscoverIcon } from '@pocket/web-ui'
import { ListViewIcon } from '@pocket/web-ui'
import { SearchIcon } from '@pocket/web-ui'
import { AddIcon } from '@pocket/web-ui'
import { EditIcon } from '@pocket/web-ui'
import { FavoriteIcon } from '@pocket/web-ui'
import { HighlightIcon } from '@pocket/web-ui'
import { TagIcon } from '@pocket/web-ui'
import { ArticleIcon } from '@pocket/web-ui'
import { ArchiveIcon } from '@pocket/web-ui'
import { VideoIcon } from '@pocket/web-ui'

import { BASE_URL  } from 'common/constants'
import { LOGIN_URL } from 'common/constants'
import { RELEASE_NOTES_VERSION } from 'common/constants'
import { getTopLevelPath } from 'common/utilities'
import { userOAuthLogIn } from 'connectors/user/user.state'

import { sendImpression } from './global-nav.analytics'
import { sendEngagement } from './global-nav.analytics'

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
const GlobalNav = ({ selectedLink: selected, subset, tag }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const selectedLink =
    selected !== undefined ? selected : getTopLevelPath(router.pathname)

  const appMode = useSelector((state) => state?.app?.mode)
  const useOAuth = useSelector((state) => state?.user?.useOAuth)
  const userStatus = useSelector((state) => state?.user?.user_status)
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false) //prettier-ignore
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const retrievedAvatar = useSelector((state) => state?.user?.profile?.avatar_url) // prettier-ignore

  const avatarSrc = enforceDefaultAvatar(retrievedAvatar)
  const accountName = useSelector((state) => state?.user?.first_name)
  const userId = useSelector((state) => state?.user?.user_id)
  const profileUrl = `${BASE_URL}/@${userId}?src=navbar`

  const listMode = useSelector((state) => state?.app?.listMode)
  const sortOrder = useSelector((state) => state?.app?.sortOrder)
  const colorMode = useSelector((state) => state?.app?.colorMode)

  const showNotification = useSelector((state) => state?.app?.releaseVersion !== RELEASE_NOTES_VERSION)

  const setAppColorMode = (colorMode) => dispatch(setColorMode(colorMode))
  const toggleSortOrder = () => dispatch(sortOrderToggle())
  const toggleListMode = () => dispatch(listModeToggle())
  const setListMode = () => dispatch(setListModeList())
  const setGridMode = () => dispatch(setListModeGrid())
  const setDetailMode = () => dispatch(setListModeDetail())

  const sendImpressionEvent = (identifier) =>
    dispatch(sendImpression(identifier))

  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const pinnedLinks = pinnedTags.map((pin) => {
    return {
      label: pin,
      name: pin,
      url: `/my-list/tags/${pin}`
    }
  })

  const links = [
    {
      name: 'discover',
      id: 'global-nav-discover-link',
      label: t('nav:discover', 'Discover'),
      url: '/explore',
      icon: <DiscoverIcon />
    },
    {
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: t('nav:my-list', 'My List'),
      url: '/my-list',
      icon: <ListViewIcon />
    }
  ]

  const subLinks = [
    {
      name: 'archive',
      icon: <ArchiveIcon />,
      label: t('nav:archive', 'Archive'),
      url: '/my-list/archive'
    },
    {
      name: 'favorites',
      icon: <FavoriteIcon />,
      label: t('nav:favorites', 'Favorites'),
      url: '/my-list/favorites'
    },
    {
      name: 'highlights',
      icon: <HighlightIcon />,
      label: t('nav:highlights', 'Highlights'),
      url: '/my-list/highlights'
    },
    {
      name: 'articles',
      icon: <ArticleIcon />,
      label: t('nav:articles', 'Articles'),
      url: '/my-list/articles'
    },
    {
      name: 'videos',
      icon: <VideoIcon />,
      label: t('nav:videos', 'Videos'),
      url: '/my-list/videos'
    },
    {
      name: 'tags',
      icon: <TagIcon />,
      label: t('nav:all-tags', 'All Tags'),
      url: '/my-list/tags'
    },
    ...pinnedLinks
  ]

  /**
   * Tools are what we use on myList
   */
  const showNav = selectedLink === 'my-list' && isLoggedIn
  const tools = showNav
    ? [
        {
          name: 'search',
          label: t('nav:search', 'Search'),
          icon: <SearchIcon />
        },
        {
          name: 'add-item',
          label: t('nav:save', 'Save a URL'),
          icon: <AddIcon />
        },
        {
          name: 'bulk-edit',
          label: t('nav:bulk-edit', 'Bulk Edit'),
          icon: <EditIcon />
        }
      ]
    : []

  const toolClick = (name) => {
    dispatch(sendEngagement(`global-nav.${name}`))
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

    if (useOAuth) return dispatch(userOAuthLogIn())
    window.location.assign(`${LOGIN_URL}?src=navbar`)
  }

  return (
    <GlobalNavComponent
      pocketLogoOutboundUrl={'/'}
      appRootSelector="#__next"
      links={links}
      subLinks={subLinks}
      subset={subset}
      tag={tag}
      selectedLink={selectedLink}
      isLoggedIn={isLoggedIn}
      isPremium={isPremium}
      avatarSrc={avatarSrc}
      accountName={accountName}
      profileUrl={profileUrl}
      userStatus={userStatus}
      onToolClick={toolClick}
      onLoginClick={onLoginClick}
      listMode={listMode}
      sortOrder={sortOrder}
      toggleSortOrder={toggleSortOrder}
      colorMode={colorMode}
      setColorMode={setAppColorMode}
      setListMode={setListMode}
      setGridMode={setGridMode}
      setDetailMode={setDetailMode}
      toggleListMode={toggleListMode}
      sendImpression={sendImpressionEvent}
      showNotification={showNotification}
      tools={tools}>
      {NavTakeover ? <NavTakeover onClose={resetNav} /> : null}
    </GlobalNavComponent>
  )
}

export default GlobalNav
