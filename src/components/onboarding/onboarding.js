import Joyride, { EVENTS, STATUS, ACTIONS } from 'react-joyride'
import { css } from '@emotion/css'
import { CloseButton } from 'components/close-button/close-button'
import { breakpointSmallTablet } from 'common/constants'
import { breakpointSmallHandset } from 'common/constants'
import { breakpointTinyHandset } from 'common/constants'

const highlightStyles = css`
  position: relative;

  &:after {
    position: absolute;
    content: '';
    height: calc(100% + 1rem);
    width: calc(100% + 1rem);
    top: -0.5rem;
    left: -0.5rem;
    border: 3px solid var(--color-teal50);
    border-radius: 16px;
    pointer-events: none;
  }
`

const tooltipStyles = css`
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;
  color: var(--color-grey10);
  background-color: var(--color-white100);
  cursor: pointer;

  .close {
    color: var(--color-grey10);
    &:hover {
      color: var(--color-textLinkHover);
    }
  }

  h3 {
    margin: 0;
    padding: 56px 32px 16px;
    font-family: 'Doyle';
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 48px;
  }

  p {
    margin: 0;
    padding: 16px 32px;
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 28px;
  }

  ${breakpointSmallTablet} {
    max-width: 328px;

    h3 {
      font-size: 28px;
      line-height: 36px;
    }
  }

  ${breakpointSmallHandset} {
    p {
      font-size: 16px;
      line-height: 24px;
    }
  }

  ${breakpointTinyHandset} {
    max-width: 300px;
  }
`

const Tooltip = ({
  step,
  closeProps,
  primaryProps,
  tooltipProps
}) => {
  const { onClick: closeAction } = closeProps
  const { onClick: clickAction } = primaryProps

  return (
    <div className={tooltipStyles} {...tooltipProps} >
      <CloseButton handleClose={closeAction} />
      {step.title && <h3 onClick={clickAction}>{step.title}</h3>}
      <p onClick={clickAction}>{step.content}</p>
    </div>
  )
}

export const Onboarding = ({
  steps = [],
  run = false,
  stepIndex = 0,
  impressionEvent = () => {},
  dismissEvent = () => {},
  engagementEvent = () => {},
  finishEvent = () => {}
}) => {
  const options = {
    arrowColor: '#fff',
    overlayColor: 'transparent',
    spotlightShadow: 'transparent',
    zIndex: -99 // Base zIndex is 100, subtract 99 to prevent conflict with GlobalNav 🙄
  }

  const highlightElement = (target, styles) => {
    document.querySelector(target)?.classList.add(styles || highlightStyles)
  }

  const removeHighlight = (target, styles) => {
    document.querySelector(target)?.classList.remove(styles || highlightStyles)
  }

  const onboardingCallback = (data) => {
    const { action, index, status, type } = data

    if (type === EVENTS.TOOLTIP) {
      highlightElement(steps[index].target, steps[index].outline)
      impressionEvent(index)
      return
    }
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.CLOSE) dismissEvent(index)
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) engagementEvent(index)
    if (status === STATUS.FINISHED) finishEvent()

    removeHighlight(steps[index]?.target, steps[index]?.outline)
  }

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      callback={onboardingCallback}
      continuous={true}
      disableScrolling={true}
      tooltipComponent={Tooltip}
      styles={{ options }}
      scrollOffset={50}
      spotlightClicks={true}
    />
  )
}
