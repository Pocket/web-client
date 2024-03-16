import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { css, cx } from '@emotion/css'
import EmailSignupForm from 'components/email-signup-form/email-signup-form'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { pocketHitsSignupRequested } from 'connectors/pocket-hits/pocket-hits.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { breakpointSmallDesktop } from 'common/constants' // 1279
import { breakpointSmallTablet } from 'common/constants' // 839
import { breakpointTinyTablet } from 'common/constants' // 719
import { breakpointLargeHandset } from 'common/constants' // 599
import { useTranslation } from 'next-i18next'

const FORM_ID = 'explore-engagement-signup'

const wrapper = css`
  display: block;
  color: var(--color-textPrimary);
  width: 100%;
  padding: var(--spacing400) 0;
  border-bottom: var(--dividerStyle);

  .brandBlock {
    width: 100%;
    position: relative;
    max-width: 940px;
    margin: 0 auto;

    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }

  blockquote {
    float: right;
    position: relative;
    text-align: left;
    max-width: 552px;
    background-color: var(--color-calloutBackgroundPrimary);
    padding: var(--spacing150) 2.8125rem 0;
    /* negative top margin matches bottom padding on aside */
    margin: calc(-5.625rem + 1.5rem) 6rem 0 14rem;
    font-family: var(--fontSansSerif);
    font-size: var(--fontSize100);
    font-weight: 400;
    line-height: 150%;
  }

  aside {
    display: block;
    width: 100%;
    top: 0;
    left: 0;
    font-family: var(--fontSerifAlt);
    font-size: var(--fontSize175);
    font-weight: 500;
    line-height: 129%;
    padding: var(--spacing150) var(--spacing250) 5.625rem;
    background-color: var(--color-calloutBackgroundSecondary);
  }

  .copy {
    position: relative;
    display: block;

    &.isSuccessful {
      padding: 2.75rem var(--spacing075) 4.25rem;
      font-family: var(--fontSerifAlt);
      font-size: var(--fontSize150);
      font-weight: 500;
      line-height: 122%;
      text-align: center;
    }
  }

  .zigzag {
    position: absolute;
    top: 0;
    left: calc(-1 * var(--size150));
    transform: translate(-100%, 50%);
    stroke: var(--color-calloutAccent);
  }

  #pocket-hits-call-out-signup {
    margin-top: var(--spacing100);

    /* targets input wrapper */
    form > div > div {
      margin-bottom: var(--spacing075);
    }
    input {
      background-color: var(--color-canvas);
    }
    .label-wrapper label {
      background-color: var(--color-canvas);
      border-color: var(--color-canvas);
      border-radius: 4px;
    }

    button:hover {
      background-color: var(--color-actionPrimary);
      text-decoration: underline;
    }

    button[disabled] {
      padding: var(--spacing075) var(--spacing250);
    }
  }

  .captchaDisclaimer {
    padding-bottom: var(--fontSize150);
    font-size: var(--fontSize085);
    font-family: var(--fontSansSerif);
    color: var(--color-textSecondary);
    line-height: 143%;
    width: 100%;
  }

  ${breakpointSmallDesktop} {
    margin-right: var(--spacing250);
  }

  ${breakpointSmallTablet} {
    blockquote {
      margin-right: var(--spacing400);
      margin-left: 11rem;
      padding: var(--spacing150) var(--spacing150) 0;
    }
    aside {
      padding: var(--spacing150) var(--spacing150) 5.11rem;
    }
    .zigzag {
      width: 137px;
      left: calc(-1 * var(--size100));
    }
    #pocket-hits-call-out-signup {
      flex-direction: column;
      form div {
        width: 100%;
      }
      form div + div {
        padding-left: 0;
      }
    }
    .captchaDisclaimer span {
      display: block;
    }
  }

  ${breakpointTinyTablet} {
    blockquote {
      margin-right: var(--spacing150);
      margin-left: 8.75rem;
    }
    aside {
      font-size: var(--fontSize150);
    }
  }

  ${breakpointLargeHandset} {
    .brandBlock {
      margin-left: -1rem;
      width: calc(100% + 2rem);
    }
    blockquote {
      font-size: var(--fontSize085);
      margin-left: var(--spacing150);
      margin-top: calc(-11rem + 1.5rem);
    }
    aside {
      padding-bottom: 11rem;
    }
    .zigzag {
      display: none;
    }
  }
`

const CallOutPocketHitsSignup = ({
  hide = false,
  handleSubmit = () => {},
  handleSubmitSuccess = () => {},
  handleEmailInputFocus = () => {},
  handleSubmitFailure = () => {},
  handleValidationError = () => {},
  onVisible = () => {},
  utmCampaign = '',
  utmSource = '',
  locale = 'en'
}) => {
  const { t } = useTranslation()

  /* Variables */
  const dispatch = useDispatch()
  const signupRequestState = useSelector((state) => state.pocketHits.signupRequestState)
  const signupError = useSelector((state) => state.pocketHits.signupError)

  const isProcessing = signupRequestState === 'pending'
  const isSuccessful = signupRequestState === 'success'

  const [activeForm, setActiveForm] = useState()

  useEffect(() => {
    // event: request success
    if (signupRequestState === 'success') {
      handleSubmitSuccess(activeForm)

      // event: request error
    } else if (signupRequestState === 'failure') {
      handleSubmitFailure(activeForm)
    }
  }, [signupRequestState, handleSubmitSuccess, handleSubmitFailure, activeForm])

  // /* Event Handlers */
  function handleEmailSubmit(formId, email, recaptchaResponseKey) {
    handleSubmit(formId)
    setActiveForm(formId)
    // track submit event here
    dispatch(sendSnowplowEvent('pocket-hits.signup', { email, locale }))
    dispatch(pocketHitsSignupRequested(email, recaptchaResponseKey, utmCampaign, utmSource))
  }

  function handleVisible() {
    onVisible(FORM_ID)
  }

  const isEnglish = ['en', 'en-US'].includes(locale)
  const shouldHide = hide || !isEnglish

  return shouldHide ? null : (
    <VisibilitySensor onVisible={handleVisible}>
      <div className={`${wrapper} brandingMessage`} data-testid="pocket-hits-module">
        <div className="brandBlock">
          <aside>{t('call-out:fuel-your-mind', 'Get ready to fuel your mind.')}</aside>
          <blockquote>
            <span className={cx('copy', isSuccessful && 'isSuccessful')}>
              <svg
                className="zigzag"
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="13"
                fill="none">
                <defs />
                <path
                  strokeMiterlimit="10"
                  strokeWidth="2"
                  d="M0 1.306c13.72 0 13.72 9.91 27.42 9.91 13.7 0 13.7-9.91 27.42-9.91 13.72 0 13.72 9.91 27.42 9.91 13.72 0 13.72-9.91 27.44-9.91s13.72 9.91 27.42 9.91c13.72 0 13.72-9.91 27.44-9.91s13.72 9.91 27.44 9.91"
                />
              </svg>
              {isSuccessful ? (
                <>
                  {t(
                    'call-out:pocket-hits-success',
                    'All set. You’ll get your first email from us tomorrow. Enjoy!'
                  )}
                </>
              ) : (
                <>
                  {t(
                    'call-out:pocket-hits-description',
                    'Get a steady stream of Pocket stories that dig deep into a subject, offer a new perspective, or make you think.'
                  )}

                  <div id="pocket-hits-call-out-signup">
                    <EmailSignupForm
                      instanceId={FORM_ID}
                      isProcessing={isProcessing}
                      buttonLabel={t('call-out:subscribe', 'Subscribe')}
                      buttonLabelProcessing={'...'}
                      inputLabel={t('call-out:email-address', 'Your email address')}
                      onFocus={handleEmailInputFocus}
                      onValidSubmit={handleEmailSubmit}
                      onValidationError={handleValidationError}
                      errorMessage={
                        signupError ? t('call-out:error', 'Oops! Something went wrong.') : null
                      }
                      displayErrorInline
                      hideCaptchaBadge
                    />
                  </div>
                  <div className="captchaDisclaimer">
                    {t('call-out:pocket-hits-description', 'This site is protected by reCAPTCHA.')}
                    <span>
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer">
                        {t('call-out:privacy', 'Privacy')}
                      </a>
                      &nbsp;·&nbsp;
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer">
                        {t('call-out:terms', 'Terms')}
                      </a>
                    </span>
                  </div>
                </>
              )}
            </span>
          </blockquote>
        </div>
      </div>
    </VisibilitySensor>
  )
}

CallOutPocketHitsSignup.propTypes = {
  /**
   * Simple bool on whether to show or hide the form
   */
  hide: PropTypes.bool,

  /**
   * Called the first time that the component becomes visible in the viewport.
   * Intended for analytics callbacks
   */
  onVisible: PropTypes.func,

  /**
   * Called when the user attempts to sign up
   * Intended for analytics callbacks
   */
  handleSubmit: PropTypes.func,

  /**
   * Called when the email submission is successful
   * Intended for analytics callbacks
   */
  handleSubmitSuccess: PropTypes.func,

  /**
   * Called when the email submission has failed
   * Intended for analytics callbacks
   */
  handleSubmitFailure: PropTypes.func,

  /**
   * Called when a user focuses on the text input.
   * Intended for analytics callbacks
   */
  handleEmailInputFocus: PropTypes.func,

  /**
   * Called when the email submits an invalid email
   * Intended for analytics callbacks
   */
  handleValidationError: PropTypes.func,

  /**
   * Paramater for the utmCampaign analytics field when submitting
   */
  utmCampaign: PropTypes.string,

  /**
   * Paramater for the utmSource analytics field when submitting
   */
  utmSource: PropTypes.string
}

export { CallOutPocketHitsSignup }
