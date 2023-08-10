import { useSelector, useDispatch } from 'react-redux'

import { Privacy as PrivacyComponent } from 'components/account/privacy/privacy'
import { AccountDeleteModal } from 'containers/account/privacy/confirm-delete'
import { AccountClearModal } from 'containers/account/privacy/confirm-clear'

import { accountClear } from './privacy.state'
import { accountDelete } from './privacy.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Privacy = () => {
  const dispatch = useDispatch()
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const dispatchAccountClear = () => dispatch(accountClear())
  const dispatchAccountDelete = () => dispatch(accountDelete())
  const featureState = useSelector((state) => state.features)
  const isFxa = featureFlagActive({ flag: 'fxa', featureState })

  return (
    <>
      <PrivacyComponent
        isFxa={isFxa}
        accountDelete={dispatchAccountDelete}
        accountClear={dispatchAccountClear}
      />
      <AccountDeleteModal isPremium={isPremium} />
      <AccountClearModal />
    </>
  )
}
