import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { appSetMode } from 'connectors/app/app.state'
import { setListModeList } from 'connectors/app/app.state'
import { setListModeGrid } from 'connectors/app/app.state'
import { setListModeDetail } from 'connectors/app/app.state'
import { setColorMode } from 'connectors/app/app.state'

import GlobalNavComponent from 'components/global-nav/global-nav'
import GlobalNavSearch from './global-nav-search'
import GlobalNavAdd from './global-nav-add'
import GlobalNavBulkMutations from './global-nav-bulk-mutations'

import { HomeIcon } from '@ui/icons/HomeIcon'
import { DiscoverIcon } from '@ui/icons/DiscoverIcon'
import { SaveIcon } from '@ui/icons/SaveIcon'
import { SearchIcon } from '@ui/icons/SearchIcon'
import { LinkCopyIcon } from '@ui/icons/LinkCopyIcon'
import { EditIcon } from '@ui/icons/EditIcon'
import { ExportIcon } from '@ui/icons/ExportIcon'
import { FavoriteIcon } from '@ui/icons/FavoriteIcon'
import { HighlightIcon } from '@ui/icons/HighlightIcon'
import { TagIcon } from '@ui/icons/TagIcon'
import { ArticleIcon } from '@ui/icons/ArticleIcon'
import { ArchiveIcon } from '@ui/icons/ArchiveIcon'
import { VideoIcon } from '@ui/icons/VideoIcon'
import { CollectionsIcon } from '@ui/icons/CollectionsIcon'
import { ListViewAltIcon } from '@ui/icons/ListViewAltIcon'

import { BASE_URL } from 'common/constants'
import { LOGIN_URL } from 'common/constants'
import { getTopLevelPath } from 'common/utilities/urls/urls'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { itemsImportShow } from 'connectors/items/mutation-import.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

import { Banner } from './global-nav-banner'

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
const GlobalNav = (props) => {
  const { selectedLink: selected, subset, tag, noNav, bannerCampaign, onlyLogout } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const topLevelPath = getTopLevelPath(router?.pathname)
  const selectedLink = selected !== undefined ? selected : topLevelPath

  const appMode = useSelector((state) => state?.app?.mode)
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const userStatus = useSelector((state) => state?.user?.user_status)
  const isPremium = useSelector((state) => parseInt(state?.user?.premium_status, 10) === 1 || false)
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const retrievedAvatar = useSelector((state) => state?.userProfile?.avatar_url)
  const pocketLogoOutboundUrl = isLoggedIn ? '/saves' : 'https://getpocket.com'

  const avatarSrc = enforceDefaultAvatar(retrievedAvatar)
  const accountName = useSelector((state) => state?.userProfile?.first_name)
  const accountEmail = useSelector((state) => state?.userEmail?.email)
  const userId = useSelector((state) => state?.user?.user_id)
  const profileUrl = `${BASE_URL}/@${userId}?src=navbar`

  const listMode = useSelector((state) => state?.app?.listMode)
  const colorMode = useSelector((state) => state?.app?.colorMode)

  // Has the user migrated to FXA?
  const { isFXA } = useSelector((state) => state.user)

  const featureState = useSelector((state) => state.features)
  const showOmnivore = featureFlagActive({ flag: 'omnivore', featureState })

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
      url: `/saves/tags/${pin}`
    }
  })

  const links = [
    {
      name: 'home',
      id: 'global-nav-home-link',
      label: t('nav:home', 'Home'),
      url: '/home?src=navbar',
      icon: <HomeIcon />
    },
    {
      name: 'saves',
      id: 'global-nav-saves-link',
      label: t('nav:saves', 'Saves'),
      url: '/saves?src=navbar',
      icon: <SaveIcon />
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
    },
    {
      name: 'export',
      id: 'global-nav-export-link',
      label: t('nav:export', 'Export'),
      url: 'https://getpocket.com/export',
      icon: <ExportIcon />
    }
  ]

  const subLinks = [
    {
      name: 'lists',
      icon: <ListViewAltIcon />,
      label: t('nav:all-lists', 'All Lists'),
      url: '/lists'
    },
    {
      name: 'archive',
      icon: <ArchiveIcon />,
      label: t('nav:archive', 'Archive'),
      url: '/saves/archive'
    },
    {
      name: 'favorites',
      icon: <FavoriteIcon />,
      label: t('nav:favorites', 'Favorites'),
      url: '/saves/favorites'
    },
    {
      name: 'highlights',
      icon: <HighlightIcon />,
      label: t('nav:highlights', 'Highlights'),
      url: '/saves/highlights'
    },
    {
      name: 'articles',
      icon: <ArticleIcon />,
      label: t('nav:articles', 'Articles'),
      url: '/saves/articles'
    },
    {
      name: 'videos',
      icon: <VideoIcon />,
      label: t('nav:videos', 'Videos'),
      url: '/saves/videos'
    },
    {
      name: 'tags',
      icon: <TagIcon />,
      label: t('nav:all-tags', 'All Tags'),
      url: '/saves/tags'
    },
    ...pinnedLinks
  ]

  /**
   * Tools are what we use on Saves
   */
  const fromSaves = topLevelPath === 'saves' && isLoggedIn
  const tools = fromSaves
    ? [
        {
          name: 'add-item',
          label: t('nav:save', 'Save a URL'),
          icon: <LinkCopyIcon />
        },
        {
          name: 'bulk-edit',
          label: t('nav:bulk-edit', 'Bulk Edit'),
          icon: <EditIcon />
        },
        {
          name: 'search',
          label: t('nav:search', 'Search'),
          icon: <SearchIcon />
        }
      ]
    : [
        {
          name: 'search',
          label: t('nav:search', 'Search'),
          icon: <SearchIcon />
        }
      ]

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
    bulk: GlobalNavBulkMutations
  }

  const NavTakeover = navChildren[appMode]
  const hideNav = noNav

  const onLoginClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    window.location.assign(`${LOGIN_URL}?src=web-nav&utm_source=${global.location.href}`)
  }

  const onImportClick = () => {
    dispatch(itemsImportShow())
  }

  const CurrentBanner = bannerCampaign ? Banner : null

  return (
    <GlobalNavComponent
      suppressHydrationWarning
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
      accountEmail={accountEmail}
      isFxa={isFXA}
      profileUrl={profileUrl}
      userStatus={userStatus}
      onToolClick={toolClick}
      onLoginClick={onLoginClick}
      onLinkClick={onLinkClick}
      onImportClick={onImportClick}
      showOmnivore={showOmnivore}
      listMode={listMode}
      colorMode={colorMode}
      setColorMode={setAppColorMode}
      setListMode={setListMode}
      setGridMode={setGridMode}
      setDetailMode={setDetailMode}
      sendImpression={sendImpressionEvent}
      tools={tools}
      noNav={hideNav}
      onlyLogout={onlyLogout}
      bannerCampaign={bannerCampaign}
      Banner={CurrentBanner}
      flagsReady={flagsReady}>
      {NavTakeover ? (
        <NavTakeover onClose={resetNav} searchEnrolled={true} fromSaves={fromSaves} />
      ) : null}
    </GlobalNavComponent>
  )
}

export default GlobalNav
