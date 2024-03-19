import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { Toasts } from 'connectors/toasts/toast-list'
import { useSelector, useDispatch } from 'react-redux'
import { accountStyles } from 'components/account/account'
import { Premium } from 'components/account/premium/premium'
import { Profile } from 'containers/account/profile/profile'
import { Email } from 'containers/account/email/email'
import { Braze } from 'containers/account/braze/braze'
import { ConnectedServices } from 'containers/account/connections/connections'
import { RSSFeeds } from 'containers/account/rss/rss'
import { Privacy } from 'containers/account/privacy/privacy'
import { useTranslation } from 'next-i18next'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'


export const Account = () => {
  const dispatch = useDispatch()

  // Profile content
  const isLoggedIn = useSelector((state) => !!state.user.auth)

  // Has the user migrated to FXA?
  const { isFXA } = useSelector((state) => state.user)

  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const { t } = useTranslation()

  const onImpression = () => dispatch(sendSnowplowEvent('account.premium.upsell'))
  const onPremiumImpression = (inView) => (inView ? onImpression() : null)

  return isLoggedIn ? (
    <Layout title="Pocket - Account">
      <SideNav type="account" isLoggedIn={isLoggedIn} />
      <main className={`main ${accountStyles}`}>
        <h1>{t('account:manage-your-profile', 'Manage your profile')}</h1>
        <Premium isPremium={isPremium} onPremiumImpression={onPremiumImpression} />
        <Profile />
        <Email />
        <Braze />
        <ConnectedServices />
        {isFXA ? null : <RSSFeeds />}
        <Privacy />
      </main>
      <Toasts />
    </Layout>
  ) : null
}
