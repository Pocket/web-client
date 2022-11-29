import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Onboarding } from 'components/onboarding/joyride'
import { incrementOnboardingStep } from './home-onboarding.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

const onboardingSteps = [{
  disableBeacon: true,
  target: '.card-actions',
  title: 'Find an article interesting but pressed for time?',
  content: <>Hit <strong>Save</strong> to unlock the power of Pocket and read it later.</>,
  placement: 'right-end'
}, {
  disableBeacon: true,
  target: '[data-cy=recent-saves] [data-cy^="article-card-"]',
  title: 'Ready to read it?',
  content: 'Read it in Pocket’s calm reading zone.',
  placement: 'right-end'
}]  

export const HomeOnboarding = () => {
  const dispatch = useDispatch()

  // Onboarding state
  const [running, setRunning] = useState(false)

  const currentStep = useSelector((state) => state.homeOnboarding.currentStep)

  const setupStatus = useSelector((state) => state.homeSetup.setupStatus)
  const isFinalized = useSelector((state) => state.homeSetup.finalizedTopics)
  const recentSaves = useSelector((state) => state.home.recentSaves)

  useEffect(() => {
    setTimeout(() => setRunning(true), 1500)
  }, [])
  
  // Button actions
  const saveAction = () => {
    console.log('send snowplow event')
    document.querySelector('.card-actions').click()
  }

  const readAction = () => {
    console.log('send snowplow event')
    document.querySelector('[data-cy=recent-saves] [data-cy^="article-card-"]').click()
  }

  // Onboarding Callbacks
  const handleImpression = () => {
    console.log('send impression event')
  }

  const handleDismiss = (index) => {
    setRunning(false)
    console.log('send dismiss event', index)
    dispatch(incrementOnboardingStep(index))
  }

  const handleEngagement = (index) => {
    if (index === 0) saveAction()
    if (index === 1) readAction()
  }
  
  const handleFinish = () => setRunning(false)

  return (
    <Onboarding
      steps={onboardingSteps}
      stepIndex={currentStep}
      run={running}
      impressionEvent={handleImpression}
      dismissEvent={handleDismiss}
      engagementEvent={handleEngagement}
      finishEvent={handleFinish}
    />
  )
}
