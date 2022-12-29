import { sectionStyles } from 'components/dev-tools/tool-styles'
import { resetOnboarding } from 'containers/home/onboarding/onboarding.state'
import { resetSetupMoment } from 'containers/home/setup/setup.state'
import { useDispatch } from 'react-redux'

export const Resets = () => {
  const dispatch = useDispatch()

  const setupMomentReset = () => dispatch(resetSetupMoment())
  const onboardingReset = () => dispatch(resetOnboarding())

  return (
    <div className={sectionStyles}>
      <h6>Account Resets</h6>
      <div className="action-block" onClick={setupMomentReset}>
        <div className="title">Reset Topic Selectors</div>
        <div className="description">Start topic selectors from the start</div>
      </div>
      <div className="action-block" onClick={onboardingReset}>
        <div className="title">Reset Setup Moment</div>
        <div className="description">Start setup moment from the start</div>
      </div>
    </div>
  )
}
