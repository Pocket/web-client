
// POCKET
export const CONSUMER_KEY = '94110-6d5ff7a89d72c869766af0e0' // web-client
// export const CONSUMER_KEY = '78809-9423d8c743a58f62b23ee85c' //web-app-draft consumer
export const BASE_URL = 'https://getpocket.com'
export const API_URL = 'https://getpocket.com'
export const OAUTH_URL = 'https://oauth-test.web.readitlater.com'
export const LOGIN_URL = 'https://getpocket.com/login'
export const SIGNUP_URL = 'https://getpocket.com/signup'
export const PREMIUM_URL = 'https://getpocket.com/premium?ep='
export const OAUTH_REDIRECT_URL = 'https://oauth-test.web.readitlater.com/auth/authorize'
export const UNLEASH_API_URL = 'https://featureflags.readitlater.com/graphql'
export const ARTICLE_API_URL = 'https://tz7snrninbak3oh36gjshbmdia.appsync-api.us-east-1.amazonaws.com/graphql' // ARTICLE_API_KEY is a secret and needs to be stored as such
export const ARTICLE_API_KEY = 'da2-shleiiw7qzcnlkjwg3v7rfkpte' // Currently set to expire Thu, 04 Mar 2021 16:00:00 GMT
export const READING_WPM = 220
export const BATCH_SIZE = 30
export const COLOR_MODE_PREFIX = 'colormode'

export const HOME_TEST_START = '2021-03-22 19:30:00'
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]
export const LINE_HEIGHT = [1.2, 1.3, 1.4, 1.5, 1.65, 1.9, 2.5]
export const COLUMN_WIDTH = [531, 574, 632, 718, 826, 933, 1041]

export const CACHE_KEY_COLOR_MODE = 'pocket-color-mode'
export const CACHE_KEY_LIST_MODE = 'pocket-list-mode'
export const CACHE_KEY_SORT_ORDER = 'pocket-sort-order'
export const CACHE_KEY_RELEASE_VERSION = 'pocket-release-version'

export const CACHE_KEY_HOME_STORED_TOPICS = 'pocket-home-stored-topics'

export const RELEASE_NOTES_VERSION = 'mar-23-2021'

// THIRD PARTY
export const CAPTCHA_SITE_KEY = '6LfIpyYUAAAAAPtNSKafudr16odFL1eQte0vR0Py' // API key used with Google's ReCaptcha service
export const GOOGLE_ANALYTICS_ID = 'UA-370613-9'
export const FACEBOOK_APP_ID = '131450656879143'
export const GREENHOUSE_JOBS_URL = 'https://boards-api.greenhouse.io/v1/boards/pocketco/jobs' // Greenhouse board id for Pocket org

// SNOWPLOW
export const API_USER_ID = 89624 // Pocket backend identifier for an API user used in Snowplow analytic events
export const SNOWPLOW_SCRIPT_URL = 'https://assets.getpocket.com/web-utilities/public/static/te.js'
export const SNOWPLOW_COLLECTOR_URL = 'd.getpocket.com'
export const SNOWPLOW_COLLECTOR_URL_DEV = 'com-getpocket-prod1.mini.snplow.net'
export const SNOWPLOW_COLLECTOR = process.env.SHOW_DEV === 'included'
  ? SNOWPLOW_COLLECTOR_URL_DEV
  : SNOWPLOW_COLLECTOR_URL

export const SNOWPLOW_APP_ID = 'pocket-web'
export const SNOWPLOW_APP_ID_DEV = 'pocket-web-dev'
export const SNOWPLOW_APP = process.env.SHOW_DEV === 'included'
  ? SNOWPLOW_APP_ID_DEV
  : SNOWPLOW_APP_ID

export const SNOWPLOW_HEARTBEAT_DELAY = 10 // in seconds
export const SNOWPLOW_HEARTBEAT_INTERVAL = 10 // in seconds
export const SNOWPLOW_CONFIG = {
  appId: SNOWPLOW_APP,
  platform: 'web',
  eventMethod: 'beacon',
  respectDoNotTrack: false, // temporary to determine impact
  contexts: { webPage: true, performanceTiming: true }
}

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

export const KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  COMMA: 44,
  DELETE: 46
}

export const API_ACTION_ADD = 'add'
export const API_ACTION_ADD_FAIL = 'add_failed'
export const API_ACTION_ARCHIVE = 'archive'
export const API_ACTION_UNARCHIVE = 'readd'
export const API_ACTION_FAVORITE = 'favorite'
export const API_ACTION_UNFAVORITE = 'unfavorite'
export const API_ACTION_DELETE = 'delete'
export const API_ACTION_SCROLLED = 'scrolled'
export const API_ACTION_SHARE = 'shared_to'
export const API_ACTION_SHARE_TO = 'share_to_'
export const API_ACTION_RECOMMEND = 'share_post'
export const API_ACTION_REPLACE_TAGS = 'tags_replace'
export const API_ACTION_ADD_TAGS = 'tags_add'
export const API_ACTION_TAGS_CLEARED = 'tags_clear'
export const API_ACTION_ADD_ANNOTATION = 'add_annotation'
export const API_ACTION_DELETE_ANNOTATION = 'delete_annotation'
export const API_ACTION_SHARE_ADDED = 'share_added'
export const API_ACTION_SHARE_IGNORED = 'share_ignored'

// ANALYTICS
export const ANALYTICS_UI = 'cxt_ui'
export const ANALYTICS_VIEW = 'cxt_view'
export const ANALYTICS_INDEX = 'cxt_index'
export const ANALYTICS_LIST_MODE = 'cxt_list_view'

// LOCALIZATION BLOCKS
export const LOCALE_READER = [
  'annotations',
  'reader',
]

// Common translations
export const LOCALE_COMMON = [
  'common',
  'save-to-pocket',
  'confirm',
  'item-action',
  'messages',
  'nav',
  'release',
  'search',
  'settings',
  'share',
  'shortcuts',
  'tags',
  'whats-new',
]

// Unleash tests and the human friendly names for them
export const CURRENT_TESTS = {
  "temp.web.client.home.new_user": "home.v1"
}
