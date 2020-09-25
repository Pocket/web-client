// Component last used on 7/14/20 -- there is a plan to reuse it, delete if stale
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { pocketHitsSignupRequested } from 'connectors/pocket-hits/pocket-hits.state'
import { css } from 'linaria'
import { breakpointLargeHandset, breakpointMediumHandset } from '@pocket/web-ui'
import EmailSignupForm from 'components/email-signup-form/email-signup-form'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import { testIdAttribute } from '@pocket/web-utilities/test-utils'
import TreasureChest from 'static/images/treasure-chest.jpg'

const DEFAULT_ERROR = 'Oops! Something went wrong.'
const FORM_ID = 'syndicated-article-inline-signup'

const InlineSignupContainer = css`
  margin-top: var(--spacing250);

  h3 {
    font-size: var(--fontSize150);
    font-family: var(--fontSerifAlt);
    font-weight: 500;
    line-height: 122%;
    margin-top: var(--spacing050);
    margin-bottom: 0.625rem;

    ${breakpointMediumHandset} {
      font-size: var(--fontSize125);
    }
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${breakpointLargeHandset} {
      flex-direction: column;
    }

    .vertical-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .success {
      text-align: left;
      ${breakpointLargeHandset} {
        text-align: center;
      }
    }
  }

  #pocket-hits-inline-signup {
    form {
      div + div {
        padding-left: var(--spacing050);
        width: auto;

        ${breakpointLargeHandset} {
          padding-left: 0;
          width: 100%;
        }
      }

      input {
        background: var(--color-canvas);
      }
      button {
        display: block;
        position: relative;
        color: #fff;

        &[disabled] {
          padding: var(--spacing075) var(--spacing250);
        }
      }
    }
  }
`

const illustration = css`
  margin: 0 var(--spacing100) 0 0;
  min-width: 172px;
  height: 138px;
  background-image: url(${TreasureChest});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  box-sizing: border-box;

  ${breakpointLargeHandset} {
    margin: 0 auto;
    min-width: 225px;
    height: 180px;
  }
`

const captchaDisclaimer = css`
  font-size: var(--fontSize085);
  font-family: var(--fontSansSerif);
  color: var(--color-textSecondary);
  text-align: center;
  line-height: 143%;
  width: 100%;

  ${breakpointLargeHandset} {
    margin: var(--spacing075) auto 0;
  }
  ${breakpointMediumHandset} {
    span {
      display: block;
    }
  }
`

const PocketHitsInlineSignup = ({
  handleSubmit,
  handleSubmitSuccess,
  handleSubmitFailure,
  handleValidationError,
  handleEmailInputFocus,
  onVisible,
  handleEmailDismiss,
  utmCampaign,
  utmSource
}) => {
  /* Variables */
  const dispatch = useDispatch()
  const signupRequestState = useSelector(
    (state) => state.pocketHits.signupRequestState
  )
  const signupError = useSelector((state) => state.pocketHits.signupError)

  const isProcessing = signupRequestState === 'pending'
  const isSuccessful = signupRequestState === 'success'

  const [activeForm, setActiveForm] = useState()

  /* Effects */
  useEffect(() => {
    // event: request success
    if (signupRequestState === 'success') {
      handleSubmitSuccess(activeForm)

      // event: request error
    } else if (signupRequestState === 'failure') {
      handleSubmitFailure(activeForm)
    }
  }, [signupRequestState])

  /* Event Handlers */
  function handleEmailSubmit(formId, email, recaptchaResponseKey) {
    handleSubmit(formId)
    setActiveForm(formId)
    // track submit event here
    dispatch(
      pocketHitsSignupRequested(
        email,
        recaptchaResponseKey,
        utmCampaign,
        utmSource
      )
    )
  }

  function onDismiss() {
    handleEmailDismiss(FORM_ID)
  }

  function handleVisible() {
    onVisible(FORM_ID)
  }

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <aside className={InlineSignupContainer}>
        <section>
          <figure className={illustration} />
          {isSuccessful ? (
            <div className="success vertical-center">
              <h3 {...testIdAttribute('pocket-hits-inline-success')}>
                All set. You’ll get your first email from us
                tomorrow.&nbsp;Enjoy!
              </h3>
            </div>
          ) : (
            <div {...testIdAttribute('pocket-hits-inline')}>
              <h3>
                Get fascinating stories daily with{' '}
                <span>Pocket’s newsletter</span>.
              </h3>
              <div id="pocket-hits-inline-signup">
                <EmailSignupForm
                  instanceId={FORM_ID}
                  isProcessing={isProcessing}
                  buttonLabelProcessing={'...'}
                  onFocus={handleEmailInputFocus}
                  onValidSubmit={handleEmailSubmit}
                  onValidationError={handleValidationError}
                  errorMessage={signupError ? DEFAULT_ERROR : null}
                  displayErrorInline
                  buttonVariant="emphasized"
                  buttonSize="large"
                  hideCaptchaBadge
                  {...testIdAttribute('inline-form')}
                />
              </div>
            </div>
          )}
        </section>
        {!isSuccessful ? (
          <div
            className={captchaDisclaimer}
            {...testIdAttribute('pocket-hits-inline-captcha')}>
            This site is protected by reCAPTCHA.&nbsp;
            <span>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer">
                Privacy
              </a>
              &nbsp;·&nbsp;
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer">
                Terms
              </a>
            </span>
          </div>
        ) : null}
      </aside>
    </VisibilitySensor>
  )
}

PocketHitsInlineSignup.propTypes = {
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
   * Called when the user submits an invalid email
   * Intended for analytics callbacks
   */
  handleValidationError: PropTypes.func,

  /**
   * Called when a user focuses on the text input.
   * Intended for analytics callbacks
   */
  handleEmailInputFocus: PropTypes.func,

  /**
   * Called the first time that the component becomes visible in the viewport.
   * Intended for analytics callbacks
   */
  onVisible: PropTypes.func,

  /**
   * Paramater for the utmCampaign analytics field when submitting
   */
  utmCampaign: PropTypes.string,

  /**
   * Paramater for the utmSource analytics field when submitting
   */
  utmSource: PropTypes.string
}

PocketHitsInlineSignup.defaultProps = {
  handleSubmit() {},
  handleSubmitSuccess() {},
  handleSubmitFailure() {},
  handleValidationError() {},
  handleEmailInputFocus() {},
  onVisible() {},
  utmCampaign: '',
  utmSource: ''
}

export { PocketHitsInlineSignup }
