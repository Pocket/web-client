import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseReaderFlyaway } from '../onboarding.state'
import { onboardingHighlight } from './onboarding-animations'

const myListCardStyles = css`
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
  }
`
const myListCardQuery = 'article[data-cy^="article-card"]'

export const MyListFlyawayReader = ({ ...rest }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const myListFlyawayDismissed = useSelector((state) => state.onboarding.homeFlyawayMyList) === false
  const readerFlyawayReady = useSelector((state) => state.onboarding.myListFlyawayReader)
  const showFlyaway = myListFlyawayDismissed && readerFlyawayReady

  useEffect(() => {
    let timer
    let element
    const highlightElement = () => {
      element = document.querySelector(myListCardQuery)
      if (element) element.classList.add(myListCardStyles)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.reader.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      element?.classList.remove(myListCardStyles)
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.reader.close'))
    dispatch(onboardingCloseReaderFlyaway())
  }

  const title = t('onboarding:flyaway-reader-title', 'Read distraction-free')
  const description = t('onboarding:flyaway-reader-description',
    'Open a saved story to experience Pocket\'s calm reading zone.')

  return (
    <Flyaway title={title} description={description} handleClose={handleClose} show={showFlyaway} {...rest} />
  )
}
