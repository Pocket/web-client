import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { Toasts } from 'connectors/toasts/toast-list'
import { useSelector } from 'react-redux'
import { accountStyles } from 'components/account/account'
import { Profile } from 'containers/account/profile/profile'
import { Email } from 'containers/account/email/email'

export const Account = () => {
  // Profile content
  const isLoggedIn = useSelector((state) => !!state.user.auth)

  return isLoggedIn ? (
    <Layout title="Pocket - Account">
      <SideNav type="account" isLoggedIn={isLoggedIn} />
      <main className={`main ${accountStyles}`}>
        <h1>Manage your account</h1>
        <Profile />
        <Email />
      </main>
      <Toasts />
    </Layout>
  ) : null
}
