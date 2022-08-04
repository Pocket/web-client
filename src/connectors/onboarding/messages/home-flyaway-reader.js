import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { breakpointSmallTablet } from 'common/constants'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseReaderFlyaway } from '../onboarding.state'
import { onboardingHighlight } from './onboarding-animations'

const recentCardStyles = css`
  &:after {
    ${onboardingHighlight}
    position: absolute;
    content: '';
    height: calc(100% + 1.5rem);
    width: calc(100% + 1.5rem);
    top: -0.75rem;
    left: -0.75rem;
    border-radius: 1.5rem;
    pointer-events: none;
    animation: onboardingPulse 1.7s linear infinite;

    ${breakpointSmallTablet} {
      height: 100%;
    }
  }
`

const recentCardQuery = '[data-cy="recent-saves"] article[data-cy^="article-card"]'

export const HomeFlyawayReader = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const homeFlyawayDismissed =
    useSelector((state) => state.onboarding.homeFlyawaySave) === false
  const readerFlyawayReady = useSelector((state) => state.onboarding.homeFlyawayReader)
  const recentSaves = useSelector((state) => state.home.recentSaves)
  const showFlyaway = homeFlyawayDismissed && readerFlyawayReady && recentSaves.length

  useEffect(() => {
    let timer
    let element
    const highlightElement = () => {
      element = document.querySelector(recentCardQuery)
      if (element) element.classList.add(recentCardStyles)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.reader.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      element?.classList.remove(recentCardStyles)
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.reader.close'))
    dispatch(onboardingCloseReaderFlyaway())
  }

  const title = t('onboarding:flyaway-reader-title', 'Open saved articles in our calm reading zone')

  return (
    <Flyaway
      dataCy="home-flyaway-reader"
      title={title}
      handleClose={handleClose}
      show={showFlyaway}
    />
  )
}
