// Special action fired on client side to pass state used on the server side
export { HYDRATE } from 'next-redux-wrapper'

// App settings/details
export const APP_DEV_MODE_TOGGLE = 'APP_DEV_MODE_TOGGLE'
export const APP_SET_BASE_URL = 'APP_SET_BASE_URL'
export const APP_SET_MODE = 'APP_SET_MODE'
export const APP_SET_SECTION = 'APP_SET_SECTION'
export const APP_LIST_MODE_TOGGLE = 'APP_LIST_MODE_TOGGLE'
export const APP_LIST_MODE_SET = 'APP_LIST_MODE_SET'
export const APP_SORT_ORDER_TOGGLE = 'APP_SORT_ORDER_TOGGLE'

// User info/auth
export const USER_HYDRATE = 'USER_HYDRATE'
export const USER_REQUEST = 'USER_REQUEST'
export const USER_DEV_REQUEST = 'USER_DEV_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
export const SESS_GUID_RECEIVED = 'SESS_GUID_RECEIVED'
export const SESS_GUID_HYDRATE = 'SESS_GUID_HYDRATE'

export const USER_OAUTH_TOKEN_REQUEST = 'USER_OAUTH_TOKEN_REQUEST'

export const USER_TAGS_GET_REQUEST = 'USER_TAGS_REQUEST'
export const USER_TAGS_GET_SUCCESS = 'USER_TAGS_SUCCESS'
export const USER_TAGS_GET_FAILURE = 'USER_TAGS_FAILURE'
export const USER_TAGS_ITEM_SUCCESS = 'USER_TAGS_ITEM_SUCCESS'

export const USER_TAGS_EDIT = 'USER_TAGS_EDIT'
export const USER_TAGS_EDIT_CONFIRM = 'USER_TAGS_EDIT_CONFIRM'
export const USER_TAGS_EDIT_CANCEL = 'USER_TAGS_EDIT_CANCEL'

export const USER_TAGS_DELETE = 'USER_TAGS_DELETE'
export const USER_TAGS_DELETE_CONFIRM = 'USER_TAGS_DELETE_CONFIRM'
export const USER_TAGS_DELETE_CANCEL = 'USER_TAGS_DELETE_CANCEL'

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

// Generic Recs
export const GENERIC_RECS_REQUESTED = 'GENERIC_RECS_REQUESTED'
export const GENERIC_RECS_SUCCESS = 'GENERIC_RECS_SUCCESS'
export const GENERIC_RECS_FAILURE = 'GENERIC_RECS_FAILURE'

// My List
export const MYLIST_DATA_REQUEST = 'MYLIST_DATA_REQUEST'
export const MYLIST_DATA_SUCCESS = 'MYLIST_DATA_SUCCESS'
export const MYLIST_DATA_FAILURE = 'MYLIST_DATA_FAILURE'
export const MYLIST_HYDRATE = 'MYLIST_HYDRATE'
export const MYLIST_SAVE_REQUEST = 'MYLIST_SAVE_REQUEST'
export const MYLIST_UNSAVE_REQUEST = 'MYLIST_UNSAVE_REQUEST'
export const MYLIST_UPDATE_REQUEST = 'MYLIST_UPDATE_REQUEST'
export const MYLIST_UPDATE_SUCCESS = 'MYLIST_UPDATE_SUCCESS'
export const MYLIST_UPDATE_FAILURE = 'MYLIST_UPDATE_FAILURE'

// My List Items
export const MYLIST_ITEMS_HYDRATE = 'MYLIST_ITEMS_HYDRATE'

export const ITEMS_ADD_REQUEST = 'ITEMS_ADD_REQUEST'
export const ITEMS_ADD_SUCCESS = 'ITEMS_ADD_SUCCESS'
export const ITEMS_ADD_FAILURE = 'ITEMS_ADD_FAILURE'

export const ITEMS_DELETE_REQUEST = 'ITEMS_DELETE_REQUEST'
export const ITEMS_DELETE_CONFIRM = 'ITEMS_DELETE_CONFIRM'
export const ITEMS_DELETE_CANCEL = 'ITEMS_DELETE_CANCEL'
export const ITEMS_DELETE_SEND = 'ITEMS_DELETE_SEND'
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
export const ITEMS_TAG_EDIT = 'ITEMS_TAG_EDIT'
export const ITEMS_TAG_CONFIRM = 'ITEMS_TAG_CONFIRM'
export const ITEMS_TAG_SEND = 'ITEMS_TAG_SEND'
export const ITEMS_TAG_CANCEL = 'ITEMS_TAG_CANCEL'
export const ITEMS_TAG_SUCCESS = 'ITEMS_TAG_SUCCESS'
export const ITEMS_TAG_FAILURE = 'ITEMS_TAG_FAILURE'
export const ITEMS_TAG_ADD_TAG = 'ITEMS_TAG_ADD_TAG'
export const ITEMS_TAG_REMOVE_TAG = 'ITEMS_TAG_REMOVE_TAG'
export const ITEMS_TAG_SUGGEST_REQUEST = 'ITEMS_TAG_SUGGEST_REQUEST'
export const ITEMS_TAG_SUGGEST_SUCCESS = 'ITEMS_TAG_SUGGEST_SUCCESS'
export const ITEMS_TAG_SUGGEST_FAILURE = 'ITEMS_TAG_SUGGEST_FAILURE'

export const ITEMS_SHARE_REQUEST = 'ITEMS_SHARE_REQUEST'
export const ITEMS_SHARE_COMPOSE = 'ITEMS_SHARE_COMPOSE'
export const ITEMS_SHARE_CANCEL = 'ITEMS_SHARE_CANCEL'
export const ITEMS_SHARE_SUCCESS = 'ITEMS_SHARE_SUCCESS'
export const ITEMS_SHARE_FAILURE = 'ITEMS_SHARE_FAILURE'
export const ITEMS_RECOMMEND_CONFIRM = 'ITEMS_RECOMMEND_CONFIRM'
export const ITEMS_SEND_TO_FRIEND_CONFIRM = 'ITEMS_SEND_TO_FRIEND_CONFIRM'
export const ITEMS_SEND_TO_FRIEND_ADD = 'ITEMS_SEND_TO_FRIEND_ADD'
export const ITEMS_SEND_TO_FRIEND_REMOVE = 'ITEMS_SEND_TO_FRIEND_REMOVE'

export const ITEMS_BULK_SELECT = 'ITEMS_BULK_SELECT'
export const ITEMS_BULK_DESELECT = 'ITEMS_BULK_DESELECT'
export const ITEMS_BULK_ADD = 'ITEMS_BULK_ADD'
export const ITEMS_BULK_REMOVE = 'ITEMS_BULK_REMOVE'
export const ITEMS_BULK_CLEAR = 'ITEMS_BULK_CLEAR'

export const ITEMS_BULK_TAG = 'ITEMS_BULK_TAG'
export const ITEMS_BULK_FAVORITE = 'ITEMS_BULK_FAVORITE'
export const ITEMS_BULK_ARCHIVE = 'ITEMS_BULK_ARCHIVE'
export const ITEMS_BULK_DELETE = 'ITEMS_BULK_DELETE'

export const TOAST_ITEM_NOT_IN_LIST = 'TOAST_ITEM_NOT_IN_LIST'

// Reader
export const ARTICLE_ITEM_REQUEST = 'ARTICLE_ITEM_REQUEST'
export const ARTICLE_ITEM_SUCCESS = 'ARTICLE_ITEM_SUCCESS'
export const ARTICLE_ITEM_FAILURE = 'ARTICLE_ITEM_FAILURE'

export const ARTICLE_CONTENT_SUCCESS = 'ARTICLE_CONTENT_SUCCESS'
export const ARTICLE_CONTENT_FAILURE = 'ARTICLE_CONTENT_FAILURE'

export const SUGGESTED_TAGS_SUCCESS = 'SUGGESTED_TAGS_SUCCESS'
export const SUGGESTED_TAGS_FAILURE = 'SUGGESTED_TAGS_FAILURE'

export const ANNOTATION_SAVE_REQUEST = 'ANNOTATION_SAVE_REQUEST'
export const ANNOTATION_SAVE_SUCCESS = 'ANNOTATION_SAVE_SUCCESS'
export const ANNOTATION_SAVE_FAILURE = 'ANNOTATION_SAVE_FAILURE'

export const ANNOTATION_DELETE_REQUEST = 'ANNOTATION_DELETE_REQUEST'
export const ANNOTATION_DELETE_SUCCESS = 'ANNOTATION_DELETE_SUCCESS'
export const ANNOTATION_DELETE_FAILURE = 'ANNOTATION_DELETE_FAILURE'

export const UPDATE_LINE_HEIGHT = 'UPDATE_LINE_HEIGHT'
export const UPDATE_COLUMN_WIDTH = 'UPDATE_COLUMN_WIDTH'
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE'
export const UPDATE_FONT_TYPE = 'UPDATE_FONT_TYPE'

export const FRIENDS_SUCCESS = 'FRIENDS_SUCCESS'
export const FRIENDS_FAILURE = 'FRIENDS_FAILURE'
