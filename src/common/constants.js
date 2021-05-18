
// POCKET
export const CONSUMER_KEY = '94110-6d5ff7a89d72c869766af0e0' // web-client
// export const CONSUMER_KEY = '78809-9423d8c743a58f62b23ee85c' //web-app-draft consumer
export const BASE_URL = 'https://getpocket.com'
export const API_URL = 'https://getpocket.com'
export const OAUTH_URL = 'https://oauth-test.web.readitlater.com'
export const LOGIN_URL = 'https://getpocket.com/login'
export const SIGNUP_URL = 'https://getpocket.com/signup'
export const PREMIUM_URL = 'https://getpocket.com/premium?ep='
export const GRAPHQL_URL = 'https://getpocket.com'
export const OAUTH_REDIRECT_URL = 'https://oauth-test.web.readitlater.com/auth/authorize'
export const UNLEASH_API_URL = 'https://featureflags.readitlater.com/graphql'
export const ARTICLE_API_URL = 'https://tz7snrninbak3oh36gjshbmdia.appsync-api.us-east-1.amazonaws.com/graphql' // ARTICLE_API_KEY is a secret and needs to be stored as such
export const ARTICLE_API_KEY = 'da2-shleiiw7qzcnlkjwg3v7rfkpte' // Currently set to expire Thu, 04 Mar 2021 16:00:00 GMT
export const READING_WPM = 220
export const BATCH_SIZE = 30
export const COLOR_MODE_PREFIX = 'colormode'

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
export const SNOWPLOW_SCRIPT_URL_DEV = 'https://assets.getpocket.com/web-utilities/public/static/sp.js'
export const SNOWPLOW_SCRIPT = process.env.SHOW_DEV === 'included'
  ? SNOWPLOW_SCRIPT_URL_DEV
  : SNOWPLOW_SCRIPT_URL

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

export const TOPIC_IDS = {
  business: {
    id: 'c18b41d8-8100-4037-aa64-416994e1d4cf',
    algorithmic: 'd9c6ddfa-a58d-402d-9664-4190ba197ea6',
    curated: '505c0126-d54d-42ef-8fe7-0f6a6f24e3a5'
  },
  career: {
    id: 'ff23f296-6c5e-4f53-a46a-3feb5006f261',
    algorithmic: 'e6c8db8d-cae7-4947-a57e-872dec639472',
    curated: 'b4032752-155b-4f09-ac1e-f5337df19e88'
  },
  education: {
    id: '7bf5c80a-ffd1-436a-9dea-4f9badea463a',
    algorithmic: '8aaac382-9c27-42ab-9470-ac1dfc666262',
    curated: 'b0de37c0-81ef-4063-a432-1bb64270b039'
  },
  entertainment: {
    id: 'cd1f803f-30bd-424b-9d75-6e8d3c8e8450',
    algorithmic: 'ce96db55-f32e-48f1-929f-216eb2e8c082',
    curated: 'e9df8a81-19af-48e2-a90f-05e9a37491ca'
  },
  food: {
    id: 'c057d284-31e6-4ba0-ae09-3478f3d40ec7',
    algorithmic: '884414d5-502d-4e1a-8e70-1dc8eb4a345a',
    curated: '1a634351-361b-4115-a9d5-b79131b1f95a'
  },
  gaming: {
    id: 'b966a787-d9f2-432a-bd30-741d1ac797d1',
    algorithmic: '44dff273-3604-40e9-a0b5-bf3852581990',
    curated: '4cc738f7-25a9-4511-9cc3-68a8f9be91f8'
  },
  health: {
    id: '1abc55f1-75b1-44cb-b5bd-65c4282b158d',
    algorithmic: '494eaa68-f048-4f52-bb9a-5e7d2526f5cb',
    curated: '7cb4f497-fd05-42c5-9f78-3650e9ddba21'
  },
  parenting: {
    id: 'd273a8e2-ab17-43e8-809d-0abde4d617d7',
    algorithmic: 'e6600ffe-b65a-42d3-b570-f460f3d7326e',
    curated: '90adee1c-7794-4f41-9645-2ff9cf91113c'
  },
  'personal-finance': {
    id: '62585952-3eb8-4380-be06-266eca903cbc',
    algorithmic: '72ce0827-9dbc-470f-9722-39476daaeb0f',
    curated: '0c09627b-a409-4768-b87d-7e1d29259785'
  },
  politics: {
    id: '72c3878f-c48b-413c-aff8-90d7a0d79d32',
    algorithmic: '9901851d-ea76-4667-8dc7-0c1677ecb910',
    curated: '9bece73b-4d54-43a6-bb10-d7b02abcd181'
  },
  science: {
    id: 'c2829dc4-6a86-4c87-aa3e-f75f67ae8230',
    algorithmic: 'ab6048ca-5c61-4e87-aefd-7a612b60ab7b',
    curated: 'b64c873e-7f05-496e-8be4-bfae929c8a04'
  },
  'self-improvement': {
    id: '63f24663-0e80-4c08-82aa-3fb0e06c4979',
    algorithmic: '6d1273a5-055e-4de0-8a5b-5f2b79d37e5c',
    curated: '47688fcf-2bbb-4e0e-a02e-1f68c248a67e'
  },
  sports: {
    id: '695e39f3-62e8-4430-8d12-e8b457ac7751',
    algorithmic: '8a495385-9972-4d0e-b93e-4234f4897939',
    curated: 'ea40bef5-4406-488d-ad9d-915dfa1f0794'
  },
  technology: {
    id: 'dc010ef1-1f34-473a-a4b5-4cc155e18a4a',
    algorithmic: 'fa61096a-b681-4251-b299-2fda06c49ebf',
    curated: 'e0d7063a-9421-4148-b548-446e9fbc8566'
  },
  travel: {
    id: 'f16f670d-14f7-425d-a310-0bb8c267dba2',
    algorithmic: 'd024ce9c-ed96-453f-a81e-8a0b850681e7',
    curated: '9389d944-fdcf-4394-9ca3-4604c0af4fac'
  },
  coronavirus: {
    id: '53ace46e-fd12-4744-9647-fa633a9a044c',
    curated: '796ca16f-4cd4-4dcb-84d5-477715c41668'
  },
  home: {
    id: '2a817ad0-cbba-4330-9559-291468145588'
  },
  explore: {
    de: {
      id: '507d215c-4776-4f8e-af49-2ed6f3309aff'
    },
    en: {
      id: '9c3018a8-8aa9-4f91-81e9-ebcd95fc82da'
    }
  }
}
