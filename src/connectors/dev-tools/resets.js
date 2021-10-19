import { css } from 'linaria'
import { resetOnboarding } from 'connectors/onboarding/onboarding.state'
import { useDispatch } from 'react-redux'

const resetStyles = css`
  h6 {
    padding-top: 2rem;
    font-weight: 600;
  }
  .resetter {
    cursor: pointer;
    border-radius: var(--borderRadius);
    border: 1px solid var(--color-calloutBackgroundPrimary);
    background-color: var(--color-calloutBackgroundPrimary);
    display: flex;
    padding: 0.5rem;
    text-decoration: none;
    &:hover {
      color: var(--color-textPrimary);
      border-color: var(--color-formFieldBorder);
    }
  }
  .title {
    font-weight: 500;
    padding-right: 1rem;
  }
  .description {
    color: var(--color-textSecondary);
  }
`

export const Resets = () => {
  const dispatch = useDispatch()
  const onboardingReset = () => dispatch(resetOnboarding())

  return (
    <div className={resetStyles}>
      <h6>Account Resets</h6>
      <div className="resetter" onClick={onboardingReset}>
        <div className="title">Reset Onboarding</div>
        <div className="description">Start onboarding from the start</div>
      </div>
    </div>
  )
}
