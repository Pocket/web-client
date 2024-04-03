import style from './style.module.css'
import Layout from 'layouts/main'

import Books from 'static/images/pocket-and-firefox/books.svg'
import Fortress from 'static/images/pocket-and-firefox/fortress.svg'
import HiddenGem from 'static/images/pocket-and-firefox/hidden-gem.svg'
import Lounge from 'static/images/pocket-and-firefox/lounge.svg'
import Sign from 'static/images/pocket-and-firefox/sign.svg'
import PocketList from 'static/images/pocket-and-firefox/pocket-list.png'
import GrassLeft from 'static/images/pocket-and-firefox/grass-left.png'
import GrassRight from 'static/images/pocket-and-firefox/grass-right.png'

import { FirefoxColorIcon } from '@ui/icons/FirefoxColorIcon'
import { Trans, useTranslation } from 'next-i18next'

/**
 * PocketAndFirefox
 * ---
 * Marketing page for firefox new tab
 */
export function PocketAndFirefox() {
  const { t } = useTranslation()
  return (
    <Layout isFullWidthLayout={true}>
      <main className={style.base} data-testid="marketing-pocket-and-firefox">
        <header>
          <div className={`${style.headerContent} page-container`}>
            <div>
              <h1>
                <div>{t('marketing-ff:pocket-for-firefox', 'POCKET FOR FIREFOX')}</div>
                {t(
                  'marketing-ff:build-your-library',
                  'Build your personal library of fascinating reads.'
                )}
              </h1>
              <p>
                {t(
                  'marketing-ff:included-in-firefox',
                  'Included inside Firefox, the Pocket Logo button lets you save articles from across the web and read them in a quiet, private space.'
                )}
              </p>
              <button className="brand large">
                <FirefoxColorIcon />{' '}
                {t('marketing-ff:activate-pocket-in-ff', 'Activate Pocket in Firefox')}
              </button>
              <Trans t={t} i18nKey="marketing-ff:more-ways-to-signup">
                <a href="https://getpocket.com/signup">More ways to sign up</a>
              </Trans>
            </div>
            <div className={style.media}>
              <img src={PocketList.src} alt="" />
            </div>
          </div>
        </header>
        <h2 className={`${style.subHeading} page-container`}>
          {t(
            'marketing-ff:discover-thought-provoking',
            'Discover the most thought-provoking stories out there, curated by Pocket.'
          )}
        </h2>
        <section className={`${style.hiddenGems} page-container`}>
          <div className={style.media}>
            <img src={HiddenGem.src} alt="" />
          </div>
          <div>
            <Trans t={t} i18nKey="marketing-ff:hidden-gems">
              <h3>Finding the hidden gems. Respecting your privacy.</h3>
              <p>
                As part of the Firefox family, Pocket surfaces the best articles out there — new
                perspectives, intriguing deep-dives, timeless classics — and we do this with the
                same dedication to privacy you’ve come to expect from Firefox and Mozilla.{' '}
                <a href="https://help.getpocket.com/article/1142-firefox-new-tab-recommendations-faq#why">
                  Learn more about how we curate stories.
                </a>
              </p>
            </Trans>
          </div>
        </section>
        <section className={`${style.fortress} page-container`}>
          <div>
            <Trans t={t} i18nKey="marketing-ff:stay-private">
              <h3>Your data stays private. Always.</h3>
              <p>
                In addition to dishing up captivating stories, we also show you relevant,
                highly-vetted content from select sponsors. Rest assured, your browsing data never
                leaves your personal copy of Firefox — we don’t see it, and our sponsors don’t
                either. Want more details? Here’s the full scoop on{' '}
                <a href="https://help.getpocket.com/article/1142-firefox-new-tab-recommendations-faq#personalized">
                  how privacy works in Pocket.
                </a>
              </p>
            </Trans>
          </div>
          <div className={style.media}>
            <img src={Fortress.src} alt="" />
          </div>
        </section>
        <section className={`${style.stories} page-container`}>
          <div className={style.media}>
            <img src={Books.src} alt="" />
          </div>
          <div>
            <Trans t={t} i18nKey="marketing-ff:stories">
              <h3>Fuel your mind with even more fascinating stories.</h3>
              <p>
                Check out Pocket’s <a href="https://getpocket.com/explore">Must Reads</a> for some
                of the best articles on the web. And get thought-provoking stories delivered to you
                daily by subscribing to{' '}
                <a href="https://getpocket.com/explore/pocket-hits-signup">Pocket’s newsletter</a>.
              </p>
            </Trans>
          </div>
        </section>
        <section className={`${style.lounge} page-container`}>
          <div>
            <Trans t={t} i18nKey="marketing-ff:save-in-pocket">
              <h3>Save in Pocket &amp; read on your own time.</h3>

              <p>
                Built right into Firefox, Pocket also lets you save stories and come back to them
                when you’re ready.
              </p>
              <p>
                <a href="/en/pocket-and-firefox/">Activate your account</a>, and then the next time
                you see an article you want to save, click the Pocket icon in the toolbar.
              </p>
            </Trans>
          </div>
          <div className={style.media}>
            <img src={Lounge.src} alt="" />
          </div>
        </section>
        <div className={`${style.youMakeTheCall} page-container`}>
          <img src={Sign.src} alt="" />
          <section>
            <div>
              <Trans t={t} i18nKey="marketing-ff:you-make-the-call">
                <h3>You make the call.</h3>
                <p>
                  It’s easy to{' '}
                  <a href="https://help.getpocket.com/article/1142-firefox-new-tab-recommendations-faq#turn-off">
                    turn off
                  </a>{' '}
                  Pocket’s recommendations and remove them from your new tab page. But remember: if
                  you don’t like today’s stories, there’s always tomorrow!
                </p>
              </Trans>
            </div>
            <ul>
              <li>
                <a href="https://help.getpocket.com/article/1142-firefox-new-tab-recommendations-faq">
                  {t('marketing-ff:faq', 'Frequently asked questions')}
                </a>
              </li>
              <li>
                <a href="/en/privacy/">{t('marketing-ff:privacy', 'Privacy policy')}</a>
              </li>
              <li>
                <a href="/en/tos/">{t('marketing-ff:tos', 'Terms of service')}</a>
              </li>
              <li>
                <a href="https://getpocket.com/sponsor">
                  {t('marketing-ff:sponsorship', 'Sponsorship opportunities')}
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className={style.grassFooter}>
          <img className={style.grassLeft} src={GrassLeft.src} alt="" />
          <img className={style.grassRight} src={GrassRight.src} alt="" />
        </div>
      </main>
    </Layout>
  )
}
