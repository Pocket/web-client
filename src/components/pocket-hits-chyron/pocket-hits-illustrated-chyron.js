import PropTypes from 'prop-types'
import { css } from '@emotion/css'
import { CrossIcon } from 'components/icons/CrossIcon'
import { breakpointSmallHandset, breakpointMediumTablet } from 'common/constants'
import EmailSignupForm from 'components/email-signup-form/email-signup-form'
import VisibilitySensor from 'components/visibility-sensor/visibility-sensor'
import BorderSVG from 'static/images/pocket-hits-chyron/border.svg'
import Green from 'static/images/pocket-hits-chyron/envelope-green.svg'
import Red from 'static/images/pocket-hits-chyron/envelope-red.svg'

const Border = BorderSVG.src || ''
const EnvelopeGreen = Green.src || ''
const EnvelopeRed = Red.src || ''

const DEFAULT_ERROR = 'Oops! Something went wrong.'
const FORM_ID = 'syndicated-article-illustrated-chyron'

const ctaContainer = css`
  margin-top: 40px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  background: var(--color-canvas);
  background-image: url(${Border});
  background-size: 1735px 8px;
  background-repeat: repeat-x;
  background-position: top center;
`

const ctaBox = css`
  padding: var(--spacing100) var(--spacing100) var(--spacing100);
  max-width: 930px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;

  #pocket-hits-illustrated-chyron form {
    position: relative;
    z-index: 1;

    ${breakpointMediumTablet} {
      div + div {
        flex-grow: 0;
      }
    }

    &:before {
      display: none;
      position: absolute;
      height: 186px;
      width: 169px;
      content: '';
      background-image: url(${EnvelopeGreen});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      top: -135px;
      right: -22px;
      z-index: -1;
      pointer-events: none;
      ${breakpointSmallHandset} {
        display: block;
      }
    }

    input {
      min-width: 220px;
      background: var(--color-canvas);
    }
    button {
      display: block;
      position: relative;
      max-width: 6.5rem;
      color: #fff;

      ${breakpointSmallHandset} {
        margin: 0 auto;
        width: 180px;
        max-width: unset;
      }

      &[disabled] {
        padding: var(--spacing075) var(--spacing250);
      }
      &:before {
        display: none;
        position: absolute;
        height: 196px;
        width: 178px;
        content: '';
        background-image: url(${EnvelopeGreen});
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        top: -135px;
        left: -40px;
        z-index: -1;
        pointer-events: none;
        ${breakpointMediumTablet} {
          display: block;
        }
        ${breakpointSmallHandset} {
          display: none;
        }
      }
    }
  }
`

const closeIcon = css`
  cursor: pointer;
  position: absolute;
  pointer-events: auto;
  top: var(--spacing075);
  right: var(--spacing075);

  svg {
    fill: #a6a6a6; /* TODO: replace with var(--color-grey65) when available in web-ui */
    height: var(--size100);
    width: var(--size100);
  }
  &:hover path {
    fill: #ccc; /* TODO: replace with var(--color-grey80) when available in web-ui */
  }
  &:active path {
    fill: #a6a6a6; /* TODO: replace with var(--color-grey65) when available in web-ui */
  }
`

const illustration = css`
  width: 178px;
  height: 196px;
  background-image: url(${EnvelopeRed});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  margin: -55px 0 0 0;

  ${breakpointMediumTablet} {
    display: none;
  }
`

const promoBlurbWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin: 0;
    max-width: unset;

    ${breakpointMediumTablet} {
      margin: 2em 0;
    }
  }
`

const promoBlurb = css`
  font-family: var(--fontSerifAlt);
  font-size: var(--fontSize125);
  font-weight: 400;
  line-height: 150%;
  margin: var(--spacing075) var(--spacing100) 0.625rem 0;
  text-align: left;

  ${breakpointMediumTablet} {
    max-width: calc(100% - 120px);
    margin-bottom: var(--spacing050);
  }

  span {
    display: inline;
    white-space: nowrap;
    ${breakpointSmallHandset} {
      white-space: normal;
    }
  }
`

const captchaDisclaimer = css`
  font-size: var(--fontSize085);
  font-family: var(--fontSansSerif);
  line-height: 143%;
  margin: -10px 0 0;
  text-align: left;

  ${breakpointSmallHandset} {
    text-align: center;
    margin: var(--spacing075) auto 0;

    span {
      display: block;
    }
  }
`

const PocketHitsIllustratedChyron = ({
  isProcessing = false,
  isSuccessful = false,
  handleEmailSubmit = () => {},
  handleEmailInputFocus = () => {},
  handleValidationError = () => {},
  onVisible = () => {},
  handleEmailDismiss = () => {},
  signupError = false,
  dismissChyron,
  completeChyron
}) => {
  function onValidEmailSubmit(...args) {
    completeChyron()
    handleEmailSubmit(...args)
  }

  function onDismiss() {
    handleEmailDismiss(FORM_ID)
    dismissChyron()
  }

  function handleVisible() {
    onVisible(FORM_ID)
  }

  return (
    <VisibilitySensor onVisible={handleVisible}>
      <aside className={ctaContainer}>
        <div className={closeIcon} onClick={onDismiss}>
          <CrossIcon />
        </div>
        <div className={ctaBox}>
          <figure className={illustration} />
          {isSuccessful ? (
            <div className={promoBlurbWrapper}>
              <h3 className={promoBlurb} data-testid="pocket-hits-chyron-success">
                All set. You’ll get your first email from us tomorrow.&nbsp;Enjoy!
              </h3>
            </div>
          ) : (
            <div>
              <section data-testid="pocket-hits-chyron">
                <h3 className={promoBlurb}>
                  Get fascinating stories daily with <span>Pocket’s newsletter</span>.
                </h3>
                <div id="pocket-hits-illustrated-chyron">
                  <EmailSignupForm
                    instanceId={FORM_ID}
                    isProcessing={isProcessing}
                    buttonLabelProcessing={'...'}
                    onFocus={handleEmailInputFocus}
                    onValidSubmit={onValidEmailSubmit}
                    onValidationError={handleValidationError}
                    errorMessage={signupError ? DEFAULT_ERROR : null}
                    displayErrorInline
                    buttonVariant="emphasized"
                    hideCaptchaBadge
                  />
                </div>
              </section>
              <div className={captchaDisclaimer}>
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
            </div>
          )}
        </div>
      </aside>
    </VisibilitySensor>
  )
}

PocketHitsIllustratedChyron.propTypes = {
  /**
   * Set to true to apply a loading state where the form will be disabled.
   */
  isProcessing: PropTypes.bool,

  /**
   * Set to true to display success header
   */
  isSuccessful: PropTypes.bool,

  /**
   * Called when the user has submitted a valid email and successfully passed the
   * Recaptcha. The recaptcha response key is provided so that it can be passed
   * to the backend endpoint validating this form submission.
   */
  handleEmailSubmit: PropTypes.func,

  /**
   * Called when a user focuses on the text input.
   * Intended for analytics callbacks
   */
  handleEmailInputFocus: PropTypes.func,

  /**
   * Called when the user submits a value that fails email validation.
   */
  handleValidationError: PropTypes.func,

  /**
   * Called the first time that the component becomes visible in the viewport.
   * Intended for analytics callbacks
   */
  onVisible: PropTypes.func,

  /**
   * Called when a user dismisses the Chyron
   * Intended for analytics callbacks
   */
  handleEmailDismiss: PropTypes.func,

  /**
   * Set to true to display error message on the form
   */
  signupError: PropTypes.bool
}
export { PocketHitsIllustratedChyron }
