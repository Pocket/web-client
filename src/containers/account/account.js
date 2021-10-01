import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { Toasts } from 'connectors/toasts/toast-list'
import { useSelector } from 'react-redux'
import { accountStyles } from 'components/account/account'
import { Premium } from 'components/account/premium/premium'
import { Profile } from 'containers/account/profile/profile'
import { Email } from 'containers/account/email/email'
import { Notifications } from 'containers/account/notifications/notifications'
import { ConnectedServices } from 'containers/account/connections/connections'
import { RSSFeeds } from 'containers/account/rss/rss'
import { Privacy } from 'containers/account/privacy/privacy'

export const Account = () => {
  // Profile content
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const isPremium = useSelector((state) => state.user.premium_status === '1')

  return isLoggedIn ? (
    <Layout title="Pocket - Account">
      <SideNav type="account" isLoggedIn={isLoggedIn} />
      <main className={`main ${accountStyles}`}>
        <h1>Manage your account</h1>
        <Premium isPremium={isPremium} />
        <Profile />
        <Email />
        <Notifications />
        <ConnectedServices />
        <RSSFeeds />
        <Privacy />
      </main>
      <Toasts />
    </Layout>
  ) : null
}
