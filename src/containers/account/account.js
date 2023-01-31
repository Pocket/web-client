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
import { useEffect } from 'react'

export const Account = () => {
  const dispatch = useDispatch()

  // https://github.com/vercel/next.js/issues/11109#issuecomment-952397638 Work-around for scrolling to anchors on page load [FRONT-1571]
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(()=> {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  // Profile content
  const isLoggedIn = useSelector((state) => !!state.user.auth)
  const isPremium = useSelector((state) => state.user.premium_status === '1')
  const { t } = useTranslation()

  const onImpression = () => dispatch(sendSnowplowEvent('account.premium.upsell'))
  const onPremiumImpression = (inView) => (inView ? onImpression() : null)

  return isLoggedIn ? (
    <Layout title="Pocket - Account">
      <SideNav type="account" isLoggedIn={isLoggedIn} />
      <main className={`main ${accountStyles}`}>
        <h1>{t('account:manage-your-account', 'Manage your account')}</h1>
        <Premium isPremium={isPremium} onPremiumImpression={onPremiumImpression}/>
        <Profile />
        <Email />
        <Braze />
        <ConnectedServices />
        <RSSFeeds />
        <Privacy />
      </main>
      <Toasts />
    </Layout>
  ) : null
}
