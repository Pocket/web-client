import style from './style.module.css'
import Layout from 'layouts/main'

import ArticleCarousel from 'static/images/about/article-carousel.png'
import PocketList from 'static/images/about/pocket-list.png'
import SaveFrom from 'static/images/about/save-button-doodle.svg'
import PrivateNook from 'static/images/about/reading-nook.png'
import PocketYourWay from 'static/images/about/pocket-your-way.png'

import { Trans, useTranslation } from 'next-i18next'

/**
 * Farewell
 * ---
 * So long, farewell, Auf Wiedersehen, goodbye.
 */
export function Farewell() {
  const { t } = useTranslation()
  return (
    <Layout isFullWidthLayout={true}>
      <main className={style.base} data-testid="goodbye">
        <header>
          <div className={`${style.headerContent} page-container`}>
            <div>
              <Trans t={t} i18nKey="goodbye:announcement">
                <h1>So long, farewell, Auf Wiedersehen...</h1>
                <p>
                  After careful consideration, we’ve made the difficult decision to phase out Pocket
                  - our read-it-later and content discovery app. This includes the Pocket Web,
                  Android, iOS, and macOS apps, as well as the Pocket browser extensions.
                </p>
              </Trans>
            </div>
            <div className={style.media}>
              <img src={PocketList.src} alt="" />
            </div>
          </div>
        </header>
        <section className="page-container">
          <div className={style.media}>
            <img src={PocketYourWay.src} alt="" />
          </div>
          <div>
            <Trans t={t} i18nKey="goodbye:why">
              <h3>Why is Pocket shutting down?</h3>
              <p>
                Pocket has helped millions save articles and discover stories worth reading. But the
                way people save and consume content on the web has evolved, so we’re channeling our
                resources into projects that better match browsing habits today. Discovery also
                continues to evolve; Pocket helped shape the curated content recommendations you
                already see in Firefox, and that experience will keep getting better. Meanwhile, new
                features like Tab Groups and enhanced bookmarks now provide built-in ways to manage
                reading lists easily.
              </p>
            </Trans>
          </div>
        </section>
        <section className="page-container">
          <div>
            <Trans t={t} i18nKey="goodbye:investing-in-the-future">
              <h3>Investing in the future</h3>
              <p>
                Firefox is the only major browser not backed by a billionaire and our independence
                shapes everything we build. This independence allows us to prioritize building
                products and tools, which shape the future of the internet for the better. And it
                means we have to be intentional about where we invest our time and resources so we
                can make the biggest impact.
              </p>
            </Trans>
          </div>
          <div className={style.media}>
            <img src={PrivateNook.src} alt="" />
          </div>
        </section>
        <section className="page-container">
          <div className={style.media}>
            <img src={SaveFrom.src} alt="" />
          </div>
          <div>
            <Trans t={t} i18nKey="goodbye:pocket-heritage">
              <h3>Pocket’s Heritage</h3>
              <p>
                What began as a read-it-later app evolved into something much bigger. After Mozilla
                acquired Pocket in 2017, we invested in building content curation and recommendation
                capabilities so people everywhere can discover and access high quality web content.
              </p>
              <p>
                In the past 8 years, we’ve expanded high-quality content recommendations to more
                than a dozen countries and five languages, connecting tens of millions of people
                each month with articles worthy of their time and attention.
              </p>
            </Trans>
          </div>
        </section>
        <section className={`page-container ${style.commitment}`}>
          <div>
            <Trans t={t} i18nKey="goodbye:mozilla-commitment">
              <h3>Mozilla’s commitment to high-quality content recommendations</h3>
              <p>
                While Pocket is shutting down, Mozilla continues with our commitment to high-quality
                content recommendations in Firefox. We take an “algotorial” approach to curating the
                best of the web for the millions of users who make Firefox their window to the
                internet. We use machine learning algorithms to scour the internet for high quality
                content that will appeal to Firefox’s large and diverse user base, while relying on
                a human editorial team to provide oversight to ensure that the recommendations on
                Firefox New Tab are trustworthy, engaging, and high quality.
              </p>
            </Trans>
          </div>
          <div className={style.media}>
            <img src={ArticleCarousel.src} alt="" />
          </div>
        </section>

        <section className={`page-container ${style.whatsNext}`}>
          <Trans t={t} i18nKey="goodbye:what-happens-next">
            <h2>What happens next?</h2>

            <div>
              <h4>Saves Export</h4>
              <ul>
                <li>
                  You can{' '}
                  <a href="https://support.mozilla.org/kb/exporting-your-pocket-list">export</a>{' '}
                  saves anytime until October 8, 2025, after which all user data will be permanently
                  deleted.
                </li>
                <li>
                  For account support and enquiries, please visit the{' '}
                  <a href="https://support.mozilla.org/products/pocket">Pocket support page.</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Premium User Subscriptions</h4>
              <ul>
                <li>
                  Premium monthly subscriptions will be cancelled automatically before their next
                  billing cycle.
                </li>
                <li>
                  Premium annual subscriptions will be cancelled on July 8, and users will receive a
                  prorated refund automatically. The refund will be based on how much time is left
                  in their subscription after July 8, 2025.
                </li>
                <li>
                  We’ve arranged refunds to users’ original payment method based on their
                  subscription type.
                </li>
              </ul>
            </div>

            <div>
              <h4>Pocket Hits </h4>
              <ul>
                <li>
                  The Pocket email newsletter “Pocket Hits”, which offers readers daily and weekly
                  curation of engaging content from trustworthy sources, will be renamed mid-June
                  2025, to “Ten Tabs ”. All readers will be notified about these changes in the
                  email newsletter.
                </li>
                <li>
                  Readers will continue receiving the same high-quality content in the usual format,
                  curated by the same editorial team, but now powered by Firefox. Those who no
                  longer wish to receive the newsletter can opt out via the unsubscribe link at the
                  bottom of the email.
                </li>
              </ul>
            </div>

            <div className={style.additional}>
              <a
                className="button secondary large"
                href="https://support.mozilla.org/en-US/kb/future-of-pocket">
                Additional details
              </a>
            </div>
          </Trans>
        </section>

        <section className={`page-container ${style.footer}`}>
          <Trans t={t} i18nKey="goodbye:thank-you">
            <h2>Thank you for being a part of this journey</h2>
            <hr />
            <p>
              Contact us for press inquiries at{' '}
              <a href="mailto:press@getpocket.com">press@getpocket.com</a>.
            </p>
          </Trans>
        </section>
      </main>
    </Layout>
  )
}
