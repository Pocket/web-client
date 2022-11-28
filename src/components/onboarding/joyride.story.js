import { Onboarding } from './joyride'
import { useState } from 'react'
import { css } from 'linaria'

export default {
  title: 'Overlays/Onboarding',
  component: Onboarding
}

const joyrideStyles = css`
  button { 
    margin: 0 20px;
  }
`

const onboardingSteps = [{
  disableBeacon: true,
  target: '.button-1',
  title: 'Find an article interesting but pressed for time?',
  content: <>Hit <strong>Save</strong> to unlock the power of Pocket and read it later.</>,
  placement: 'right'
}, {
  disableBeacon: true,
  target: '.button-2',
  title: 'Ready to read it?',
  content: 'Read it in Pocket’s calm reading zone.'
}]  

export const Joyride = () => {
  // Onboarding state
  const [stepIndex, setStepIndex] = useState(0)
  const [running, setRunning] = useState(false)

  // Page state
  const [itemSaved, setItemSaved] = useState(false)
  
  // Button actions
  const startAction = () => {
    setStepIndex(0)
    setRunning(true)
  }

  const saveAction = () => {
    setStepIndex(1)
    setItemSaved(true)
    setRunning(true)
  }

  const readAction = () => setRunning(false)

  // Onboarding Callbacks
  const handleImpression = () => console.log('send impression event')

  const handleDismiss = (index) => {
    setRunning(false)
    setStepIndex(stepIndex + 1)
  }

  const handleEngagement = (index) => {
    if (index === 0) saveAction()
    if (index === 1) readAction()
  }
  
  const handleFinish = () => setRunning(false)

  return (
    <div className={joyrideStyles}>
      <button onClick={startAction}>Start Onboarding!</button>
      <button className="button-1" onClick={saveAction}>Save button!</button>
      {itemSaved ? <button className="button-2" onClick={readAction}>Read item!</button> : null}
      
      <Onboarding
        steps={onboardingSteps}
        stepIndex={stepIndex}
        run={running}
        impressionEvent={handleImpression}
        dismissEvent={handleDismiss}
        engagementEvent={handleEngagement}
        finishEvent={handleFinish}
      />
    </div>
  )
}
