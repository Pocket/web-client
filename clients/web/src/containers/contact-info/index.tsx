import style from './style.module.css'

import Layout from 'layouts/main'
import { useTranslation } from 'next-i18next'
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
        <h1>Contact Info</h1>

        <h2>Support</h2>
        <p>To get help with Pocket or to request features, please visit our <a href="https://help.getpocket.com">support page</a>.</p>

        <h2>Press</h2>
        <p>For press inquiries or media assets, please visit our <a href="https://blog.getpocket.com/press/">press page</a>.</p>

        <h2>Sponsorships/Business</h2>
        <p>For questions related to business, please contact us at <a href="mailto:business@getpocket.com">business@getpocket.com</a>.</p>
        <p>For questions related to sponsorships, please contact us at <a href="mailto:sponsor@getpocket.com">sponsor@getpocket.com</a>.</p>

        <h2>API</h2>
        <p>For questions, problems, and suggestions regarding our API, please contact us at <a href="mailto:api@getpocket.com">api@getpocket.com</a>.</p>

        <h2>Jobs</h2>
        <p>To view all open positions at Pocket, please visit our <a href="/en/jobs/">Jobs Page</a>.</p>

        <h2>Security</h2>
        <p>If you believe you have discovered a security vulnerability in Pocket, please follow Mozilla’s bug reporting process documented on <a href="https://www.mozilla.org/en-US/about/governance/policies/security-group/bugs/">Mozilla’s Security page</a>.</p>
        <p>For questions related to security, please contact us at <a href="mailto:security@getpocket.com">security@getpocket.com</a>.</p>

        <h2>Follow Us</h2>
        <p><a href="https://blog.getpocket.com/">Pocket Blog</a></p>
        <p>X (formerly Twitter) (<a href="https://twitter.com/pocket">@pocket</a>, <a href="https://twitter.com/pocketsupport">@pocketsupport</a>)</p>
        <p><a href="https://www.facebook.com/getpocket">Facebook</a></p>
        <p><a href="https://www.instagram.com/pocket/">Instagram</a></p>

        <h2>HQ</h2>
        <address>
            Mozilla Corporation/Pocket Business Unit <br/>
            149 New Montgomery St, 4th Floor <br/>
            San Francisco, CA 94105 <br/>
            <a href="tel:4156926111" aria-label="4 1 5. 6 9 2. 6 1 1 1.">415-692-6111</a>
        </address>
      </section>
    </Layout>
  )
}
