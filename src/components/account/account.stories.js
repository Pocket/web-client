import { accountStyles } from 'components/account/account'

import { Premium as PremiumComp } from './premium/premium'
import { Privacy as PrivacyComp } from './privacy/privacy'
import { EmailAddresses as EmailAddressesComp } from './email/addresses'
import { EmailNotifications as EmailNotificationsComp } from './email/notifications'
import { Profile as ProfileComp } from './profile/profile'
import { PocketApps as PocketAppsComp } from './connections/pocket-apps'
import { Services as ServicesComp } from './connections/services'
import { ThirdParty as ThirdPartyComp } from './connections/third-party-apps'
import { RSSFeeds as RSSFeedsComp } from './rss/rss'

export default {
  title: 'Components/Account',
  decorators: [
    (Story) => (
      <div className={accountStyles}>
        <Story />
      </div>
    )
  ]
}

export const Premium = () => <PremiumComp />
export const Profile = () => <ProfileComp />
export const EmailAddresses = () => <EmailAddressesComp />
export const EmailNotifications = () => <EmailNotificationsComp />
export const Privacy = () => <PrivacyComp />
export const PocketApps = () => <PocketAppsComp />
export const Services = () => <ServicesComp />
export const ThirdParty = () => <ThirdPartyComp />
export const RSSFeeds = () => <RSSFeedsComp />
