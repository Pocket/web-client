import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Onboarding } from 'components/onboarding/onboarding'
import { unloadOnboarding } from './home-onboarding.state'
import { saveDismissAction } from './home-onboarding.state'
import { readDismissAction } from './home-onboarding.state'
import { saveImpressionEvent } from './home-onboarding.state'
import { readImpressionEvent } from './home-onboarding.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const HomeOnboarding = () => {
  const dispatch = useDispatch()

  const running = useSelector((state) => state.homeOnboarding.running)
  const currentStep = useSelector((state) => state.homeOnboarding.currentStep)
  const saveComplete = useSelector((state) => state.homeOnboarding.saveComplete)
  const readComplete = useSelector((state) => state.homeOnboarding.readComplete)
  const recentSaves = useSelector((state) => state.home.recentSaves)

  const recentItem = useSelector((state) => state.savesItemsById[recentSaves[0]])
  const isInternalItem = recentItem?.isInternalItem

  const onboardingSteps = [{
    disableBeacon: true,
    target: '[data-cy^="article-save-btn"]',
    title: 'Find an article interesting but pressed for time?',
    content: <>Hit <strong>Save</strong> to unlock the power of Pocket and read it later.</>,
    placement: 'right-end'
  }, {
    disableBeacon: true,
    target: '[data-cy=recent-saves] [data-cy^="article-card-"]',
    title: 'Ready to read it?',
    content: isInternalItem ? 'Read it in Pocket’s calm reading zone.' : 'Click to read it.',
    placement: 'bottom'
  }]

  useEffect(() => {
    return () => {
      dispatch(unloadOnboarding())
    }
  }, [dispatch])

  // Impression actions
  const saveImpressionAction = () => {
    dispatch(sendSnowplowEvent('home.onboarding.save.impression'))
    dispatch(saveImpressionEvent())
  }

  const readImpressionAction = () => {
    dispatch(sendSnowplowEvent('home.onboarding.read.impression'))
    dispatch(readImpressionEvent())
  }

  // Engagement actions
  const saveAction = () => {
    if (saveComplete) return
    dispatch(sendSnowplowEvent('home.onboarding.save.click'))
    document.querySelector('.card-actions').click()
  }

  const readAction = () => {
    if (readComplete) return
    dispatch(sendSnowplowEvent('home.onboarding.read.click'))
    document.querySelector('[data-cy=recent-saves] [data-cy^="article-card-"] a').click()
  }

  const saveDismiss = () => {
    dispatch(sendSnowplowEvent('home.onboarding.save.dismiss'))
    dispatch(saveDismissAction())
  }

  const readDismiss = () => {
    dispatch(sendSnowplowEvent('home.onboarding.read.dismiss'))
    dispatch(readDismissAction())
  }

  // Onboarding Callbacks
  const handleImpression = (index) => {
    if (index === 0) saveImpressionAction()
    if (index === 1) readImpressionAction()
  }

  const handleDismiss = (index) => {
    if (index === 0) saveDismiss()
    if (index === 1) readDismiss()
  }

  const handleEngagement = (index) => {
    if (index === 0) saveAction()
    if (index === 1) readAction()
  }

  return (
    <Onboarding
      steps={onboardingSteps}
      stepIndex={currentStep}
      run={running}
      impressionEvent={handleImpression}
      dismissEvent={handleDismiss}
      engagementEvent={handleEngagement}
    />
  )
}
