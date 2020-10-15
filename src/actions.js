// Special action fired on client side to pass state used on the server side
export { HYDRATE } from 'next-redux-wrapper'

// App settings/details
export const APP_DEV_MODE_TOGGLE = 'APP_DEV_MODE_TOGGLE'
export const APP_SET_BASE_URL = 'APP_SET_BASE_URL'

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

// Home Items
export const HOME_DATA_LATEST_REQUEST = 'HOME_DATA_LATEST_REQUEST'
export const HOME_DATA_LATEST_SUCCESS = 'HOME_DATA_LATEST_SUCCESS'
export const HOME_DATA_LATEST_FAILURE = 'HOME_DATA_LATEST_FAILURE'

export const HOME_DATA_DISCOVER_REQUEST = 'HOME_DATA_DISCOVER_REQUEST'
export const HOME_DATA_DISCOVER_SUCCESS = 'HOME_DATA_DISCOVER_SUCCESS'
export const HOME_DATA_DISCOVER_FAILURE = 'HOME_DATA_DISCOVER_FAILURE'


export const HOME_HYDRATE = 'HOME_HYDRATE'
export const HOME_SAVE_REQUEST = 'HOME_SAVE_REQUEST'
export const HOME_UNSAVE_REQUEST = 'HOME_UNSAVE_REQUEST'

// Discover Items
export const DISCOVER_ITEMS_HYDRATE = 'DISCOVER_ITEMS_HYDRATE'
export const DISCOVER_ITEMS_SAVE_REQUEST = 'DISCOVER_ITEMS_SAVE_REQUEST'
export const DISCOVER_ITEMS_SAVE_SUCCESS = 'DISCOVER_ITEMS_SAVE_SUCCESS'
export const DISCOVER_ITEMS_SAVE_FAILURE = 'DISCOVER_ITEMS_SAVE_FAILURE'
export const DISCOVER_ITEMS_UNSAVE_REQUEST = 'DISCOVER_ITEMS_UNSAVE_REQUEST'
export const DISCOVER_ITEMS_UNSAVE_SUCCESS = 'DISCOVER_ITEMS_UNSAVE_SUCCESS'
export const DISCOVER_ITEMS_UNSAVE_FAILURE = 'DISCOVER_ITEMS_UNSAVE_FAILURE'

// Explore Home
export const DISCOVER_DATA_REQUEST = 'DISCOVER_DATA_REQUEST'
export const DISCOVER_DATA_SUCCESS = 'DISCOVER_DATA_SUCCESS'
export const DISCOVER_DATA_FAILURE = 'DISCOVER_DATA_FAILURE'
export const DISCOVER_HYDRATE = 'DISCOVER_HYDRATE'
export const DISCOVER_SAVE_REQUEST = 'DISCOVER_SAVE_REQUEST'
export const DISCOVER_UNSAVE_REQUEST = 'DISCOVER_UNSAVE_REQUEST'

// Topic List
export const TOPICLIST_REQUEST = 'TOPICLIST_REQUEST'
export const TOPICLIST_SUCCESS = 'TOPICLIST_SUCCESS'
export const TOPICLIST_FAILURE = 'TOPICLIST_FAILURE'
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

// My List
export const MYLIST_DATA_REQUEST = 'MYLIST_DATA_REQUEST'
export const MYLIST_DATA_SUCCESS = 'MYLIST_DATA_SUCCESS'
export const MYLIST_DATA_FAILURE = 'MYLIST_DATA_FAILURE'
export const MYLIST_HYDRATE = 'MYLIST_HYDRATE'
export const MYLIST_SAVE_REQUEST = 'MYLIST_SAVE_REQUEST'
export const MYLIST_UNSAVE_REQUEST = 'MYLIST_UNSAVE_REQUEST'


// My List Items
export const MYLIST_ITEMS_HYDRATE = 'MYLIST_ITEMS_HYDRATE'

export const ITEMS_ADD_REQUEST = 'ITEMS_ADD_REQUEST'
export const ITEMS_ADD_SUCCESS = 'ITEMS_ADD_SUCCESS'
export const ITEMS_ADD_FAILURE = 'ITEMS_ADD_FAILURE'

export const ITEMS_DELETE_REQUEST = 'ITEMS_DELETE_REQUEST'
export const ITEMS_DELETE_SUCCESS = 'ITEMS_DELETE_SUCCESS'
export const ITEMS_DELETE_FAILURE = 'ITEMS_DELETE_FAILURE'

export const ITEMS_FAVORITE_REQUEST = 'ITEMS_FAVORITE_REQUEST'
export const ITEMS_FAVORITE_SUCCESS = 'ITEMS_FAVORITE_SUCCESS'
export const ITEMS_FAVORITE_FAILURE = 'ITEMS_FAVORITE_FAILURE'

export const ITEMS_UNFAVORITE_REQUEST = 'ITEMS_UNFAVORITE_REQUEST'
export const ITEMS_UNFAVORITE_SUCCESS = 'ITEMS_UNFAVORITE_SUCCESS'
export const ITEMS_UNFAVORITE_FAILURE = 'ITEMS_UNFAVORITE_FAILURE'

export const ITEMS_ARCHIVE_REQUEST = 'ITEMS_ARCHIVE_REQUEST'
export const ITEMS_ARCHIVE_SUCCESS = 'ITEMS_ARCHIVE_SUCCESS'
export const ITEMS_ARCHIVE_FAILURE = 'ITEMS_ARCHIVE_FAILURE'

export const ITEMS_UNARCHIVE_REQUEST = 'ITEMS_UNARCHIVE_REQUEST'
export const ITEMS_UNARCHIVE_SUCCESS = 'ITEMS_UNARCHIVE_SUCCESS'
export const ITEMS_UNARCHIVE_FAILURE = 'ITEMS_UNARCHIVE_FAILURE'

export const ITEMS_UNSAVE_REQUEST = 'ITEMS_UNSAVE_REQUEST'
export const ITEMS_UNSAVE_SUCCESS = 'ITEMS_UNSAVE_SUCCESS'
export const ITEMS_UNSAVE_FAILURE = 'ITEMS_UNSAVE_FAILURE'

export const ITEMS_TAG_REQUEST = 'ITEMS_TAG_REQUEST'
export const ITEMS_TAG_SUCCESS = 'ITEMS_TAG_SUCCESS'
export const ITEMS_TAG_FAILURE = 'ITEMS_TAG_FAILURE'

export const TOAST_ITEM_NOT_IN_LIST = 'TOAST_ITEM_NOT_IN_LIST'

// Reader
export const READER_HYDRATE = 'READER_HYDRATE'
export const ARTICLE_ITEM_REQUESTED = 'ARTICLE_ITEM_REQUESTED'
export const ARTICLE_ITEM_SUCCESS = 'ARTICLE_ITEM_SUCCESS'
export const ARTICLE_ITEM_FAILURE = 'ARTICLE_ITEM_FAILURE'
// export const ARTICLE_CONTENT_REQUESTED = 'ARTICLE_CONTENT_REQUESTED'
export const ARTICLE_CONTENT_SUCCESS = 'ARTICLE_CONTENT_SUCCESS'
export const ARTICLE_CONTENT_FAILURE = 'ARTICLE_CONTENT_FAILURE'
export const SUGGESTED_TAGS_REQUEST = 'SUGGESTED_TAGS_REQUEST'
export const SUGGESTED_TAGS_SUCCESS = 'SUGGESTED_TAGS_SUCCESS'
export const SUGGESTED_TAGS_FAILURE = 'SUGGESTED_TAGS_FAILURE'
export const ANNOTATION_SAVE_REQUEST = 'ANNOTATION_SAVE_REQUEST'
export const ANNOTATION_SAVE_SUCCESS = 'ANNOTATION_SAVE_SUCCESS'
export const ANNOTATION_SAVE_FAILURE = 'ANNOTATION_SAVE_FAILURE'
export const UPDATE_LINE_HEIGHT = 'UPDATE_LINE_HEIGHT'
export const UPDATE_COLUMN_WIDTH = 'UPDATE_COLUMN_WIDTH'
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE'
export const UPDATE_FONT_TYPE = 'UPDATE_FONT_TYPE'
