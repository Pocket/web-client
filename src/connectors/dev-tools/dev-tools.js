import React, { useEffect } from 'react'
import Mousetrap from 'mousetrap'
import { useSelector, useDispatch } from 'react-redux'
import { devModeToggle } from 'connectors/app/app.state'
import { Features } from 'connectors/dev-tools/features'
import { resetOnboarding } from 'connectors/onboarding/onboarding.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { css } from 'linaria'
import { headingSansSerif } from '@pocket/web-ui'
import { Languages } from 'connectors/languages/languages'

const devToolStyle = css`
  padding: var(--spacing150);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-canvas);
  z-index: var(--zIndexModal);
  border-top: 1px solid var(--color-dividerTertiary);
  border-radius: 4px 4px 0 0;

  h6 {
    ${headingSansSerif};
    padding: 0 0 var(--spacing075);
    border-bottom: 1px solid var(--color-dividerTertiary);
    margin-bottom: var(--spacing050);
    position: relative;
    cursor: pointer;

    &:hover,
    &:active {
      color: var(--color-actionPrimaryHover);
    }

    .icon {
      position: absolute;
      right: 0;
      bottom: var(--spacing075);
    }
  }
`

export function DevTools() {
  const dispatch = useDispatch()
  const isDevBuild = process.env.SHOW_DEV === 'included'
  const featureState = useSelector((state) => state.features)
  const labUser = featureFlagActive({ flag: 'lab', featureState })
  const showDevTools = labUser || isDevBuild
  const devMode = useSelector((state) => state.app.devMode)
  const handleKeyCombo = () => dispatch(devModeToggle())
  const onboardingReset = () => dispatch(resetOnboarding())

  useEffect(() => {
    Mousetrap.bind('q a', handleKeyCombo) // Enter dev mode
    return () => Mousetrap.unbind('q a') // Clean up
  }, []) //eslint-disable-line

  return showDevTools && devMode ? (
    <div className={devToolStyle} data-cy="qa-panel">
      <h6>Dev Settings</h6>
      <Features />
      <Languages />
      <button onClick={onboardingReset}>Reset Onboarding</button>
    </div>
  ) : null
}
