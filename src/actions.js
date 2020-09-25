// Special action fired on client side to pass state used on the server side
export { HYDRATE } from 'next-redux-wrapper'

// App settings/details
export const APP_DEV_MODE_TOGGLE = 'APP_DEV_MODE_TOGGLE'

// User info/auth
export const USER_HYDRATE = 'USER_HYDRATE'
export const USER_REQUEST = 'USER_REQUEST'
export const USER_DEV_REQUEST = 'USER_DEV_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
export const SESS_GUID_RECEIVED = 'SESS_GUID_RECEIVED'
export const SESS_GUID_HYDRATE = 'SESS_GUID_HYDRATE'

// Feature Flags
export const FEATURES_HYDRATE = 'FEATURES_HYDRATE'
export const FEATURES_TOGGLE = 'FEATURES_TOGGLE'

// Variant Flags
export const VARIANTS_DEFINE = 'VARIANTS_DEFINE'
export const VARIANTS_SAVE = 'VARIANTS_SAVE'
export const VARIANTS_UPDATE = 'VARIANTS_UPDATE'

// Snowplow
export const SNOWPLOW_TRACK_PAGE_VIEW = 'SNOWPLOW_TRACK_PAGE_VIEW'
export const SNOWPLOW_SET_GLOBAL_CONTEXTS = 'SNOWPLOW_SET_GLOBAL_CONTEXTS'
export const SNOWPLOW_TRACK_CONTENT_OPEN = 'SNOWPLOW_TRACK_CONTENT_OPEN'
export const SNOWPLOW_TRACK_IMPRESSION = 'SNOWPLOW_TRACK_IMPRESSION'

// Items
export const ITEMS_HYDRATE = 'ITEMS_HYDRATE'
export const ITEMS_SAVE_REQUEST = 'ITEMS_SAVE_REQUEST'
export const ITEMS_SAVE_SUCCESS = 'ITEMS_SAVE_SUCCESS'
export const ITEMS_SAVE_FAILURE = 'ITEMS_SAVE_FAILURE'
export const ITEMS_UNSAVE_REQUEST = 'ITEMS_UNSAVE_REQUEST'
export const ITEMS_UNSAVE_SUCCESS = 'ITEMS_UNSAVE_SUCCESS'
export const ITEMS_UNSAVE_FAILURE = 'ITEMS_UNSAVE_FAILURE'

// Explore Home
export const DISCOVER_DATA_REQUEST = 'DISCOVER_DATA_REQUEST'
export const DISCOVER_DATA_SUCCESS = 'DISCOVER_DATA_SUCCESS'
export const DISCOVER_DATA_FAILURE = 'DISCOVER_DATA_FAILURE'
export const DISCOVER_HYDRATE = 'DISCOVER_HYDRATE'
export const DISCOVER_SAVE_REQUEST = 'DISCOVER_SAVE_REQUEST'
export const DISCOVER_UNSAVE_REQUEST = 'DISCOVER_UNSAVE_REQUEST'

// Topic List
export const TOPICLIST_HYDRATE = 'TOPICLIST_HYDRATE'
export const TOPICLIST_SET_ACTIVE = 'TOPICLIST_SET_ACTIVE'

// Topic Pages
export const TOPIC_DATA_REQUEST = 'TOPIC_DATA_REQUEST'
export const TOPIC_DATA_SUCCESS = 'TOPIC_DATA_SUCCESS'
export const TOPIC_DATA_FAILURE = 'TOPIC_DATA_FAILURE'
export const TOPIC_HYDRATE = 'TOPIC_HYDRATE'
export const TOPIC_SAVE_REQUEST = 'TOPIC_SAVE_REQUEST'
export const TOPIC_UNSAVE_REQUEST = 'TOPIC_UNSAVE_REQUEST'

// Pocket Hits
export const POCKET_HITS_SIGNUP_REQUESTED = 'POCKET_HITS_SIGNUP_REQUESTED'
export const POCKET_HITS_SIGNUP_REQUEST_SUCCEEDED = 'POCKET_HITS_SIGNUP_REQUEST_SUCCEEDED'
export const POCKET_HITS_SIGNUP_REQUEST_FAILED ='POCKET_HITS_SIGNUP_REQUEST_FAILED'

// Syndicated Article
export const ARTICLE_HYDRATE = 'ARTICLE_HYDRATE'
export const ARTICLE_SAVE_REQUEST = 'ARTICLE_SAVE_REQUEST'
export const ARTICLE_SAVE_SUCCESS = 'ARTICLE_SAVE_SUCCESS'
export const ARTICLE_SAVE_FAILURE = 'ARTICLE_SAVE_FAILURE'
export const ARTICLE_UNSAVE_REQUEST = 'ARTICLE_UNSAVE_REQUEST'
export const ARTICLE_UNSAVE_SUCCESS = 'ARTICLE_UNSAVE_SUCCESS'
export const ARTICLE_UNSAVE_FAILURE = 'ARTICLE_UNSAVE_FAILURE'

// Publisher Recs
export const PUBLISHER_RECS_REQUESTED = 'PUBLISHER_RECS_REQUESTED'
export const PUBLISHER_RECS_SUCCESS = 'PUBLISHER_RECS_SUCCESS'
export const PUBLISHER_RECS_FAILURE = 'PUBLISHER_RECS_FAILURE'

// Pocket Recs
export const POCKET_RECS_REQUESTED = 'POCKET_RECS_REQUESTED'
export const POCKET_RECS_SUCCESS = 'POCKET_RECS_SUCCESS'
export const POCKET_RECS_FAILURE = 'POCKET_RECS_FAILURE'

