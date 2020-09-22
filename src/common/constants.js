// consumer key used in requests to the API
export const CONSUMER_KEY = '89624-08a6833ec06c1379f4cee8e3' //web-discover consumer key

// Pocket backend identifier for an API user used in Snowplow analytic events
export const API_USER_ID = 89624

export const BASE_URL = 'https://getpocket.com'
export const API_URL = 'https://getpocket.com'
export const LOGIN_URL = 'https://getpocket.com/login'
export const SIGNUP_URL = 'https://getpocket.com/signup'

export const READING_WPM = 220

// API key used with Google's ReCaptcha service
export const CAPTCHA_SITE_KEY = '6LfIpyYUAAAAAPtNSKafudr16odFL1eQte0vR0Py'

export const GOOGLE_ANALYTICS_ID = 'UA-370613-9'

export const SNOWPLOW_COLLECTOR_URL = 'd.getpocket.com'
export const SNOWPLOW_COLLECTOR_URL_DEV = 'com-getpocket-prod1.mini.snplow.net'
export const SNOWPLOW_COLLECTOR =
  process.env.SHOW_DEV === 'included'
    ? SNOWPLOW_COLLECTOR_URL_DEV
    : SNOWPLOW_COLLECTOR_URL

export const SNOWPLOW_APP_ID = 'pocket-web'
export const SNOWPLOW_APP_ID_DEV = 'pocket-web-dev'
// in seconds
export const SNOWPLOW_HEARTBEAT_DELAY = 10
export const SNOWPLOW_HEARTBEAT_INTERVAL = 10
export const SNOWPLOW_CONFIG = {
  appId:
    process.env.SHOW_DEV === 'included' ? SNOWPLOW_APP_ID_DEV : SNOWPLOW_APP_ID,
  platform: 'web',
  eventMethod: 'beacon',
  respectDoNotTrack: true,
  contexts: {
    webPage: true,
    performanceTiming: true
  }
}

export const FACEBOOK_APP_ID = '131450656879143'

// ARTICLE_API_KEY is a secret and needs to be stored as such
export const ARTICLE_API_URL =
  'https://tz7snrninbak3oh36gjshbmdia.appsync-api.us-east-1.amazonaws.com/graphql'
// Currently set to expire Thu, 04 Mar 2021 16:00:00 GMT
export const ARTICLE_API_KEY = 'da2-shleiiw7qzcnlkjwg3v7rfkpte'

export const UNLEASH_API_URL = 'https://featureflags.readitlater.com/graphql'

// Currently used in common/utilities/snowplow.js to help determine whether a given
// link is from a Pocket property or not
export const INTERNAL_DOMAINS = [
  // Pocket Main Property
  'getpocket.com',
  'www.getpocket.com',
  'pocket.com',
  'www.pocket.com',
  // Pocket Core Web
  'app.getpocket.com',
  'app.pocket.com',
  // Pocket Blog
  'blog.getpocket.com',
  'blog.pocket.com'
]
