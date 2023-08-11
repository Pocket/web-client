import { useSelector, useDispatch } from 'react-redux'

import { Privacy as PrivacyComponent } from 'components/account/privacy/privacy'
import { AccountDeleteModal } from 'containers/account/privacy/confirm-delete'
import { AccountClearModal } from 'containers/account/privacy/confirm-clear'

import { accountClear } from './privacy.state'
import { accountDelete } from './privacy.state'
import { rssProtect } from './privacy.state'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'

export const Privacy = () => {
  const dispatch = useDispatch()
  const rssProtected = useSelector((state) => state?.userPrivacy?.rssProtected)
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const dispatchAccountClear = () => dispatch(accountClear())
  const dispatchAccountDelete = () => dispatch(accountDelete())
  const dispatchRssProtect = () => dispatch(rssProtect(!rssProtected))

  const featureState = useSelector((state) => state.features)
  const isFxa = featureFlagActive({ flag: 'fxa', featureState })

  return (
    <>
      <PrivacyComponent
        isFxa={isFxa}
        rssProtected={rssProtected}
        rssProtect={dispatchRssProtect}
        accountDelete={dispatchAccountDelete}
        accountClear={dispatchAccountClear}
      />
      <AccountDeleteModal isPremium={isPremium} />
      <AccountClearModal />
    </>
  )
}
