import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { breakpointTinyTablet } from '@pocket/web-ui'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseSaveFlyaway } from '../onboarding.state'
import { onboardingHighlight } from './onboarding-animations'

const desktopHighlight = css`
  ${onboardingHighlight}
  border-radius: 2.75rem;
  animation: onboardingPulse 1.7s linear infinite;

  ${breakpointTinyTablet} {
    display: none;
  }
`

const tabletHighlight = css`
  ${onboardingHighlight}
  
  ${breakpointTinyTablet} {
    border-radius: 2.75rem;
    animation: onboardingPulse 1.7s linear infinite;
  }
`

const homeSaveQueryDesktop = 'article:not(.hero-center) button[data-cy^="article-save-btn"]'
const homeSaveQueryTablet = 'button[data-cy^="article-save-btn"]'

export const HomeFlyawaySave = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const flyawayReady = useSelector((state) => state.onboarding.homeFlyawaySave)
  const showFlyaway = flyawayReady

  useEffect(() => {
    let timer
    let desktopElement
    let tabletElement
    const highlightElement = () => {
      desktopElement = document.querySelector(homeSaveQueryDesktop)
      tabletElement = document.querySelector(homeSaveQueryTablet)
      if (desktopElement) desktopElement.classList.add(desktopHighlight)
      if (tabletElement) tabletElement.classList.add(tabletHighlight)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.save.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      desktopElement?.classList.remove(desktopHighlight)
      tabletElement?.classList.remove(tabletHighlight)
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.save.close'))
    dispatch(onboardingCloseSaveFlyaway())
  }

  const title = t('onboarding:flyaway-save-title', 'Save articles to read them later')

  return (
    <Flyaway
      dataCy="home-flyaway-save"
      title={title}
      handleClose={handleClose}
      show={showFlyaway}
    />
  )
}
