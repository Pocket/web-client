import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { pocketHitsSignupRequested } from 'connectors/pocket-hits/pocket-hits.state'
import { ScrollChyron } from 'components/chyron/chyron-scroll'
import { PocketHitsIllustratedChyron } from './pocket-hits-illustrated-chyron'

const DEFAULT_INSTANCE_ID = 'pocket-hits-signup-chyron'

function _determineThreshold(percentage) {
  var body = document.body
  var html = document.documentElement

  // Checks each option and returns the largest one
  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )

  // returns the pixel value at 75% the entire document height
  return height * percentage
}

const ScrollPocketHitsChyron = ({
  instanceId = DEFAULT_INSTANCE_ID,
  isAuthenticated = false,
  thresholdPercent = 0.5,
  handleSubmit = () => {},
  handleSubmitSuccess = () => {},
  handleSubmitFailure = () => {},
  handleValidationError = () => {},
  handleEmailInputFocus = () => {},
  onVisible = () => {},
  handleEmailDismiss = () => {},
  signupError = false,
  utmCampaign = '',
  utmSource = ''
}) => {
  /* Variables */
  const dispatch = useDispatch()
  const signupRequestState = useSelector((state) => state.pocketHits.signupRequestState)
  const signupError = useSelector((state) => state.pocketHits.signupError)

  const isProcessing = signupRequestState === 'pending'
  const isSuccessful = signupRequestState === 'success'

  const [activeForm, setActiveForm] = useState()
  const [threshold, setThreshold] = useState()

  /* Effects */
  useEffect(() => {
    setThreshold(_determineThreshold(thresholdPercent))
  }, [thresholdPercent])

  useEffect(() => {
    // event: request success
    if (signupRequestState === 'success') {
      handleSubmitSuccess(activeForm)

      // event: request error
    } else if (signupRequestState === 'failure') {
      handleSubmitFailure(activeForm)
    }
  }, [activeForm, handleSubmitFailure, handleSubmitSuccess, signupRequestState])

  // /* Event Handlers */
  function handleEmailSubmit(formId, email, recaptchaResponseKey) {
    handleSubmit(formId)
    setActiveForm(formId)
    // track submit event here
    dispatch(pocketHitsSignupRequested(email, recaptchaResponseKey, utmCampaign, utmSource))
  }

  /*
   *  Don't render until threshold has been set
   *  This is due to a bug in the Chryon where the
   *  threshold was being cached as undefined
   */
  return threshold ? (
    <ScrollChyron instanceId={instanceId} shouldHide={isAuthenticated} threshold={threshold}>
      <PocketHitsIllustratedChyron
        isProcessing={isProcessing}
        isSuccessful={isSuccessful}
        handleEmailSubmit={handleEmailSubmit}
        handleEmailInputFocus={handleEmailInputFocus}
        onVisible={onVisible}
        handleEmailDismiss={handleEmailDismiss}
        handleValidationError={handleValidationError}
        signupError={signupError}
      />
    </ScrollChyron>
  ) : null
}

ScrollPocketHitsChyron.propTypes = {
  /**
   * An identifier, so in the case of multiple chyrons across
   * the site, the states are kept unique
   */
  instanceId: PropTypes.string,

  /**
   * Whether a user is logged in, hides if true
   */
  isAuthenticated: PropTypes.bool,

  /**
   * The decimal percentage down the page where the chyron should appear
   */
  thresholdPercent: PropTypes.number,

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
   * Called when a user dismisses the Chyron
   * Intended for analytics callbacks
   */
  handleEmailDismiss: PropTypes.func,

  /**
   * Paramater for the utmCampaign analytics field when submitting
   */
  utmCampaign: PropTypes.string,

  /**
   * Paramater for the utmSource analytics field when submitting
   */
  utmSource: PropTypes.string
}

export { ScrollPocketHitsChyron }
