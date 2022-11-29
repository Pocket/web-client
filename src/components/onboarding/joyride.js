import Joyride, { EVENTS, STATUS, ACTIONS } from 'react-joyride'
import { css, cx } from 'linaria'
import { CrossIcon } from 'components/icons/CrossIcon'
import { closeButtonStyles } from 'components/close-button/close-button'
import { useTranslation, Trans } from 'next-i18next'

const tooltipStyles = css`
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;

  color: #000;
  background-color: var(--color-canvas);

  header {
    background-color: var(--color-apricotLightest);

    h3 {
      margin: 0;
      padding: 56px 32px 16px;
      font-family: 'Doyle';
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      line-height: 48px;
      cursor: pointer;
    }    
  }

  p {
    margin: 0;
    padding: 16px 32px;
    font-family: 'Graphik Web';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 28px;   
    cursor: pointer; 
  }

  .colormode-dark & {
    background-color: var(--color-tealLightest);
    header {
      background-color: var(--color-tealLight);
    }
    .close {
      color: #000;
    }
  }

  .colormode-sepia & {
    background-color: var(--color-amberLightest);
    header {
      background-color: var(--color-amberLight);
    }
  }
`

const Tooltip = ({
  step,
  closeProps,
  primaryProps,
  tooltipProps
}) => {
  const { t } = useTranslation()
  const { onClick: closeAction } = closeProps
  const { onClick: clickAction } = primaryProps

  return (
    <div className={tooltipStyles} {...tooltipProps} >
      <header>
        <button
          onClick={closeAction}
          className={cx(closeButtonStyles, 'close')}
          aria-label={t('common:close-label', 'Close')}>
          <CrossIcon />
          <span className="visually-hidden">
            <Trans i18nKey="common:close">Close</Trans>
          </span>
        </button>
        {step.title && <h3 onClick={clickAction}>{step.title}</h3>}
      </header>
      <p onClick={clickAction}>{step.content}</p>
    </div>
  )
}

export const Onboarding = ({
  steps,
  run,
  stepIndex,
  impressionEvent,
  dismissEvent,
  engagementEvent,
  finishEvent
}) => {
  const options = {
    overlayColor: 'transparent',
    spotlightShadow: 'transparent',
    zIndex: -99 // Base zIndex is 100, subtract 99 to prevent conflict with GlobalNav 🙄
  }

  const onboardingCallback = (data) => {
    const { action, index, status, type } = data

    if (type === EVENTS.TOOLTIP) impressionEvent(index)
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.CLOSE) dismissEvent(index)
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) engagementEvent(index)
    if (status === STATUS.FINISHED) finishEvent()
  }  

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      callback={onboardingCallback}
      // overrides
      continuous={true}
      disableScrolling={true}
      // 
      tooltipComponent={Tooltip} 
      styles={{ options }}
      scrollOffset={50}
      spotlightClicks={true}
    />
  )
}

Onboarding.defaultProps = {
  steps: [],
  run: false,
  stepIndex: 0,
  impressionEvent: () => { },
  dismissEvent: () => { },
  engagementEvent: () => { },
  finishEvent: () => { }
}
