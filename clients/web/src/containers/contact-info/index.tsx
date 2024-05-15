import style from './style.module.css'

import Layout from 'layouts/main'
import { useTranslation, Trans } from 'next-i18next'
/**
 * PocketAndFirefox
 * ---
 * Marketing page for firefox new tab
 */
export function ContactInfo() {
  const { t } = useTranslation()
  return (
    <Layout>
      {/* prettier-ignore */}
      <section className={style.base}>
        <h1>{t('marketing-contact-info:contact-info', 'Contact Info')}</h1>

        <Trans t={t} i18nKey="marketing-contact-info:support">
        <h2>Support</h2>
        <p>To get help with Pocket or to request features, please visit our <a href="https://help.getpocket.com">support page</a>.</p>
        </Trans>

        <Trans t={t} i18nKey="marketing-contact-info:press">
        <h2>Press</h2>
        <p>Images & Press Kit: <a href="https://blog-assets.getpocket.com/Pocket-Press-Assets-2019.zip">Download</a></p>
        <p>For press questions related to Pocket, please contact us at <a href="mailto:press@getpocket.com">press@getpocket.com</a></p>
        </Trans>

        <Trans t={t} i18nKey="marketing-contact-info:contact-info">
        <h2>Sponsorships/Business</h2>
        <p>For questions related to business, please contact us at <a href="mailto:business@getpocket.com">business@getpocket.com</a>.</p>
        <p>For questions related to sponsorships, please contact us at <a href="mailto:sponsor@getpocket.com">sponsor@getpocket.com</a>.</p>
        </Trans>

        <Trans t={t} i18nKey="marketing-contact-info:security">
        <h2>Security</h2>
        <p>If you believe you have discovered a security vulnerability in Pocket, please follow Mozilla’s bug reporting process documented on <a href="https://www.mozilla.org/en-US/about/governance/policies/security-group/bugs/">Mozilla’s Security page</a>.</p>
        <p>For questions related to security, please contact us at <a href="mailto:security@mozilla.org">security@mozilla.org</a>.</p>
        </Trans>

        <Trans t={t} i18nKey="marketing-contact-info:follow-us">
        <h2>Follow Us</h2>
        <ul>
        <li>X (formerly Twitter) (<a href="https://twitter.com/pocket">@pocket</a>, <a href="https://twitter.com/pocketsupport">@pocketsupport</a>)</li>
        <li><a href="https://www.facebook.com/getpocket">Facebook</a></li>
        <li><a href="https://www.instagram.com/pocket/">Instagram</a></li>
        </ul>
        </Trans>

        <Trans t={t} i18nKey="marketing-contact-info:hq">
        <h2>HQ</h2>
        <address>
            Mozilla Corporation/Pocket Business Unit <br/>
            149 New Montgomery St, 4th Floor <br/>
            San Francisco, CA 94105 <br/>
            <a href="tel:4156926111" aria-label="4 1 5. 6 9 2. 6 1 1 1.">415-692-6111</a>
        </address>
      </Trans>
      </section>
    </Layout>
  )
}
