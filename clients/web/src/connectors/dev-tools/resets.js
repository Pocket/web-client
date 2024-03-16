import { sectionStyles } from 'components/dev-tools/tool-styles'
import { resetSetupMoment } from 'containers/home/setup/setup.state'
import { useDispatch } from 'react-redux'

export const Resets = () => {
  const dispatch = useDispatch()

  const setupMomentReset = () => dispatch(resetSetupMoment())

  return (
    <div className={sectionStyles}>
      <h6>Account Resets</h6>
      <div className="action-block" onClick={setupMomentReset}>
        <div className="title">Reset Topic Selectors</div>
        <div className="description">Start topic selectors from the start</div>
      </div>
    </div>
  )
}
