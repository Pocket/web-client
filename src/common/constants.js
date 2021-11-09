
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
export const CACHE_KEY_SORT_OPTIONS = 'pocket-sort-options'
export const CACHE_KEY_RELEASE_VERSION = 'pocket-release-version'
export const CACHE_KEY_HOME_STORED_TOPICS = 'pocket-home-stored-topics'

export const RELEASE_NOTES_VERSION = 'jun-25-2021'

// THIRD PARTY
export const CAPTCHA_SITE_KEY = '6LfIpyYUAAAAAPtNSKafudr16odFL1eQte0vR0Py' // API key used with Google's ReCaptcha service
export const GOOGLE_ANALYTICS_ID = 'UA-370613-9'
export const FACEBOOK_APP_ID = '131450656879143'
export const GREENHOUSE_JOBS_URL = 'https://boards-api.greenhouse.io/v1/boards/pocketco/jobs' // Greenhouse board id for Pocket org

// SNOWPLOW
export const API_USER_ID = 89624 // Pocket backend identifier for an API user used in Snowplow analytic events
export const SNOWPLOW_SCRIPT = 'https://assets.getpocket.com/web-utilities/public/static/te-3.1.2.js'
export const SNOWPLOW_POST_PATH = process.env.TEST_SNOWPLOW === 'included'
  ? '/com.snowplowanalytics.snowplow/tp2'
  : '/t/e'
export const SNOWPLOW_COLLECTOR_URL = 'd.getpocket.com'
export const SNOWPLOW_COLLECTOR_URL_DEV = process.env.TEST_SNOWPLOW === 'included'
  ? 'http://localhost:9090'
  : 'com-getpocket-prod1.mini.snplow.net'
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
  stateStorageStrategy: 'cookieAndLocalStorage',
  contexts: { webPage: true, performanceTiming: true },
  postPath: SNOWPLOW_POST_PATH
}
export const SNOWPLOW_ANONYMOUS_CONFIG = {
  ...SNOWPLOW_CONFIG,
  eventMethod: 'post', // over-rides eventMethod: post
  stateStorageStrategy: 'none', // over-rides stateStorageStrategy: cookieAndLocalStorage
  anonymousTracking: { withServerAnonymisation: true },
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

export const ONETRUST_EMPTY_DEFAULT = ',,'

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
export const API_ACTION_FOLLOW_USER = 'follow_user'
export const API_ACTION_UNFOLLOW_USER = 'unfollow_user'
export const API_ACTION_DELETE_RECOMMEND = 'post_delete'

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
  'discover',
  'call-out',
  'save-to-pocket',
  'confirm',
  'headers',
  'home',
  'item-action',
  'messages',
  'nav',
  'onboarding',
  'release',
  'search',
  'settings',
  'share',
  'shortcuts',
  'tags',
  'whats-new',
  'global-footer',
  'collections',
  'partner',
  'topic'
]


export const HOME_TOPIC_SLATES = {
  'business': 'af2cc2c0-1286-47a3-b8ce-187b905f94af',
  'career': '00f0c593-3c99-4d5a-9297-c66f8b00be01',
  'education': '856eb5f8-da7f-43ae-ac5e-25da402af0ae',
  'entertainment': 'cceefa28-906e-47c5-b704-8c5b824ecd1b',
  'food': '651d27ab-a898-4173-9700-dd1726fbaaa4',
  'gaming': '951ae6c3-4438-458b-9936-7f3b8ff0f178',
  'health': '47023d21-0aa6-4f98-9077-eac21fad44f1',
  'parenting': '1a8de2be-db03-4a2f-901a-7c4c1cbd156a',
  'personal-finance': 'f4b58337-4ab6-4563-9503-c384e773946f',
  'politics': 'f8c945b0-52fa-4203-bb31-6747245fe021',
  'science': 'b548b456-70c4-474d-a723-80d040d00fec',
  'self-improvement': '5674f085-07b6-43c3-bcde-2774db3f6384',
  'sports': 'e6c00454-4a00-47c1-8f22-906122c261ed',
  'technology': 'ed9604ce-b752-48bd-b8c5-3a8cf6b54ced',
  'travel': '4345efa7-2c89-4884-b836-3260757a3a97'
}

export const TOPICS_BY_NAME = {
  business: {
    'id': 'c18b41d8-8100-4037-aa64-416994e1d4cf',
    'curator_label': 'Business',
    'display_name': 'Business',
    'page_type': 'topic_page',
    'topic': 'business',
    'topic_slug': 'business',
    'is_promoted': false
  },
  career: {
    'id': 'ff23f296-6c5e-4f53-a46a-3feb5006f261',
    'curator_label': 'Career',
    'display_name': 'Career',
    'page_type': 'topic_page',
    'topic': 'career',
    'topic_slug': 'career',
    'is_promoted': false
  },
  coronavirus: {
    'id': '53ace46e-fd12-4744-9647-fa633a9a044c',
    'curator_label': 'COVID-19',
    'display_name': 'Coronavirus',
    'display_note': 'Stay informed with this curated guide to the global outbreak.  For official U.S. guidelines and health updates, visit [cdc.gov](http://www.cdc.gov).',
    'page_type': 'editorial_collection',
    'social_description': 'The latest analysis and in-depth reporting on the global COVID-19 outbreak, curated from around the web.',
    'social_image': 'https://pocket-image-cache.com//filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fpocket-spoc-images.s3.amazonaws.com%2FEditorial_Images%2FGettyImages-1212213050.jpg',
    'social_title': 'Essential Reads on the Coronavirus',
    'topic': 'coronavirus',
    'topic_slug': 'coronavirus',
    'is_promoted': true
  },
  education: {
    'id': '7bf5c80a-ffd1-436a-9dea-4f9badea463a',
    'curator_label': 'Education',
    'display_name': 'Education',
    'page_type': 'topic_page',
    'topic': 'education',
    'topic_slug': 'education',
    'is_promoted': false
  },
  entertainment: {
    'id': 'cd1f803f-30bd-424b-9d75-6e8d3c8e8450',
    'curator_label': 'Entertainment',
    'display_name': 'Entertainment',
    'page_type': 'topic_page',
    'topic': 'entertainment',
    'topic_slug': 'entertainment',
    'is_promoted': false
  },
  food: {
    'id': 'c057d284-31e6-4ba0-ae09-3478f3d40ec7',
    'curator_label': 'Food',
    'display_name': 'Food',
    'page_type': 'topic_page',
    'topic': 'food',
    'topic_slug': 'food',
    'is_promoted': false
  },
  gaming: {
    'id': 'b966a787-d9f2-432a-bd30-741d1ac797d1',
    'curator_label': 'Gaming',
    'display_name': 'Gaming',
    'page_type': 'topic_page',
    'topic': 'gaming',
    'topic_slug': 'gaming',
    'is_promoted': false
  },
  health: {
    'id': '1abc55f1-75b1-44cb-b5bd-65c4282b158d',
    'curator_label': 'Health & Fitness',
    'display_name': 'Health & Fitness',
    'page_type': 'topic_page',
    'topic': 'health',
    'topic_slug': 'health',
    'is_promoted': false
  },
  parenting: {
    'id': 'd273a8e2-ab17-43e8-809d-0abde4d617d7',
    'curator_label': 'Parenting',
    'display_name': 'Parenting',
    'page_type': 'topic_page',
    'topic': 'parenting',
    'topic_slug': 'parenting',
    'is_promoted': false
  },
  'personal-finance': {
    'id': '62585952-3eb8-4380-be06-266eca903cbc',
    'curator_label': 'Personal Finance',
    'display_name': 'Personal Finance',
    'page_type': 'topic_page',
    'topic': 'personal-finance',
    'topic_slug': 'personal-finance',
    'is_promoted': false
  },
  politics: {
    'id': '72c3878f-c48b-413c-aff8-90d7a0d79d32',
    'curator_label': 'Politics',
    'display_name': 'Politics',
    'page_type': 'topic_page',
    'topic': 'politics',
    'topic_slug': 'politics',
    'is_promoted': false
  },
  science: {
    'id': 'c2829dc4-6a86-4c87-aa3e-f75f67ae8230',
    'curator_label': 'Science',
    'display_name': 'Science',
    'page_type': 'topic_page',
    'topic': 'science',
    'topic_slug': 'science',
    'is_promoted': false
  },
  'self-improvement': {
    'id': '63f24663-0e80-4c08-82aa-3fb0e06c4979',
    'curator_label': 'Self Improvement',
    'display_name': 'Self Improvement',
    'page_type': 'topic_page',
    'topic': 'self-improvement',
    'topic_slug': 'self-improvement',
    'is_promoted': false
  },
  sports: {
    'id': '695e39f3-62e8-4430-8d12-e8b457ac7751',
    'curator_label': 'Sports',
    'display_name': 'Sports',
    'page_type': 'topic_page',
    'topic': 'sports',
    'topic_slug': 'sports',
    'is_promoted': false
  },
  technology: {
    'id': 'dc010ef1-1f34-473a-a4b5-4cc155e18a4a',
    'curator_label': 'Technology',
    'display_name': 'Technology',
    'page_type': 'topic_page',
    'topic': 'technology',
    'topic_slug': 'technology',
    'is_promoted': false
  },
  travel: {
    'id': 'f16f670d-14f7-425d-a310-0bb8c267dba2',
    'curator_label': 'Travel',
    'display_name': 'Travel',
    'page_type': 'topic_page',
    'topic': 'travel',
    'topic_slug': 'travel',
    'is_promoted': false
  }
}

export const TOPIC_IDS = {
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
