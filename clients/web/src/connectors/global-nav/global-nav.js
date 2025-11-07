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

import { ExportIcon } from '@ui/icons/ExportIcon'

import { BASE_URL } from 'common/constants'
import { LOGIN_URL } from 'common/constants'
import { getTopLevelPath } from 'common/utilities/urls/urls'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { itemsImportShow } from 'connectors/items/mutation-import.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

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
  const { selectedLink: selected, subset, tag, bannerCampaign, onlyLogout } = props
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
  const pocketLogoOutboundUrl = isLoggedIn ? '/home' : 'https://getpocket.com'

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

  const links = [
    {
      name: 'export',
      id: 'global-nav-export-link',
      label: t('nav:export', 'Export'),
      url: 'https://getpocket.com/export',
      icon: <ExportIcon />
    }
  ]

  const subLinks = []

  /**
   * Tools are what we use on Saves
   */
  const fromSaves = topLevelPath === 'saves' && isLoggedIn
  const tools = fromSaves ? [] : []

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

  const onLoginClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    window.location.assign(`${LOGIN_URL}?src=web-nav&utm_source=${global.location.href}`)
  }

  const onImportClick = () => {
    dispatch(itemsImportShow())
  }

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
      noNav={true}
      onlyLogout={onlyLogout}
      bannerCampaign={bannerCampaign}
      flagsReady={flagsReady}>
      {NavTakeover ? (
        <NavTakeover onClose={resetNav} searchEnrolled={true} fromSaves={fromSaves} />
      ) : null}
    </GlobalNavComponent>
  )
}

export default GlobalNav
