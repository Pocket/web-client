import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { css } from 'linaria'
import { useTranslation } from 'next-i18next'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseExtensionFlyaway } from '../onboarding.state'
import { breakpointLargeTablet, breakpointLargeHandset } from 'common/constants'
import { appStoreBadgeWrapper } from './reader-flyaway-apps'
import { appStoreBadgeStyle } from './reader-flyaway-apps'
import ChromeIcon from 'static/images/browser-icons/chrome.png'
import FirefoxIconSVG from 'static/images/browser-icons/firefox.svg'

const desktopStyles = css`
  ${breakpointLargeTablet} {
    display: none;
  }

  img {
    margin-top: -0.25rem;
    margin-right: 0.625rem;
    height: 20px;
    width: 20px;
  }

  a {
    display: inline-block;
    width: 50%;
    text-decoration: none;
    &:hover {
      color: var(--color-canvas);
      text-decoration: underline;
    }
  }
`

const mobileStyles = css`
  display: none;
  ${breakpointLargeTablet} {
    display: block;
  }
`

// negative margin here to account for the padding added by
// sectionWrapper, makes flyaway alignment match the content
const styleOverrides = css`
  margin-right: -2.5rem;

  ${breakpointLargeTablet} {
    margin: auto -1.5rem;
  }

  ${breakpointLargeHandset} {
    margin: auto -1rem;
  }
`

export const MyListFlyawayExtensions = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const myListFlyawayDismissed =
    useSelector((state) => state.onboarding.myListFlyawayReader) === false
  const extensionFlyawayReady = useSelector((state) => state.onboarding.myListFlyawayExtension)
  const showFlyaway = myListFlyawayDismissed && extensionFlyawayReady

  useEffect(() => {
    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.extension.impression'))
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.extension.close'))
    dispatch(onboardingCloseExtensionFlyaway())
  }

  const handleChrome = () => dispatch(sendSnowplowEvent('onboarding.flyaway.extension.chrome.open'))
  const handleFirefox = () =>
    dispatch(sendSnowplowEvent('onboarding.flyaway.extension.firefox.open'))
  const handleApple = () =>
    dispatch(sendSnowplowEvent('onboarding.flyaway.extension.apple-badge.open'))
  const handleGoogle = () =>
    dispatch(sendSnowplowEvent('onboarding.flyaway.extension.google-play-badge.open'))

  const firefoxExtensionLink =
    'https://support.mozilla.org/en-US/kb/save-web-pages-later-pocket-firefox'
  const chromeExtensionLink = 'https://getpocket.com/apps/link/pocket-chrome/?ep=4&s=WELCOME_PAGE'
  const appleLink = 'https://apps.apple.com/us/app/pocket-save-read-grow/id309601447'
  const googleLink = 'https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro'

  const appStoreBadge =
    'https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg'
  const googlePlayBadge =
    'https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png'

  const desktopTitle = t(
    'onboarding:flyaway-extensions-title-desktop',
    'Save anything from across the web with our extension'
  )
  const mobileTitle = t('onboarding:flyaway-extensions-title-mobile', 'Save anything, anywhere')

  const title = (
    <>
      <div className={desktopStyles}>{desktopTitle}</div>
      <div className={mobileStyles}>{mobileTitle}</div>
    </>
  )

  const description = (
    <>
      <div className={desktopStyles}>
        <a
          href={firefoxExtensionLink}
          onClick={handleFirefox}
          target="_blank"
          rel="noopener noreferrer">
          <img src={FirefoxIconSVG.src} alt="" />
          Firefox
        </a>
        <a
          href={chromeExtensionLink}
          onClick={handleChrome}
          target="_blank"
          rel="noopener noreferrer">
          <img src={ChromeIcon.src} alt="" />
          Chrome
        </a>
      </div>
      <div className={mobileStyles}>
        <div className={appStoreBadgeWrapper}>
          <a
            href={appleLink}
            className={appStoreBadgeStyle}
            onClick={handleApple}
            key="apps-flyaway-app-store-badge"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={appStoreBadge}
              alt={t('onboarding:app-store', 'Download On the Apple App Store')}
            />
          </a>
          <a
            href={googleLink}
            className={`${appStoreBadgeStyle} google-play-badge`}
            onClick={handleGoogle}
            key="apps-flyaway-google-play-badge"
            target="_blank"
            rel="noopener noreferrer">
            <img src={googlePlayBadge} alt={t('onboarding:google-play', 'Get It On Google Play')} />
          </a>
        </div>
      </div>
    </>
  )

  return (
    <Flyaway
      dataCy="mylist-flyaway-extensions"
      title={title}
      description={description}
      handleClose={handleClose}
      show={showFlyaway}
      styleOverrides={styleOverrides}
    />
  )
}
