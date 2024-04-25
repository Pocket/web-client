import style from './style.module.css'
import Layout from 'layouts/main'

import ArticleCarousel from 'static/images/about/article-carousel.png'
import PocketList from 'static/images/about/pocket-list.png'
import Focus from 'static/images/about/focused-reading.png'
import SaveFrom from 'static/images/about/save-button-doodle.svg'
import PrivateNook from 'static/images/about/reading-nook.png'

import { Trans, useTranslation } from 'next-i18next'
import { SaveIcon } from '@ui/icons/SaveIcon'

/**
 * PocketAndFirefox
 * ---
 * Marketing page for firefox new tab
 */
export function About() {
  const { t } = useTranslation()
  return (
    <Layout isFullWidthLayout={true}>
      <main className={style.base} data-testid="marketing-pocket-and-firefox">
        <header>
          <div className={`${style.headerContent} page-container`}>
            <div>
              <Trans t={t} i18nKey="marketing-about:hi-were-pocket">
                <h1>Hi, we’re Pocket.</h1>
                <p>
                  We’re powered by a community of interesting people with curious minds, and we
                  empower people to keep their minds focused, stimulated, and nourished. Which makes
                  us a refreshing change from other digital spaces.
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
            <img src={ArticleCarousel.src} alt="" />
          </div>
          <div>
            <Trans t={t} i18nKey="marketing-about:build-a-home">
              <h3>Build a home for everything that interests you with Pocket</h3>
              <p>
                Use Pocket to save anything that sparks your curiosity and enjoy it when you’re
                ready to focus. In no time your list will become a personal library filled with
                enticing content to inform, inspire, and fuel you.
              </p>
            </Trans>
          </div>
        </section>
        <section className="page-container">
          <div>
            <Trans t={t} i18nKey="marketing-about:save-from-anywhere">
              <h3>Save from anywhere on the web</h3>
              <p>
                Once you’ve signed up, add the <SaveIcon /> button to your browser for the fastest
                and easiest way to save articles, videos, and links to your personal library.
              </p>
            </Trans>
          </div>
          <div className={style.media}>
            <img src={SaveFrom.src} alt="" />
          </div>
        </section>
        <section className="page-container">
          <div className={style.media}>
            <img src={PrivateNook.src} alt="" />
          </div>
          <div>
            <Trans t={t} i18nKey="marketing-about:private-nook">
              <h3>Your private reading nook</h3>
              <p>
                When you’re ready to dig into what you’ve saved, Pocket provides a quiet, calm space
                that’s perfect for reading. It strips away all the distractions of the internet —
                like flashing banners and pop-ups — so you can really focus.
              </p>
            </Trans>
          </div>
        </section>
        <section className="page-container">
          <div>
            <Trans t={t} i18nKey="marketing-about:focused-reading">
              <h3>Special features for focused reading</h3>
              <p>
                Use the Pocket app to listen to stories with our audio playback option. Customize
                how you see stories in Pocket with dark mode and font options. Keep track of your
                saves with tags, and preserve important passages with highlights. You can even read
                offline.
              </p>
            </Trans>
          </div>
          <div className={`${style.media} ${style.focusedReading}`}>
            <img src={Focus.src} alt="" />
          </div>
        </section>

        <section className={`page-container ${style.footer}`}>
          <Trans t={t} i18nKey="marketing-about:welcome-to-the-sunny-side">
            <h2>Welcome to the sunny side of the web</h2>
            <div>
              <a className="button brand large" href="https://getpocket.com/signup">
                Start using Pocket
              </a>
            </div>
            <hr />
            <p>
              Contact us for press inquiries at{' '}
              <a href="mailto:press@getpocket.com">press@getpocket.com</a>.
            </p>

            <p>
              Download our images and press kit{' '}
              <a id="press-page" href="https://blog.getpocket.com/press/">
                here
              </a>
              .
            </p>
          </Trans>
        </section>
      </main>
    </Layout>
  )
}
