import { Onboarding } from './onboarding'
import { useState } from 'react'
import { css } from '@emotion/css'

export default {
  title: 'Overlays/Onboarding',
  component: Onboarding
}

const outlineStyles = css`
  position: relative;

  &:after {
    position: absolute;
    content: '';
    height: calc(100% + 1rem);
    width: calc(100% + 1.5rem);
    top: -0.5rem;
    left: -0.75rem;
    border: 3px solid red;
    border-radius: 16px;
    pointer-events: none;
  }
`

const buttonStyles = css`
  button {
    margin: 20px;
  }
`

const onboardingSteps = [
  {
    disableBeacon: true,
    target: '.button-1',
    title: 'Find an article interesting but pressed for time?',
    content: (
      <>
        Hit <strong>Save</strong> to unlock the power of Pocket and read it later.
      </>
    ),
    placement: 'right'
  },
  {
    disableBeacon: true,
    target: '.button-2',
    title: 'Ready to read it?',
    content: 'Read it in Pocket’s calm reading zone.',
    outline: outlineStyles
  }
]

export const Walkthrough = () => {
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

  const resetOnboarding = () => {
    setRunning(false)
    setStepIndex(0)
    setItemSaved(false)
  }

  // Onboarding Callbacks
  const handleImpression = () => {
    // console.log('send impression event')
  }

  const handleDismiss = () => {
    setRunning(false)
    setStepIndex(stepIndex + 1)
  }

  const handleEngagement = (index) => {
    if (index === 0) saveAction()
    if (index === 1) readAction()
  }

  const handleFinish = () => setRunning(false)

  return (
    <div className={buttonStyles}>
      <div>
        <button onClick={startAction}>Start Onboarding!</button>
        <button className="button-1" onClick={saveAction}>
          Save button!
        </button>
        {itemSaved ? (
          <button className="button-2" onClick={readAction}>
            Read item!
          </button>
        ) : null}
      </div>

      <button onClick={resetOnboarding}>Reset</button>

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
