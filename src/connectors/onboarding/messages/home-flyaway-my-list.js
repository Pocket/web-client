import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseMyListFlyaway } from '../onboarding.state'
import { breakpointLargeTablet } from '@pocket/web-ui'
import { onboardingHighlight } from './highlight-animation'

const sideNavStyles = css`
  ${onboardingHighlight}
  border-radius: 2.75rem;
  animation: onboardingPulse 1.7s linear infinite;
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

    .hamburger-icon:focus {
      outline: none !important; // removing the focus styling only when the onboarding highlight is shown
    }
  }
`

const sideNavMyListQuery = 'button[data-cy^="side-nav-mylist"]'
const hamburgerQuery = '.site-nav'

export const HomeFlyawayMyList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const myListFlyawayReady = useSelector((state) => state.onboarding.homeFlyawayMyList)
  const saveFlyawayStatus = useSelector((state) => state.onboarding.saveFlyaway)
  const saveFlyawayDismissed = saveFlyawayStatus === false
  const showFlyaway = (saveFlyawayDismissed && myListFlyawayReady)

  useEffect(() => {
    let timer
    let elementSideNav
    let elementHamburger
    const highlightElement = () => {
      elementSideNav = document.querySelector(sideNavMyListQuery)
      elementHamburger = document.querySelector(hamburgerQuery)
      if (elementSideNav) elementSideNav.classList.add(sideNavStyles)
      if (elementHamburger) elementHamburger.classList.add(hamburgerStyles)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.my-list.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      elementSideNav?.classList.remove(sideNavStyles)
      elementHamburger?.classList.remove(hamburgerStyles)
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.my-list.close'))
    dispatch(onboardingCloseMyListFlyaway())
  }

  const title = t('onboarding:flyaway-my-list-title', 'Find Saves in My List')
  const description = t('onboarding:flyaway-my-list-description',
    'Everything you save goes straight to My List – the library of your faves.')

  return (
    ( showFlyaway ?
      <Flyaway title={title} description={description} handleClose={handleClose} />
    : null )
  )
}
