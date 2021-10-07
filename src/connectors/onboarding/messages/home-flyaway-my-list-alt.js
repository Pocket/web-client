import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseMyListFlyaway } from '../onboarding.state'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { onboardingHighlight } from './onboarding-animations'

const mainNavStyles = css`
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    ${onboardingHighlight}
    transform: scaleY(.9);
    border-radius: 4px;
    box-sizing: content-box;
    animation: onboardingPulse 1.7s linear infinite;
  }
`

const hamburgerStyles = css`
  ${breakpointLargeTablet} {
    ${onboardingHighlight}
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: -10px;
      width: 100%;
      height: 100%;
      pointer-events: none;
      border-radius: 4px;
      animation: onboardingPulse 1.7s linear infinite;
    }

    // removing the focus styling only when the onboarding highlight is shown
    // !important here to override another !important
    .hamburger-icon:focus {
      outline: none !important;
    }
  }
`

const navMyListQuery = 'a[data-cy^="global-nav-my-list-link"]'
const hamburgerQuery = '.site-nav'

export const HomeFlyawayMyListAlt = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const myListFlyawayReady = useSelector((state) => state.onboarding.homeFlyawayMyList)
  const saveFlyawayStatus = useSelector((state) => state.onboarding.homeFlyawaySave)
  const saveFlyawayDismissed = saveFlyawayStatus === false
  const showFlyaway = saveFlyawayDismissed && myListFlyawayReady

  useEffect(() => {
    let timer
    let elementMainNav
    let elementHamburger
    const highlightElement = () => {
      elementMainNav = document.querySelector(navMyListQuery)
      elementHamburger = document.querySelector(hamburgerQuery)
      if (elementMainNav) elementMainNav.classList.add(mainNavStyles)
      if (elementHamburger) elementHamburger.classList.add(hamburgerStyles)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.my-list.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      elementMainNav?.classList.remove(mainNavStyles)
      elementHamburger?.classList.remove(hamburgerStyles)
    }
  }, [dispatch, showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.my-list.close'))
    dispatch(onboardingCloseMyListFlyaway())
  }

  const title = t('onboarding:flyaway-my-list-title', 'Find Saves in My List')
  const description = t(
    'onboarding:flyaway-my-list-description',
    'Everything you save goes straight to My List – the library of your faves.'
  )

  return (
    <Flyaway
      dataCy="home-flyaway-mylist"
      title={title}
      description={description}
      handleClose={handleClose}
      show={showFlyaway}
    />
  )
}
