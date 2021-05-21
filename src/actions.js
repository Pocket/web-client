// Special action fired on client side to pass state used on the server side
export { HYDRATE } from 'next-redux-wrapper'

// App settings/details
export const APP_DEV_MODE_TOGGLE = 'APP_DEV_MODE_TOGGLE'
export const APP_SET_BASE_URL = 'APP_SET_BASE_URL'
export const APP_SET_MODE = 'APP_SET_MODE'
export const APP_SET_SECTION = 'APP_SET_SECTION'
export const APP_SET_PREFERENCES = 'APP_SET_PREFERENCES'
export const APP_LIST_MODE_TOGGLE = 'APP_LIST_MODE_TOGGLE'
export const APP_LIST_MODE_SET = 'APP_LIST_MODE_SET'
export const APP_LIST_MODE_LIST = 'APP_LIST_MODE_LIST'
export const APP_LIST_MODE_GRID = 'APP_LIST_MODE_GRID'
export const APP_LIST_MODE_DETAIL = 'APP_LIST_MODE_DETAIL'
export const APP_SORT_ORDER_TOGGLE = 'APP_SORT_ORDER_TOGGLE'
export const APP_SORT_ORDER_SET = 'APP_SORT_ORDER_SET'
export const APP_SORT_ORDER_OLD = 'APP_SORT_ORDER_OLD'
export const APP_SORT_ORDER_NEW = 'APP_SORT_ORDER_NEW'
export const APP_COLOR_MODE_SET = 'APP_COLOR_MODE_SET'
export const APP_SET_RELEASE = 'APP_SET_RELEASE'
export const APP_UPDATE_RELEASE = 'APP_UPDATE_RELEASE'
export const APP_CHECK_CLIENT_VERSION = 'APP_CHECK_CLIENT_VERSION'

// One Trust
export const ONE_TRUST_DATA = 'ONE_TRUST_DATA'

// User info/auth
export const USER_REQUEST = 'USER_REQUEST'
export const USER_DEV_REQUEST = 'USER_DEV_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
export const SESS_GUID_RECEIVED = 'SESS_GUID_RECEIVED'
export const SESS_GUID_HYDRATE = 'SESS_GUID_HYDRATE'

export const USER_SEARCH_RECENT_GET = 'USER_SEARCH_RECENT_GET'
export const USER_SEARCH_RECENT_SET = 'USER_SEARCH_RECENT_SET'
export const USER_SEARCH_RECENT_SAVE = 'USER_SEARCH_RECENT_SAVE'
export const USER_SEARCH_RECENT_ADD = 'USER_SEARCH_RECENT_ADD'


export const USER_TAGS_HYDRATE = 'USER_TAGS_HYDRATE'
export const USER_TAGS_GET_REQUEST = 'USER_TAGS_REQUEST'
export const USER_TAGS_GET_SUCCESS = 'USER_TAGS_SUCCESS'
export const USER_TAGS_GET_FAILURE = 'USER_TAGS_FAILURE'
export const USER_TAGS_ITEM_SUCCESS = 'USER_TAGS_ITEM_SUCCESS'

export const USER_TAGS_EDIT = 'USER_TAGS_EDIT'
export const USER_TAGS_EDIT_CONFIRM = 'USER_TAGS_EDIT_CONFIRM'
export const USER_TAGS_EDIT_CANCEL = 'USER_TAGS_EDIT_CANCEL'
export const USER_TAGS_EDIT_SUCCESS = 'USER_TAGS_EDIT_SUCCESS'
export const USER_TAGS_EDIT_FAILURE = 'USER_TAGS_EDIT_FAILURE'

export const USER_TAGS_DELETE = 'USER_TAGS_DELETE'
export const USER_TAGS_DELETE_CONFIRM = 'USER_TAGS_DELETE_CONFIRM'
export const USER_TAGS_DELETE_CANCEL = 'USER_TAGS_DELETE_CANCEL'
export const USER_TAGS_DELETE_SUCCESS = 'USER_TAGS_DELETE_SUCCESS'
export const USER_TAGS_DELETE_FAILURE = 'USER_TAGS_DELETE_FAILURE'

export const USER_TAGS_PIN = 'USER_TAGS_PIN'
export const USER_TAGS_PINS_SET = 'USER_TAGS_PINS_SET'

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
export const SNOWPLOW_TRACK_REC_OPEN = 'SNOWPLOW_TRACK_REC_OPEN'
export const SNOWPLOW_TRACK_REC_SAVE = 'SNOWPLOW_TRACK_REC_SAVE'
export const SNOWPLOW_TRACK_REC_IMPRESSION = 'SNOWPLOW_TRACK_REC_IMPRESSION'
export const SNOWPLOW_TRACK_CONTENT_OPEN = 'SNOWPLOW_TRACK_CONTENT_OPEN'
export const SNOWPLOW_TRACK_IMPRESSION = 'SNOWPLOW_TRACK_IMPRESSION'
export const SNOWPLOW_TRACK_CONTENT_IMPRESSION = 'SNOWPLOW_TRACK_CONTENT_IMPRESSION'
export const SNOWPLOW_TRACK_ENGAGEMENT = 'SNOWPLOW_TRACK_ENGAGEMENT'
export const SNOWPLOW_TRACK_CONTENT_ENGAGEMENT = 'SNOWPLOW_TRACK_CONTENT_ENGAGEMENT'
export const SNOWPLOW_TRACK_ITEM_IMPRESSION = 'SNOWPLOW_TRACK_ITEM_IMPRESSION'
export const SNOWPLOW_TRACK_ITEM_ACTION = 'SNOWPLOW_TRACK_ITEM_ACTION'
export const SNOWPLOW_TRACK_ITEM_SAVE = 'SNOWPLOW_TRACK_ITEM_SAVE'
export const SNOWPLOW_TRACK_ITEM_OPEN = 'SNOWPLOW_TRACK_ITEM_OPEN'

// Home Items
export const HOME_SET_PREFERENCES = 'HOME_SET_PREFERENCES'

export const HOME_RECENT_SAVES_REQUEST = 'HOME_RECENT_SAVES_REQUEST'
export const HOME_RECENT_SAVES_SUCCESS = 'HOME_RECENT_SAVES_SUCCESS'
export const HOME_RECENT_SAVES_FAILURE = 'HOME_RECENT_SAVES_FAILURE'

export const HOME_HYDRATE = 'HOME_HYDRATE'
export const HOME_SAVE_REQUEST = 'HOME_SAVE_REQUEST'
export const HOME_SAVE_SUCCESS = 'HOME_SAVE_SUCCESS'
export const HOME_SAVE_FAILURE = 'HOME_SAVE_FAILURE'
export const HOME_UNSAVE_REQUEST = 'HOME_UNSAVE_REQUEST'
export const HOME_UNSAVE_SUCCESS = 'HOME_UNSAVE_SUCCESS'
export const HOME_UNSAVE_FAILURE = 'HOME_UNSAVE_FAILURE'

export const HOME_TOPIC_SECTION_SET = 'HOME_TOPIC_SECTION_SET'
export const HOME_TOPIC_SECTION_UNSET = 'HOME_TOPIC_SECTION_UNSET'
export const HOME_TOPIC_SECTION_REQUEST = 'HOME_TOPIC_SECTION_REQUEST'
export const HOME_TOPIC_SECTION_SUCCESS = 'HOME_TOPIC_SECTION_SUCCESS'
export const HOME_TOPIC_SECTION_FAILURE = 'HOME_TOPIC_SECTION_FAILURE'

export const HOME_COLLECTION_REQUEST = 'HOME_COLLECTION_REQUEST'
export const HOME_COLLECTION_SUCCESS = 'HOME_COLLECTION_SUCCESS'
export const HOME_COLLECTION_FAILURE = 'HOME_COLLECTION_FAILURE'

export const HOME_SET_IMPRESSION = 'HOME_SET_IMPRESSION'

// Discover Items
export const DISCOVER_ITEMS_HYDRATE = 'DISCOVER_ITEMS_HYDRATE'
export const DISCOVER_ITEMS_SAVE_REQUEST = 'DISCOVER_ITEMS_SAVE_REQUEST'
export const DISCOVER_ITEMS_SAVE_SUCCESS = 'DISCOVER_ITEMS_SAVE_SUCCESS'
export const DISCOVER_ITEMS_SAVE_FAILURE = 'DISCOVER_ITEMS_SAVE_FAILURE'
export const DISCOVER_ITEMS_UNSAVE_REQUEST = 'DISCOVER_ITEMS_UNSAVE_REQUEST'
export const DISCOVER_ITEMS_UNSAVE_SUCCESS = 'DISCOVER_ITEMS_UNSAVE_SUCCESS'
export const DISCOVER_ITEMS_UNSAVE_FAILURE = 'DISCOVER_ITEMS_UNSAVE_FAILURE'
export const DISCOVER_ITEMS_NO_IMAGE = 'DISCOVER_ITEMS_NO_IMAGE'

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

// Collections
export const COLLECTIONS_HYDRATE = 'COLLECTIONS_HYDRATE'

export const COLLECTIONS_SAVE_REQUEST = 'COLLECTIONS_SAVE_REQUEST'
export const COLLECTIONS_SAVE_SUCCESS = 'COLLECTIONS_SAVE_SUCCESS'
export const COLLECTIONS_SAVE_FAILURE = 'COLLECTIONS_SAVE_FAILURE'

export const COLLECTION_PAGE_SAVE_REQUEST = 'COLLECTION_PAGE_SAVE_REQUEST'
export const COLLECTION_PAGE_SAVE_SUCCESS = 'COLLECTION_PAGE_SAVE_SUCCESS'
export const COLLECTION_PAGE_SAVE_FAILURE = 'COLLECTION_PAGE_SAVE_FAILURE'

// Collection stories
export const COLLECTION_ITEMS_HYDRATE = 'COLLECTION_ITEMS_HYDRATE'
export const COLLECTION_ITEMS_SAVE_REQUEST = 'COLLECTION_ITEMS_SAVE_REQUEST'
export const COLLECTION_ITEMS_SAVE_SUCCESS = 'COLLECTION_ITEMS_SAVE_SUCCESS'
export const COLLECTION_ITEMS_SAVE_FAILURE = 'COLLECTION_ITEMS_SAVE_FAILURE'
export const COLLECTION_ITEMS_NO_IMAGE = 'COLLECTION_ITEMS_NO_IMAGE'

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
export const PUBLISHER_RECS_REQUEST = 'PUBLISHER_RECS_REQUEST'
export const PUBLISHER_RECS_SUCCESS = 'PUBLISHER_RECS_SUCCESS'
export const PUBLISHER_RECS_FAILURE = 'PUBLISHER_RECS_FAILURE'

// Pocket Recs
export const POCKET_RECS_REQUEST = 'POCKET_RECS_REQUEST'
export const POCKET_RECS_SUCCESS = 'POCKET_RECS_SUCCESS'
export const POCKET_RECS_FAILURE = 'POCKET_RECS_FAILURE'

// Reader Recs
export const READER_RECS_REQUEST = 'READER_RECS_REQUEST'
export const READER_RECS_SUCCESS = 'READER_RECS_SUCCESS'
export const READER_RECS_FAILURE = 'READER_RECS_FAILURE'
export const READER_REC_SAVE_REQUEST = 'READER_REC_SAVE_REQUEST'
export const READER_REC_SAVE_SUCCESS = 'READER_REC_SAVE_SUCCESS'
export const READER_REC_SAVE_FAILURE = 'READER_REC_SAVE_FAILURE'
export const READER_REC_UNSAVE_REQUEST = 'READER_REC_UNSAVE_REQUEST'
export const READER_REC_UNSAVE_SUCCESS = 'READER_REC_UNSAVE_SUCCESS'
export const READER_REC_UNSAVE_FAILURE = 'READER_REC_UNSAVE_FAILURE'

// Recent Recs
export const RECENT_RECS_REQUEST = 'RECENT_RECS_REQUEST'
export const RECENT_RECS_SUCCESS = 'RECENT_RECS_SUCCESS'
export const RECENT_RECS_FAILURE = 'RECENT_RECS_FAILURE'
export const RECENT_REC_SAVE_REQUEST = 'RECENT_REC_SAVE_REQUEST'
export const RECENT_REC_SAVE_SUCCESS = 'RECENT_REC_SAVE_SUCCESS'
export const RECENT_REC_SAVE_FAILURE = 'RECENT_REC_SAVE_FAILURE'
export const RECENT_REC_UNSAVE_REQUEST = 'RECENT_REC_UNSAVE_REQUEST'
export const RECENT_REC_UNSAVE_SUCCESS = 'RECENT_REC_UNSAVE_SUCCESS'
export const RECENT_REC_UNSAVE_FAILURE = 'RECENT_REC_UNSAVE_FAILURE'

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

export const MYLIST_SEARCH_REQUEST = 'MYLIST_SEARCH_REQUEST'
export const MYLIST_SEARCH_CLEAR = 'MYLIST_SEARCH_CLEAR'
export const MYLIST_SEARCH_SUCCESS = 'MYLIST_SEARCH_SUCCESS'
export const MYLIST_SEARCH_FAILURE = 'MYLIST_SEARCH_FAILURE'

// My List Items
export const MYLIST_ITEMS_HYDRATE = 'MYLIST_ITEMS_HYDRATE'
export const MYLIST_ITEMS_NO_IMAGE = 'MYLIST_ITEMS_NO_IMAGE'

export const ITEMS_ACTION_CONFIRM = 'ITEMS_ACTION_CONFIRM'
export const ITEMS_ACTION_CANCEL = 'ITEMS_ACTION_CANCEL'

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
export const ITEMS_FAVORITE_BATCH = 'ITEMS_FAVORITE_BATCH'

export const ITEMS_UNFAVORITE_BATCH = 'ITEMS_UNFAVORITE_BATCH'
export const ITEMS_UNFAVORITE_REQUEST = 'ITEMS_UNFAVORITE_REQUEST'
export const ITEMS_UNFAVORITE_SUCCESS = 'ITEMS_UNFAVORITE_SUCCESS'
export const ITEMS_UNFAVORITE_FAILURE = 'ITEMS_UNFAVORITE_FAILURE'
export const ITEMS_FAVORITE_CONFIRM = 'ITEMS_FAVORITE_CONFIRM'
export const ITEMS_FAVORITE_CANCEL = 'ITEMS_FAVORITE_CANCEL'

export const ITEMS_ARCHIVE_REQUEST = 'ITEMS_ARCHIVE_REQUEST'
export const ITEMS_ARCHIVE_BATCH = 'ITEMS_ARCHIVE_BATCH'
export const ITEMS_ARCHIVE_CONFIRM = 'ITEMS_ARCHIVE_CONFIRM'
export const ITEMS_ARCHIVE_CANCEL = 'ITEMS_ARCHIVE_CANCEL'
export const ITEMS_ARCHIVE_SUCCESS = 'ITEMS_ARCHIVE_SUCCESS'
export const ITEMS_ARCHIVE_FAILURE = 'ITEMS_ARCHIVE_FAILURE'

export const ITEMS_UNARCHIVE_REQUEST = 'ITEMS_UNARCHIVE_REQUEST'
export const ITEMS_UNARCHIVE_BATCH = 'ITEMS_UNARCHIVE_BATCH'
export const ITEMS_UNARCHIVE_CONFIRM = 'ITEMS_UNARCHIVE_CONFIRM'
export const ITEMS_UNARCHIVE_CANCEL = 'ITEMS_UNARCHIVE_CANCEL'
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
export const ITEMS_SOCIAL_SHARE = 'ITEMS_SOCIAL_SHARE'
export const ITEMS_RECOMMEND_CONFIRM = 'ITEMS_RECOMMEND_CONFIRM'
export const ITEMS_SEND_TO_FRIEND_CONFIRM = 'ITEMS_SEND_TO_FRIEND_CONFIRM'
export const ITEMS_SEND_TO_FRIEND_ADD = 'ITEMS_SEND_TO_FRIEND_ADD'
export const ITEMS_SEND_TO_FRIEND_REMOVE = 'ITEMS_SEND_TO_FRIEND_REMOVE'
export const COPY_ITEM_URL = 'COPY_ITEM_URL'

export const ITEMS_BULK_SELECT = 'ITEMS_BULK_SELECT'
export const ITEMS_BULK_DESELECT = 'ITEMS_BULK_DESELECT'
export const ITEMS_BULK_TOGGLE = 'ITEMS_BULK_TOGGLE'
export const ITEMS_BULK_ADD = 'ITEMS_BULK_ADD'
export const ITEMS_BULK_REMOVE = 'ITEMS_BULK_REMOVE'
export const ITEMS_BULK_CLEAR = 'ITEMS_BULK_CLEAR'
export const ITEMS_BULK_SET_CURRENT = 'ITEMS_BULK_SET_CURRENT'

export const ITEMS_BULK_FIRE_ACTION = 'ITEMS_BULK_FIRE_ACTION'
export const ITEMS_BULK_CANCEL_ACTION = 'ITEMS_BULK_CANCEL_ACTION'
export const ITEMS_BULK_CONFIRM_ACTION = 'ITEMS_BULK_CONFIRM_ACTION'
export const ITEMS_BULK_BATCH_BEGIN = 'ITEMS_BULK_BATCH_BEGIN'
export const ITEMS_BULK_BATCH_SUCCESS = 'ITEMS_BULK_BATCH_SUCCESS'
export const ITEMS_BULK_BATCH_FAILURE = 'ITEMS_BULK_BATCH_FAILURE'
export const ITEMS_BULK_BATCH_COMPLETE = 'ITEMS_BULK_BATCH_COMPLETE'

export const ITEMS_REPORT_REQUEST = 'ITEMS_REPORT_REQUEST'
export const ITEMS_REPORT_CONFIRM = 'ITEMS_REPORT_CONFIRM'
export const ITEMS_REPORT_CANCEL = 'ITEMS_REPORT_CANCEL'
export const ITEMS_REPORT_SUCCESS = 'ITEMS_REPORT_SUCCESS'
export const ITEMS_REPORT_FAILURE = 'ITEMS_REPORT_FAILURE'

export const SET_MY_LIST_IMPRESSION = 'SET_MY_LIST_IMPRESSION'

export const TOAST_ITEM_NOT_IN_LIST = 'TOAST_ITEM_NOT_IN_LIST'
export const TOAST_CLEAR = 'TOAST_CLEAR'

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

export const HYDRATE_DISPLAY_SETTINGS = 'HYDRATE_DISPLAY_SETTINGS'
export const UPDATE_LINE_HEIGHT = 'UPDATE_LINE_HEIGHT'
export const UPDATE_COLUMN_WIDTH = 'UPDATE_COLUMN_WIDTH'
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE'
export const UPDATE_FONT_TYPE = 'UPDATE_FONT_TYPE'

// Messages
export const GET_SHARES_REQUEST = 'GET_SHARES_REQUEST'
export const GET_SHARES_SUCCESS = 'GET_SHARES_SUCCESS'
export const GET_SHARES_FAILURE = 'GET_SHARES_FAILURE'

export const ADD_SHARE_REQUEST = 'ADD_SHARE_REQUEST'
export const ADD_SHARE_SUCCESS = 'ADD_SHARE_SUCCESS'
export const ADD_SHARE_FAILURE = 'ADD_SHARE_FAILURE'

export const IGNORE_SHARE_REQUEST = 'IGNORE_SHARE_REQUEST'
export const IGNORE_SHARE_SUCCESS = 'IGNORE_SHARE_SUCCESS'
export const IGNORE_SHARE_FAILURE = 'IGNORE_SHARE_FAILURE'

export const RESEND_CONFIRMATION_REQUEST = 'RESEND_CONFIRMATION_REQUEST'
export const RESEND_CONFIRMATION_SUCCESS = 'RESEND_CONFIRMATION_SUCCESS'
export const RESEND_CONFIRMATION_FAILURE = 'RESEND_CONFIRMATION_FAILURE'

export const SHORTCUT_OPEN_HELP_OVERLAY = 'SHORTCUT_OPEN_HELP_OVERLAY'
export const SHORTCUT_CLOSE_HELP_OVERLAY = 'SHORTCUT_CLOSE_HELP_OVERLAY'
export const SHORTCUT_TOGGLE_HELP_OVERLAY = 'SHORTCUT_TOGGLE_HELP_OVERLAY'

export const SHORTCUT_GO_TO_LIST = 'SHORTCUT_GO_TO_LIST'
export const SHORTCUT_GO_TO_ARCHIVE = 'SHORTCUT_GO_TO_ARCHIVE'
export const SHORTCUT_GO_TO_FAVORITES = 'SHORTCUT_GO_TO_FAVORITES'
export const SHORTCUT_GO_TO_ARTICLES = 'SHORTCUT_GO_TO_ARTICLES'
export const SHORTCUT_GO_TO_HIGHLIGHTS = 'SHORTCUT_GO_TO_HIGHLIGHTS'
export const SHORTCUT_GO_TO_VIDEOS = 'SHORTCUT_GO_TO_VIDEOS'
export const SHORTCUT_GO_TO_TAGS = 'SHORTCUT_GO_TO_TAGS'

export const SHORTCUT_SELECT_NEXT_ITEM = 'SHORTCUT_SELECT_NEXT_ITEM'
export const SHORTCUT_SELECT_PREVIOUS_ITEM = 'SHORTCUT_SELECT_PREVIOUS_ITEM'
export const SHORTCUT_SET_CURRENT_ITEM = 'SHORTCUT_SET_CURRENT_ITEM'
export const SHORTCUT_ARCHIVE_SELECTED_ITEM = 'SHORTCUT_ARCHIVE_SELECTED_ITEM'
export const SHORTCUT_FAVORITE_SELECTED_ITEM = 'SHORTCUT_FAVORITE_SELECTED_ITEM'
export const SHORTCUT_TAG_SELECTED_ITEM = 'SHORTCUT_TAG_SELECTED_ITEM'
export const SHORTCUT_DELETE_ITEM = 'SHORTCUT_DELETE_ITEM'

export const SHORTCUT_VIEW_ORIGINAL_VERSION = 'SHORTCUT_VIEW_ORIGINAL_VERSION'
export const SHORTCUT_ENGAGE_SELECTED_ITEM = 'SHORTCUT_ENGAGE_SELECTED_ITEM'
export const SHORTCUT_INCREASE_FONT_SIZE = 'SHORTCUT_INCREASE_FONT_SIZE'
export const SHORTCUT_DECREASE_FONT_SIZE = 'SHORTCUT_DECREASE_FONT_SIZE'
export const SHORTCUT_INCREASE_COLUMN_WIDTH = 'SHORTCUT_INCREASE_COLUMN_WIDTH'
export const SHORTCUT_DECREASE_COLUMN_WIDTH = 'SHORTCUT_DECREASE_COLUMN_WIDTH'

export const SHORTCUT_GO_BACK = 'SHORTCUT_GO_BACK'
export const SHORTCUT_EDIT_TAGS = 'SHORTCUT_EDIT_TAGS'
export const SHORTCUT_ARCHIVE_ITEM = 'SHORTCUT_ARCHIVE_ITEM'
export const SHORTCUT_FAVORITE_ITEM = 'SHORTCUT_FAVORITE_ITEM'
export const SHORTCUT_VIEW_ORIGINAL = 'SHORTCUT_VIEW_ORIGINAL'

// Profile
export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE'

export const FOLLOW_PROFILE_REQUEST = 'FOLLOW_PROFILE_REQUEST'
export const FOLLOW_PROFILE_SUCCESS = 'FOLLOW_PROFILE_SUCCESS'
export const FOLLOW_PROFILE_FAILURE = 'FOLLOW_PROFILE_FAILURE'

export const UNFOLLOW_PROFILE_REQUEST = 'UNFOLLOW_PROFILE_REQUEST'
export const UNFOLLOW_PROFILE_SUCCESS = 'UNFOLLOW_PROFILE_SUCCESS'
export const UNFOLLOW_PROFILE_FAILURE = 'UNFOLLOW_PROFILE_FAILURE'

// Recommendations
export const GET_PROFILE_FEED_REQUEST = 'GET_PROFILE_FEED_REQUEST'
export const GET_PROFILE_FEED_SUCCESS = 'GET_PROFILE_FEED_SUCCESS'
export const GET_PROFILE_FEED_FAILURE = 'GET_PROFILE_FEED_FAILURE'

export const PROFILE_ITEM_SAVE_REQUEST = 'PROFILE_ITEM_SAVE_REQUEST'
export const PROFILE_ITEM_SAVE_SUCCESS = 'PROFILE_ITEM_SAVE_SUCCESS'
export const PROFILE_ITEM_SAVE_FAILURE = 'PROFILE_ITEM_SAVE_FAILURE'

export const PROFILE_ITEM_DELETE_REQUEST = 'PROFILE_ITEM_DELETE_REQUEST'
export const PROFILE_ITEM_DELETE_SUCCESS = 'PROFILE_ITEM_DELETE_SUCCESS'
export const PROFILE_ITEM_DELETE_FAILURE = 'PROFILE_ITEM_DELETE_FAILURE'
