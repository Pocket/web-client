import { sectionStyles } from 'components/dev-tools/tool-styles'
import { togglePremium } from 'containers/account/account.state'
import { useDispatch, useSelector } from 'react-redux'

export const PremiumToggle = () => {
  const dispatch = useDispatch()
  const premiumStatus = useSelector((state) => state.user?.premium_status)
  const isPremium = premiumStatus === '1'

  const handleToggle = () => {
    dispatch(togglePremium())
  }

  return (
    <div className={sectionStyles}>
      <h6>Toggle Premium Status</h6>
      <label htmlFor="togglePremium">
        <input
          type="checkbox"
          defaultChecked={isPremium}
          className="toggle"
          onClick={handleToggle}
        />
      </label>
    </div>
  )
}
