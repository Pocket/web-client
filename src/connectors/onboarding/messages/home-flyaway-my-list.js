import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseMyListFlyaway } from '../onboarding.state'
import { breakpointLargeTablet } from 'common/constants'
import { onboardingHighlight } from './onboarding-animations'

const topNavStyles = css`
  ${onboardingHighlight}
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 10px;
    width: 90%;
    height: 70%;
    pointer-events: none;
    border-radius: 2.75rem;
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
      border-radius: 2.75rem;
      animation: onboardingPulse 1.7s linear infinite;
    }

    // removing the focus styling only when the onboarding highlight is shown
    // !important here to override another !important
    .hamburger-icon:focus {
      outline: none !important;
    }
  }
`

const topNavMyListQuery = 'a[data-cy^="global-nav-my-list-link"]'
const hamburgerQuery = '.site-nav'

export const HomeFlyawayMyList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const myListFlyawayReady = useSelector((state) => state.onboarding.homeFlyawayMyList)
  const saveFlyawayStatus = useSelector((state) => state.onboarding.homeFlyawaySave)
  const saveFlyawayDismissed = saveFlyawayStatus === false
  const showFlyaway = saveFlyawayDismissed && myListFlyawayReady

  useEffect(() => {
    let timer
    let elementTopNav
    let elementHamburger
    const highlightElement = () => {
      elementTopNav = document.querySelector(topNavMyListQuery)
      elementHamburger = document.querySelector(hamburgerQuery)
      if (elementTopNav) elementTopNav.classList.add(topNavStyles)
      if (elementHamburger) elementHamburger.classList.add(hamburgerStyles)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.my-list.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      elementTopNav?.classList.remove(topNavStyles)
      elementHamburger?.classList.remove(hamburgerStyles)
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.my-list.close'))
    dispatch(onboardingCloseMyListFlyaway())
  }

  const title = t('onboarding:flyaway-my-list-title', 'Find saved articles in My List')

  return (
    <Flyaway
      dataCy="home-flyaway-mylist"
      title={title}
      handleClose={handleClose}
      show={showFlyaway}
    />
  )
}
