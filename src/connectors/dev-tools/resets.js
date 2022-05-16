import { css } from 'linaria'
import { resetOnboarding } from 'connectors/onboarding/onboarding.state'
import { useDispatch, useSelector } from 'react-redux'

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

    & + .resetter {
      margin-top: 1rem;
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
  const { user_id } = useSelector((state) => state.user)

  const onboardingReset = () => dispatch(resetOnboarding())

  const isDev = process.env.NODE_ENV === 'development'
  const wipeBrazeData = () => {
    import('common/utilities/braze/braze-lazy-load').then(({ wipeData, changeUser }) => {
      wipeData(), changeUser(user_id)
    })
  }

  return (
    <div className={resetStyles}>
      <h6>Account Resets</h6>
      <div className="resetter" onClick={onboardingReset}>
        <div className="title">Reset Onboarding</div>
        <div className="description">Start onboarding from the start</div>
      </div>
      {isDev ? (
        <div className="resetter" onClick={wipeBrazeData}>
          <div className="title">Reset Braze</div>
          <div className="description">Wipes data and starts new session</div>
        </div>
      ) : null}
    </div>
  )
}
