import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { css } from 'linaria'
import { Flyaway } from 'components/flyaway/flyaway'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { onboardingCloseSaveFlyaway } from '../onboarding.state'

const homeSaveStyles = css`
  box-shadow: 0 0 0 0.5rem var(--color-actionPrimary);
  border-radius: 2.75rem;
`

const homeSaveQuery = "button[data-cy^='article-save-btn']"

export const HomeFlyawaySave = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const flyawayReady = useSelector((state) => state.onboarding.saveFlyaway)
  const modalStatus = useSelector((state) => state.onboarding.topicSelectionModal)
  const topicsSelected = pinnedTopics.length !== 0
  const modalFinished = modalStatus === false
  const showFlyaway = (topicsSelected && flyawayReady && modalFinished)

  useEffect(() => {
    let timer
    let element
    const highlightElement = () => {
      element = document.querySelector(homeSaveQuery)
      if (element) element.classList.add(homeSaveStyles)
    }

    if (showFlyaway) {
      dispatch(sendSnowplowEvent('onboarding.flyaway.save.impression'))
      timer = setTimeout(highlightElement, 1000)
    }

    return () => {
      clearTimeout(timer)
      element?.classList.remove(homeSaveStyles)
    }
  }, [showFlyaway])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.flyaway.save.close'))
    dispatch(onboardingCloseSaveFlyaway())
  }

  const title = t('onboarding:flyaway-save-title', 'Save articles you like')
  const description = t('onboarding:flyaway-save-description',
    'Home is filled with the best articles from across the web. Save one to read it later.')

  return (
    ( showFlyaway ?
      <Flyaway title={title} description={description} handleClose={handleClose} />
    : null )
  )
}
