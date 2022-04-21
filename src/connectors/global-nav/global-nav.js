import React from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { appSetMode } from 'connectors/app/app.state'
import { listModeToggle } from 'connectors/app/app.state'
import { setListModeList } from 'connectors/app/app.state'
import { setListModeGrid } from 'connectors/app/app.state'
import { setListModeDetail } from 'connectors/app/app.state'
import { setColorMode } from 'connectors/app/app.state'

import GlobalNavComponent from 'components/global-nav/global-nav'
import GlobalNavSearch from './global-nav-search'
import GlobalNavAdd from './global-nav-add'
import GlobalNavBulkEdit from './global-nav-bulk-edit'
import GlobalNavBulkMutations from './global-nav-bulk-mutations'

import { HomeIcon } from '@pocket/web-ui'
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
import { CollectionsIcon } from '@pocket/web-ui'

import { BASE_URL } from 'common/constants'
import { LOGIN_URL } from 'common/constants'
import { RELEASE_NOTES_VERSION } from 'common/constants'
import { getTopLevelPath } from 'common/utilities'

import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

// check empty avatar value coming from endpoint (sample default avatar url to overwrite https://pocket-profile-images.s3.amazonaws.com/profileBlue.png)
export const enforceDefaultAvatar = (avatarUrl = '') => {
  const DISALLOWED_PROFILE_IMGS = ['profileBlue.png'] // file names of default urls returned by BE. If a user avatar url contains one of these, we prefer to return an empty string, in order to use the Web UI's Avatar default image instead
  const hasInvalidDefaultImage = DISALLOWED_PROFILE_IMGS.reduce((isAvatarOk, disallowedImg) => {
    if (!avatarUrl) return true // handle null
    if (isAvatarOk === false) return isAvatarOk

    return avatarUrl.includes(disallowedImg)
  }, true)

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
  const selectedLink = selected !== undefined ? selected : getTopLevelPath(router?.pathname)

  const appMode = useSelector((state) => state?.app?.mode)
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const userStatus = useSelector((state) => state?.user?.user_status)
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false)
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const retrievedAvatar = useSelector((state) => state?.userProfile?.avatar_url)
  const pocketLogoOutboundUrl = isLoggedIn ? '/my-list' : 'https://getpocket.com'

  const featureState = useSelector((state) => state.features)
  const showLab = featureFlagActive({ flag: 'lab', featureState })
  const useApiNext = featureFlagActive({ flag: 'api.next', featureState })

  const avatarSrc = enforceDefaultAvatar(retrievedAvatar)
  const accountName = useSelector((state) => state?.userProfile?.first_name)
  const userId = useSelector((state) => state?.user?.user_id)
  const profileUrl = showLab ? `/profile/${userId}?src=navbar` : `${BASE_URL}/@${userId}?src=navbar`

  const listMode = useSelector((state) => state?.app?.listMode)
  const colorMode = useSelector((state) => state?.app?.colorMode)

  const showNotification = useSelector(
    (state) => state?.app?.releaseVersion !== RELEASE_NOTES_VERSION
  )

  const setAppColorMode = (colorMode) => dispatch(setColorMode(colorMode))
  const setListMode = () => dispatch(setListModeList())
  const setGridMode = () => dispatch(setListModeGrid())
  const setDetailMode = () => dispatch(setListModeDetail())

  const sendImpressionEvent = (identifier) => dispatch(sendSnowplowEvent(identifier))

  const pinnedTags = useSelector((state) => state.settings.pinnedTags)
  const pinnedLinks = pinnedTags.map((pin) => {
    return {
      label: pin,
      name: pin,
      url: `/my-list/tags/${pin}`
    }
  })

  const links = [
    {
      name: 'home',
      id: 'global-nav-home-link',
      label: t('nav:home', 'Home'),
      url: '/home?src=navbar',
      icon: <HomeIcon />,
      beta: true
    },
    {
      name: 'my-list',
      id: 'global-nav-my-list-link',
      label: t('nav:my-list', 'My List'),
      url: '/my-list?src=navbar',
      icon: <ListViewIcon />
    },
    {
      name: 'discover',
      id: 'global-nav-discover-link',
      label: t('nav:discover', 'Discover'),
      url: '/explore?src=navbar',
      icon: <DiscoverIcon />
    },
    {
      name: 'collections',
      id: 'global-nav-collections-link',
      label: t('nav:collections', 'Collections'),
      url: '/collections?src=navbar',
      icon: <CollectionsIcon />
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

  const onLinkClick = (label) => dispatch(sendSnowplowEvent('global-nav', { label }))

  const toolClick = (name) => {
    dispatch(sendSnowplowEvent(`global-nav.${name}`))
    if (name === 'search') dispatch(appSetMode('search'))
    if (name === 'add-item') dispatch(appSetMode('add'))
    if (name === 'bulk-edit') dispatch(appSetMode('bulk'))
  }

  const resetNav = () => dispatch(appSetMode('default'))

  const navChildren = {
    search: GlobalNavSearch,
    add: GlobalNavAdd,
    bulk: useApiNext ? GlobalNavBulkMutations : GlobalNavBulkEdit
  }

  const NavTakeover = navChildren[appMode]

  const onLoginClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    window.location.assign(`${LOGIN_URL}?src=navbar`)
  }

  return (
    <GlobalNavComponent
      pocketLogoOutboundUrl={pocketLogoOutboundUrl}
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
      onLinkClick={onLinkClick}
      listMode={listMode}
      colorMode={colorMode}
      setColorMode={setAppColorMode}
      setListMode={setListMode}
      setGridMode={setGridMode}
      setDetailMode={setDetailMode}
      sendImpression={sendImpressionEvent}
      showNotification={showNotification}
      tools={tools}
      flagsReady={flagsReady}>
      {NavTakeover ? <NavTakeover onClose={resetNav} /> : null}
    </GlobalNavComponent>
  )
}

export default GlobalNav
