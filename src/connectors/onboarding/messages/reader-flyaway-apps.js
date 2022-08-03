import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseAppsFlyaway } from '../onboarding.state'

export const appStoreBadgeWrapper = css`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0 0.5rem;
`

export const appStoreBadgeStyle = css`
  margin-top: 0.5rem;

  &.google-play-badge {
    height: 40px;
    overflow: hidden;

    img {
      /* google badge image includes margin so we have to adjust to make it
      consistent with apple badge */
      margin: -10px 0 0 -10px;
      max-height: 60px;
    }
  }

  img {
    max-height: 40px;
  }
`

export const ReaderFlyawayApps = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const readerFlyawayDismissed = useSelector((state) => state.onboarding.homeFlyawayReader) === false
  const appsFlyawayReady = useSelector((state) => state.onboarding.readerFlyawayApps)
  const showFlyaway = readerFlyawayDismissed && appsFlyawayReady

  useEffect(() => {
    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.apps.impression'))
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.apps.close'))
    dispatch(onboardingCloseAppsFlyaway())
  }

  const handleApple = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.apps.apple-badge.open'))
  }

  const handleGoogle = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.apps.google-play-badge.open'))
  }

  const appStoreBadge =
    'https://assets.getpocket.com/web-ui/assets/apple-app-store-badge.2928664fe1fc6aca88583a6f606d60ba.svg'
  const googlePlayBadge =
    'https://assets.getpocket.com/web-ui/assets/google-play-badge.db9b21a1c41f3dcd9731e1e7acfdbb57.png'

  const title = t('onboarding:flyaway-apps-title', 'Read anytime, anywhere – even when you’re offline')

  const description = (
    <div>
      <div className={appStoreBadgeWrapper}>
        <a
          href="https://apps.apple.com/us/app/pocket-save-read-grow/id309601447"
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
          href="https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro"
          className={`${appStoreBadgeStyle} google-play-badge`}
          onClick={handleGoogle}
          key="apps-flyaway-google-play-badge"
          target="_blank"
          rel="noopener noreferrer">
          <img src={googlePlayBadge} alt={t('onboarding:google-play', 'Get It On Google Play')} />
        </a>
      </div>
    </div>
  )

  return (
    <Flyaway
      dataCy="reader-flyaway-apps"
      title={title}
      description={description}
      handleClose={handleClose}
      show={showFlyaway}
    />
  )
}
