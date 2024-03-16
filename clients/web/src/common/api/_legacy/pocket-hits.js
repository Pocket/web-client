import { request } from 'common/utilities/request/request'

/**
 * API functions for Pocket Hits newsletter (signup, preferences)
 */

/**
 * Register a user's email to receive the Pocket Hits newsletter
 * @param {String} email  user's email
 * @param {String} captchaResponseKey   key string returned from reCaptcha result
 * @param {String} utmCampaign   Analytics campaign value to track marketing initiatives/source
 * @param {String} utmSource  Analytics source value to track marketing initiatives/source
 * @param {String} [locale=en-US]  Locale for subscriber (ex. en-US or de-DE)
 * @param {Boolean} [marketingOptIn=true] User opted into marketing emails (currently only applies to locale de-DE)
 * @param {[String]} frequency  Frequency of receiving PH emails (defaults to daily)
 */
export const pocketHitsSignup = (
  email,
  captchaResponseKey,
  utmCampaign,
  utmSource,
  locale = 'en-US',
  marketingOptIn = true,
  frequency = 'daily'
) => {
  return request({
    path: 'v3/newsletter/subscription',
    method: 'POST',
    body: JSON.stringify({
      email,
      'g-captcha-response': captchaResponseKey,
      utm_campaign: utmCampaign,
      utm_source: utmSource,
      locale,
      marketing_opt_in: marketingOptIn,
      frequency
    })
  })
}

export const confirmSubscription = (subscriptionId, locale) => {
  return request({
    path: `v3/newsletter/subscription/opt-in/${subscriptionId}`,
    data: {
      locale
    }
  })
}
