import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css, cx } from '@emotion/css'
import Head from 'next/head'
import Layout from 'layouts/main'
import metaImage from 'static/images/social-share/rainbow-lady.png'
import bookLibrary from 'static/images/book-library.svg'
import rainbowReader from 'static/images/rainbow-reader.svg'
import EmailSignupForm from 'components/email-signup-form/email-signup-form'
import { PageContainer } from 'components/page-container/page-container'
import {
  breakpointLargeHandset,
  breakpointMediumHandset,
  breakpointMediumTablet,
  breakpointSmallHandset
} from 'common/constants'
import PublisherGrid from 'components/pocket-hits-signup/publisher-grid'
import { pocketHitsSignupRequested } from 'connectors/pocket-hits/pocket-hits.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

/** STYLES
 ---------------------------------------------------------------------------- */

const windowWrapper = css`
  width: 100%;
  height: 100%;
  /* needed to prevent captcha badge overflow */
  overflow-x: hidden;
`

const containerStyle = css`
  padding: var(--spacing250) 0;
  max-width: 740px;
  margin: 0 auto;

  h1 {
    font-weight: 400;
    text-align: center;
    font-family: var(--fontSerifAlt);
    font-size: var(--fontSize250);
  }

  h3 {
    font-weight: 300;
    text-align: center;
    font-family: var(--fontSansSerif);
    margin-bottom: var(--spacing250);
  }

  ${breakpointMediumTablet} {
    padding: 0 0 var(--spacing150);

    h1 {
      font-size: var(--fontSize200);
    }

    h3 {
      margin-bottom: var(--spacing150);
    }
  }

  ${breakpointLargeHandset} {
    padding: var(--spacing100) 0 var(--spacing150);
  }

  ${breakpointMediumHandset} {
    h1 {
      font-size: var(--fontSize175);
      line-height: 130%;
      margin-bottom: var(--spacing075);
    }

    h3 {
      font-size: var(--fontSize100);
      margin-bottom: var(--spacing150);
    }
  }

  ${breakpointSmallHandset} {
    padding: var(--spacing050) 0 var(--spacing150);

    h1,
    h3 {
      text-align: left;
    }
  }
`

const formContainerStyle = css`
  margin-bottom: var(--spacing650);

  ${breakpointSmallHandset} {
    margin-bottom: var(--spacing400);
    form {
      margin-bottom: var(--spacing100);
    }
  }

  p {
    font-family: var(--fontSansSerif);
    font-size: 1rem;
  }
`

const formSubtextWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const formSubtextLinks = css`
  a {
    display: inline-block;
    font-family: var(--fontSansSerif);
    font-size: var(--fontSize085);
    font-weight: 300;
    margin-left: var(--spacing025);
  }
  span {
    padding: 0 0 0 0.25rem;
  }
`

const heroImgStyle = css`
  position: relative;
  /* graphic is styled to overflow the boundaries of the content, so that on larger
  screens the whole thing is visible, at small screens it becomes cropped. */
  top: -6%;
  left: -6%;
  width: 112%;
  margin: 0 0 var(--spacing250);

  ${breakpointMediumHandset} {
    width: 140%;
    top: -20%;
    left: -20%;
  }
`

const mustReadsContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing400);

  img {
    position: relative;
    width: 100%;
    max-width: 170px;
    margin: 0 auto var(--spacing250);
  }

  a {
    margin: 0 auto;
  }

  ${breakpointMediumHandset} {
    img {
      max-width: 140px;
    }
  }
`

const ruledHeadingStyle = css`
  display: block;
  font-family: var(--fontSansSerif);
  font-weight: normal;
  font-size: var(--fontSize100);
  line-height: 1.75em;
  padding-bottom: var(--spacing050);
  margin-bottom: var(--spacing250);
  color: var(--color-textSecondary);
  border-bottom: 2px solid var(--color-actionBrand);

  &.color-amber {
    border-bottom: 2px solid var(--color-amber);
  }
`

/** COMPONENT
 ---------------------------------------------------------------------------- */

/**
 * Pocket Hits Signup Page UI
 */
export default function PocketHitsSignupPage({ language = 'en' }) {
  /* Variables */
  const dispatch = useDispatch()
  const signupRequestState = useSelector((state) => state.pocketHits.signupRequestState)
  const signupError = useSelector((state) => state.pocketHits.signupError)
  const [activeForm, setActiveForm] = useState()

  const isProcessing = signupRequestState === 'pending'
  const isSuccessful = signupRequestState === 'success'

  /* Effects */

  useEffect(() => {
    // event: request success
    if (signupRequestState === 'success') {
      handleSubmitSuccess()
    }
  }, [signupRequestState])

  /* Event Handlers */

  function handleEmailSubmit(formId, email, recaptchaResponseKey, marketingOptIn) {
    setActiveForm(formId)

    dispatch(sendSnowplowEvent('pocket-hits.signup', { email, locale: language }))

    dispatch(
      pocketHitsSignupRequested(
        email,
        recaptchaResponseKey,
        'explore-signup',
        'marketing',
        language,
        marketingOptIn
      )
    )
  }

  function handleSubmitSuccess() {
    // if the user was looking at the bottom form, scroll them to the top so they
    // can see the success message
    if (global && global.scrollTo) {
      global.scrollTo(0, 0)
    }
  }

  /* Output */
  return (
    <>
      <Head>
        {/* Default language */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://getpocket.com/en/explore/pocket-hits-signup/"></link>
        {/* List of available languages */}
        <link
          rel="alternate"
          hrefLang="en"
          href="https://getpocket.com/en/explore/pocket-hits-signup/"
          title="English"></link>
      </Head>

      <div className={windowWrapper}>
        <Layout
          title="Pocket: Pocket Hits Newsletter Signup"
          metaData={{
            url: 'https://getpocket.com/en/explore/pocket-hits-signup/',
            description:
              'Get Pocket’s newsletter and you’ll see fascinating articles of depth, substance and insight selected from trusted sources.',
            image: language === 'en' ? `${metaImage.src}` : null,
            title: 'Pocket: Pocket Hits Newsletter Signup'
          }}
          canonical="https://getpocket.com/en/explore/pocket-hits-signup/"
          selectedNavLink={null}
          language={language}
          isFullWidthLayout>
          <PageContainer>
            <div className={containerStyle}>
              {isSuccessful ? (
                <>
                  <h1>Done! Great reads are on the&nbsp;way.</h1>
                  <h3 className="h6">
                    Get ready for a daily dose of the best stories from around the&nbsp;web.
                  </h3>
                  <div className={mustReadsContainer}>
                    <img src={bookLibrary.src} alt="" />
                    <a className="button emphasized" href="/explore">
                      Discover Must-Read Articles
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="h3">
                    Your guide to the most fascinating articles from top&nbsp;publications.
                  </h1>
                  <h3 className="h6">
                    Join millions of Pocket Hits subscribers and get inspired with our
                    daily&nbsp;newsletter.
                  </h3>
                  <div className={formContainerStyle}>
                    <EmailSignupForm
                      instanceId="top"
                      isProcessing={activeForm === 'top' && isProcessing}
                      onValidSubmit={handleEmailSubmit}
                      errorMessage={
                        activeForm === 'top' && signupError ? 'Oops! Something went wrong.' : null
                      }
                      displayErrorInline
                      buttonVariant="emphasized"
                      inputLabel="Your email address"
                      buttonLabel="Subscribe"
                      invalidEmailError="Invalid email address"
                      buttonLabelProcessing="Working on it …"
                    />

                    <div className={formSubtextWrapper}>
                      <span className={formSubtextLinks}>
                        <a href="/privacy" rel="noopener">
                          Privacy
                        </a>
                        <span>·</span>
                        <a href="/tos" rel="noopener">
                          Terms
                        </a>
                      </span>
                    </div>
                  </div>
                  <img src={rainbowReader.src} className={heroImgStyle} alt="" />
                </>
              )}

              <h6 className={cx(ruledHeadingStyle, 'color-amber')}>
                See stories from publishers like these
              </h6>

              <PublisherGrid />

              {!isSuccessful ? (
                <>
                  <h6 className={ruledHeadingStyle}>{'Sign up for Pocket Hits'}</h6>
                  <EmailSignupForm
                    instanceId="bottom"
                    isProcessing={activeForm === 'bottom' && isProcessing}
                    onValidSubmit={handleEmailSubmit}
                    errorMessage={
                      activeForm === 'bottom' && signupError ? 'Oops! Something went wrong.' : null
                    }
                    buttonVariant="emphasized"
                  />
                </>
              ) : null}
            </div>
          </PageContainer>
        </Layout>
      </div>
    </>
  )
}
