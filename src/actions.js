// Special action fired on client side to pass state used on the server side
export { HYDRATE } from 'next-redux-wrapper'

export const HOME_TOPIC_SELECTORS_REQUEST = 'HOME_TOPIC_SELECTORS_REQUEST'
export const HOME_TOPIC_SELECTORS_SUCCESS = 'HOME_TOPIC_SELECTORS_SUCCESS'

export const HOME_SET_STORED_USER_TOPICS = 'HOME_SET_STORED_USER_TOPICS'

export const HOME_SETUP_SET_STATUS = 'HOME_SETUP_SET_STATUS'
export const HOME_SETUP_SELECT_TOPIC = 'HOME_SETUP_SELECT_TOPIC'
export const HOME_SETUP_DESELECT_TOPIC = 'HOME_SETUP_DESELECT_TOPIC'
export const HOME_SETUP_CANCEL_SELECTION = 'HOME_SETUP_CANCEL_SELECTION'
export const HOME_SETUP_FINALIZE_TOPICS = 'HOME_SETUP_FINALIZE_TOPICS'
export const HOME_SETUP_RESELECT_TOPICS = 'HOME_SETUP_RESELECT_TOPICS'
export const HOME_SETUP_UPDATE_TOPICS = 'HOME_SETUP_UPDATE_TOPICS'

export const HOME_SETUP_RESET = 'HOME_SETUP_RESET'
export const HOME_COOKIE_RESET = 'HOME_COOKIE_RESET'

export const HOME_ONBOARDING_SAVE_SHOW = 'HOME_ONBOARDING_SAVE_SHOW'
export const HOME_ONBOARDING_READ_SHOW = 'HOME_ONBOARDING_READ_SHOW'
export const HOME_ONBOARDING_SAVE_DISMISS = 'HOME_ONBOARDING_SAVE_DISMISS'
export const HOME_ONBOARDING_READ_DISMISS = 'HOME_ONBOARDING_READ_DISMISS'
export const HOME_ONBOARDING_SAVE_IMPRESSION = 'HOME_ONBOARDING_SAVE_IMPRESSION'
export const HOME_ONBOARDING_READ_IMPRESSION = 'HOME_ONBOARDING_READ_IMPRESSION'
export const HOME_ONBOARDING_UNLOAD = 'HOME_ONBOARDING_UNLOAD'
export const HOME_ONBOARDING_RESET = 'HOME_ONBOARDING_RESET'

// Topics
export const SET_TOPIC_PREFERENCES = 'SET_TOPIC_PREFERENCES'
export const SET_TOPIC_SUCCESS = 'SET_TOPIC_SUCCESS'
export const SET_TOPIC_FAILURE = 'SET_TOPIC_FAILURE'

// App settings/details
export const APP_DEV_MODE_TOGGLE = 'APP_DEV_MODE_TOGGLE'
export const APP_SET_BASE_URL = 'APP_SET_BASE_URL'
export const APP_SET_MODE = 'APP_SET_MODE'
export const APP_SET_SECTION = 'APP_SET_SECTION'
export const APP_SET_PREFERENCES = 'APP_SET_PREFERENCES'
export const APP_LIST_MODE_SET = 'APP_LIST_MODE_SET'
export const APP_LIST_MODE_LIST = 'APP_LIST_MODE_LIST'
export const APP_LIST_MODE_GRID = 'APP_LIST_MODE_GRID'
export const APP_LIST_MODE_DETAIL = 'APP_LIST_MODE_DETAIL'
export const APP_SORT_ORDER_SET = 'APP_SORT_ORDER_SET'
export const APP_SORT_ORDER_OLD = 'APP_SORT_ORDER_OLD'
export const APP_SORT_ORDER_NEW = 'APP_SORT_ORDER_NEW'
export const APP_SORT_ORDER_RELEVANCE = 'APP_SORT_ORDER_RELEVANCE'
export const APP_COLOR_MODE_SET = 'APP_COLOR_MODE_SET'
export const APP_SET_RELEASE = 'APP_SET_RELEASE'
export const APP_UPDATE_RELEASE = 'APP_UPDATE_RELEASE'

// Stored settings
export const SETTINGS_FETCH_REQUEST = 'SETTINGS_FETCH_REQUEST'
export const SETTINGS_FETCH_SUCCESS = 'SETTINGS_FETCH_SUCCESS'
export const SETTINGS_FETCH_FAILURE = 'SETTINGS_FETCH_FAILURE'
export const SETTINGS_SAVE_REQUEST = 'SETTINGS_SAVE_REQUEST'
export const SETTINGS_SAVE_SUCCESS = 'SETTINGS_SAVE_SUCCESS'
export const SETTINGS_SAVE_FAILURE = 'SETTINGS_SAVE_FAILURE'
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE'

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

export const USER_TAGS_GET_REQUEST = 'USER_TAGS_GET_REQUEST'
export const USER_TAGS_GET_SUCCESS = 'USER_TAGS_GET_SUCCESS'
export const USER_TAGS_GET_FAILURE = 'USER_TAGS_GET_FAILURE'
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

// Account
export const ACCOUNT_FIRST_NAME_UPDATE = 'ACCOUNT_FIRST_NAME_UPDATE'
export const ACCOUNT_LAST_NAME_UPDATE = 'ACCOUNT_LAST_NAME_UPDATE'
export const ACCOUNT_BIO_UPDATE = 'ACCOUNT_BIO_UPDATE'

export const ACCOUNT_DETAIL_UPDATE_REQUEST = 'ACCOUNT_DETAIL_UPDATE_REQUEST'
export const ACCOUNT_DETAIL_UPDATE_SUCCESS = 'ACCOUNT_DETAIL_UPDATE_SUCCESS'
export const ACCOUNT_DETAIL_UPDATE_FAILURE = 'ACCOUNT_DETAIL_UPDATE_FAILURE'

export const ACCOUNT_AVATAR_UPDATE_REQUEST = 'ACCOUNT_AVATAR_UPDATE_REQUEST'
export const ACCOUNT_AVATAR_UPDATE_CANCEL = 'ACCOUNT_AVATAR_UPDATE_CANCEL'
export const ACCOUNT_AVATAR_UPDATE_CONFIRM = 'ACCOUNT_AVATAR_UPDATE_CONFIRM'
export const ACCOUNT_AVATAR_UPDATE_SUCCESS = 'ACCOUNT_AVATAR_UPDATE_SUCCESS'
export const ACCOUNT_AVATAR_UPDATE_FAILURE = 'ACCOUNT_AVATAR_UPDATE_FAILURE'

export const ACCOUNT_USERNAME_UPDATE_REQUEST = 'ACCOUNT_USERNAME_UPDATE_REQUEST'
export const ACCOUNT_USERNAME_UPDATE_CONFIRM = 'ACCOUNT_USERNAME_UPDATE_CONFIRM'
export const ACCOUNT_USERNAME_UPDATE_CANCEL = 'ACCOUNT_USERNAME_UPDATE_CANCEL'
export const ACCOUNT_USERNAME_UPDATE_SUCCESS = 'ACCOUNT_USERNAME_UPDATE_SUCCESS'
export const ACCOUNT_USERNAME_UPDATE_FAILURE = 'ACCOUNT_USERNAME_UPDATE_FAILURE'

export const ACCOUNT_PASSWORD_UPDATE_REQUEST = 'ACCOUNT_PASSWORD_UPDATE_REQUEST'
export const ACCOUNT_PASSWORD_UPDATE_CONFIRM = 'ACCOUNT_PASSWORD_UPDATE_CONFIRM'
export const ACCOUNT_PASSWORD_UPDATE_CANCEL = 'ACCOUNT_PASSWORD_UPDATE_CANCEL'
export const ACCOUNT_PASSWORD_UPDATE_SUCCESS = 'ACCOUNT_PASSWORD_UPDATE_SUCCESS'
export const ACCOUNT_PASSWORD_UPDATE_FAILURE = 'ACCOUNT_PASSWORD_UPDATE_FAILURE'

export const ACCOUNT_EMAIL_UPDATE_REQUEST = 'ACCOUNT_EMAIL_UPDATE_REQUEST'
export const ACCOUNT_EMAIL_UPDATE_CONFIRM = 'ACCOUNT_EMAIL_UPDATE_CONFIRM'
export const ACCOUNT_EMAIL_UPDATE_CANCEL = 'ACCOUNT_EMAIL_UPDATE_CANCEL'
export const ACCOUNT_EMAIL_UPDATE_SUCCESS = 'ACCOUNT_EMAIL_UPDATE_SUCCESS'
export const ACCOUNT_EMAIL_UPDATE_FAILURE = 'ACCOUNT_EMAIL_UPDATE_FAILURE'
export const ACCOUNT_EMAIL_RESEND_CONFIRMATION = 'ACCOUNT_EMAIL_RESEND_CONFIRMATION'

export const ACCOUNT_EMAIL_ALIAS_ADD_REQUEST = 'ACCOUNT_EMAIL_ALIAS_ADD_REQUEST'
export const ACCOUNT_EMAIL_ALIAS_ADD_SUCCESS = 'ACCOUNT_EMAIL_ALIAS_ADD_SUCCESS'
export const ACCOUNT_EMAIL_ALIAS_ADD_FAILURE = 'ACCOUNT_EMAIL_ALIAS_ADD_FAILURE'

export const ACCOUNT_EMAIL_ALIAS_REMOVE_REQUEST = 'ACCOUNT_EMAIL_ALIAS_REMOVE_REQUEST'
export const ACCOUNT_EMAIL_ALIAS_REMOVE_SUCCESS = 'ACCOUNT_EMAIL_ALIAS_REMOVE_SUCCESS'
export const ACCOUNT_EMAIL_ALIAS_REMOVE_FAILURE = 'ACCOUNT_EMAIL_ALIAS_REMOVE_FAILURE'

export const ACCOUNT_GET_CONNECTIONS_REQUEST = 'ACCOUNT_GET_CONNECTIONS_REQUEST'
export const ACCOUNT_GET_CONNECTIONS_SUCCESS = 'ACCOUNT_GET_CONNECTIONS_SUCCESS'
export const ACCOUNT_GET_CONNECTIONS_FAILURE = 'ACCOUNT_GET_CONNECTIONS_FAILURE'

export const ACCOUNT_CONNECTION_REVOKE_REQUEST = 'ACCOUNT_CONNECTION_REVOKE_REQUEST'
export const ACCOUNT_CONNECTION_REVOKE_SUCCESS = 'ACCOUNT_CONNECTION_REVOKE_SUCCESS'
export const ACCOUNT_CONNECTION_REVOKE_FAILURE = 'ACCOUNT_CONNECTION_REVOKE_FAILURE'

export const ACCOUNT_FEED_PROTECTION_REQUEST = 'ACCOUNT_FEED_PROTECTION_REQUEST'
export const ACCOUNT_FEED_PROTECTION_SUCCESS = 'ACCOUNT_FEED_PROTECTION_SUCCESS'
export const ACCOUNT_FEED_PROTECTION_FAILURE = 'ACCOUNT_FEED_PROTECTION_FAILURE'

export const ACCOUNT_CLEAR_REQUEST = 'ACCOUNT_CLEAR_REQUEST'
export const ACCOUNT_CLEAR_CONFIRM = 'ACCOUNT_CLEAR_CONFIRM'
export const ACCOUNT_CLEAR_CANCEL = 'ACCOUNT_CLEAR_CANCEL'
export const ACCOUNT_CLEAR_SUCCESS = 'ACCOUNT_CLEAR_SUCCESS'
export const ACCOUNT_CLEAR_FAILURE = 'ACCOUNT_CLEAR_FAILURE'

export const ACCOUNT_DELETE_REQUEST = 'ACCOUNT_DELETE_REQUEST'
export const ACCOUNT_DELETE_CONFIRM = 'ACCOUNT_DELETE_CONFIRM'
export const ACCOUNT_DELETE_CANCEL = 'ACCOUNT_DELETE_CANCEL'
export const ACCOUNT_DELETE_SUCCESS = 'ACCOUNT_DELETE_SUCCESS'
export const ACCOUNT_DELETE_FAILURE = 'ACCOUNT_DELETE_FAILURE'

// Feature Flags
export const FEATURES_HYDRATE = 'FEATURES_HYDRATE'
export const FEATURES_TOGGLE = 'FEATURES_TOGGLE'
export const FEATURES_ASSIGN = 'FEATURES_ASSIGN'
export const FEATURES_SET = 'FEATURES_SET'

// Variant Flags
export const VARIANTS_DEFINE = 'VARIANTS_DEFINE'
export const VARIANTS_SAVE = 'VARIANTS_SAVE'
export const VARIANTS_UPDATE = 'VARIANTS_UPDATE'

// Snowplow
export const SNOWPLOW_INITIALIZED = 'SNOWPLOW_INITIALIZED'
export const SNOWPLOW_TRACK_PAGE_VIEW = 'SNOWPLOW_TRACK_PAGE_VIEW'
export const SNOWPLOW_TRACK_ITEM_IMPRESSION = 'SNOWPLOW_TRACK_ITEM_IMPRESSION'
export const SNOWPLOW_SEND_EVENT = 'SNOWPLOW_SEND_EVENT'

// Braze
export const BRAZE_INITIALIZED = 'BRAZE_INITIALIZED'
export const BRAZE_TOKEN_REQUEST = 'BRAZE_TOKEN_REQUEST'
export const BRAZE_TOKEN_SUCCESS = 'BRAZE_TOKEN_SUCCESS'
export const BRAZE_TOKEN_FAILURE = 'BRAZE_TOKEN_FAILURE'
export const TOGGLE_BRAZE = 'TOGGLE_BRAZE'

// Home Items
export const HOME_HYDRATE = 'HOME_HYDRATE'

export const HOME_CONTENT_REQUEST = 'HOME_CONTENT_REQUEST'
export const HOME_CONTENT_SUCCESS = 'HOME_CONTENT_SUCCESS'
export const HOME_CONTENT_FAILURE = 'HOME_CONTENT_FAILURE'

export const HOME_RECENT_SAVES_REQUEST = 'HOME_RECENT_SAVES_REQUEST'
export const HOME_RECENT_SAVES_SUCCESS = 'HOME_RECENT_SAVES_SUCCESS'
export const HOME_RECENT_SAVES_FAILURE = 'HOME_RECENT_SAVES_FAILURE'

export const HOME_SAVE_REQUEST = 'HOME_SAVE_REQUEST'
export const HOME_SAVE_SUCCESS = 'HOME_SAVE_SUCCESS'
export const HOME_SAVE_FAILURE = 'HOME_SAVE_FAILURE'
export const HOME_UNSAVE_REQUEST = 'HOME_UNSAVE_REQUEST'
export const HOME_UNSAVE_SUCCESS = 'HOME_UNSAVE_SUCCESS'
export const HOME_UNSAVE_FAILURE = 'HOME_UNSAVE_FAILURE'

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

export const COLLECTION_PAGE_UNSAVE_REQUEST = 'COLLECTION_PAGE_UNSAVE_REQUEST'
export const COLLECTION_PAGE_UNSAVE_SUCCESS = 'COLLECTION_PAGE_UNSAVE_SUCCESS'
export const COLLECTION_PAGE_UNSAVE_FAILURE = 'COLLECTION_PAGE_UNSAVE_FAILURE'


// Collection stories
export const COLLECTION_STORIES_REQUEST = 'COLLECTION_STORIES_REQUEST'
export const COLLECTION_STORIES_REQUEST_SUCCESS = 'COLLECTION_STORIES_REQUEST_SUCCESS'
export const COLLECTION_STORIES_REQUEST_FAILURE = 'COLLECTION_STORIES_REQUEST_FAILURE'
export const COLLECTION_STORIES_HYDRATE = 'COLLECTION_STORIES_HYDRATE'
export const COLLECTION_STORIES_HYDRATE_SUCCESS = 'COLLECTION_STORIES_HYDRATE_SUCCESS'
export const COLLECTION_STORIES_HYDRATE_FAILURE = 'COLLECTION_STORIES_HYDRATE_FAILURE'
export const COLLECTION_STORIES_SAVE_REQUEST = 'COLLECTION_STORIES_SAVE_REQUEST'
export const COLLECTION_STORIES_SAVE_SUCCESS = 'COLLECTION_STORIES_SAVE_SUCCESS'
export const COLLECTION_STORIES_SAVE_FAILURE = 'COLLECTION_STORIES_SAVE_FAILURE'
export const COLLECTION_STORIES_NO_IMAGE = 'COLLECTION_STORIES_NO_IMAGE'

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

// Saves
export const SAVES_DATA_REQUEST = 'SAVES_DATA_REQUEST'
export const SAVES_DATA_SUCCESS = 'SAVES_DATA_SUCCESS'
export const SAVES_DATA_FAILURE = 'SAVES_DATA_FAILURE'
export const SAVES_HYDRATE = 'SAVES_HYDRATE'
export const SAVES_SAVE_REQUEST = 'SAVES_SAVE_REQUEST'
export const SAVES_UNSAVE_REQUEST = 'SAVES_UNSAVE_REQUEST'
export const SAVES_UPDATE_REQUEST = 'SAVES_UPDATE_REQUEST'
export const SAVES_UPDATE_SUCCESS = 'SAVES_UPDATE_SUCCESS'
export const SAVES_UPDATE_FAILURE = 'SAVES_UPDATE_FAILURE'

export const SAVES_SEARCH_REQUEST = 'SAVES_SEARCH_REQUEST'
export const SAVES_SEARCH_CLEAR = 'SAVES_SEARCH_CLEAR'
export const SAVES_SEARCH_SUCCESS = 'SAVES_SEARCH_SUCCESS'
export const SAVES_SEARCH_FAILURE = 'SAVES_SEARCH_FAILURE'

// Saves Items
export const SAVES_ITEMS_HYDRATE = 'SAVES_ITEMS_HYDRATE'
export const SAVES_ITEMS_NO_IMAGE = 'SAVES_ITEMS_NO_IMAGE'

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
export const TOAST_CLEAR_ALL = 'TOAST_CLEAR_ALL'

// Reader: Client API
export const READ_ITEM_REQUEST = 'READ_ITEM_REQUEST'
export const READ_ITEM_SUCCESS = 'READ_ITEM_SUCCESS'
export const READ_ITEM_FAILURE = 'READ_ITEM_FAILURE'

export const READ_FAVORITE_REQUEST = 'READ_FAVORITE_REQUEST'
export const READ_FAVORITE_SUCCESS = 'READ_FAVORITE_SUCCESS'
export const READ_FAVORITE_FAILURE = 'READ_FAVORITE_FAILURE'

export const READ_UNFAVORITE_REQUEST = 'READ_UNFAVORITE_REQUEST'
export const READ_UNFAVORITE_SUCCESS = 'READ_UNFAVORITE_SUCCESS'
export const READ_UNFAVORITE_FAILURE = 'READ_UNFAVORITE_FAILURE'

export const READ_ARCHIVE_REQUEST = 'READ_ARCHIVE_REQUEST'
export const READ_ARCHIVE_SUCCESS = 'READ_ARCHIVE_SUCCESS'
export const READ_ARCHIVE_FAILURE = 'READ_ARCHIVE_FAILURE'

export const READ_UNARCHIVE_REQUEST = 'READ_UNARCHIVE_REQUEST'
export const READ_UNARCHIVE_SUCCESS = 'READ_UNARCHIVE_SUCCESS'
export const READ_UNARCHIVE_FAILURE = 'READ_UNARCHIVE_FAILURE'

export const READ_MUTATE_SAVED_DATA = 'READ_MUTATE_SAVED_DATA'

export const READ_SET_HIGHLIGHTS = 'READ_SET_HIGHLIGHTS'

export const HIGHLIGHT_SAVE_REQUEST = 'HIGHLIGHT_SAVE_REQUEST'
export const HIGHLIGHT_SAVE_SUCCESS = 'HIGHLIGHT_SAVE_SUCCESS'
export const HIGHLIGHT_SAVE_FAILURE = 'HIGHLIGHT_SAVE_FAILURE'

export const HIGHLIGHT_DELETE_REQUEST = 'HIGHLIGHT_DELETE_REQUEST'
export const HIGHLIGHT_DELETE_SUCCESS = 'HIGHLIGHT_DELETE_SUCCESS'
export const HIGHLIGHT_DELETE_FAILURE = 'HIGHLIGHT_DELETE_FAILURE'

// Reader: v3
export const ARTICLE_ITEM_REQUEST = 'ARTICLE_ITEM_REQUEST'
export const ARTICLE_ITEM_SUCCESS = 'ARTICLE_ITEM_SUCCESS'
export const ARTICLE_ITEM_FAILURE = 'ARTICLE_ITEM_FAILURE'

export const ARTICLE_CONTENT_SUCCESS = 'ARTICLE_CONTENT_SUCCESS'
export const ARTICLE_CONTENT_FAILURE = 'ARTICLE_CONTENT_FAILURE'

export const ANNOTATION_SAVE_REQUEST = 'ANNOTATION_SAVE_REQUEST'
export const ANNOTATION_SAVE_SUCCESS = 'ANNOTATION_SAVE_SUCCESS'
export const ANNOTATION_SAVE_FAILURE = 'ANNOTATION_SAVE_FAILURE'

export const ANNOTATION_DELETE_REQUEST = 'ANNOTATION_DELETE_REQUEST'
export const ANNOTATION_DELETE_SUCCESS = 'ANNOTATION_DELETE_SUCCESS'
export const ANNOTATION_DELETE_FAILURE = 'ANNOTATION_DELETE_FAILURE'

// Reader: Settings
export const HYDRATE_DISPLAY_SETTINGS = 'HYDRATE_DISPLAY_SETTINGS'
export const UPDATE_LINE_HEIGHT = 'UPDATE_LINE_HEIGHT'
export const UPDATE_COLUMN_WIDTH = 'UPDATE_COLUMN_WIDTH'
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE'
export const UPDATE_FONT_TYPE = 'UPDATE_FONT_TYPE'
export const TOGGLE_READER_SIDEBAR = 'TOGGLE_READER_SIDEBAR'
export const READER_CLEAR_DELETION = 'READER_CLEAR_DELETION'
export const PINNED_TOPICS_SET = 'PINNED_TOPICS_SET'

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

// Shortcuts
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

// Onboarding
export const ONBOARDING_RESET = 'ONBOARDING_RESET'
export const ONBOARDING_CLOSE_SAVE_FLYAWAY = 'ONBOARDING_CLOSE_SAVE_FLYAWAY'
export const ONBOARDING_CLOSE_READER_FLYAWAY = 'ONBOARDING_CLOSE_READER_FLYAWAY'
export const ONBOARDING_CLOSE_EXTENSION_FLYAWAY = 'ONBOARDING_CLOSE_EXTENSION_FLYAWAY'
export const ONBOARDING_CLOSE_APPS_FLYAWAY = 'ONBOARDING_CLOSE_APPS_FLYAWAY'

// Share
export const SHARE_REQUEST = 'SHARE_REQUEST'
export const SHARE_RECOMMEND = 'SHARE_RECOMMEND'
export const SHARE_RECOMMEND_SUCCESS = 'SHARE_RECOMMEND_SUCCESS'
export const SHARE_RECOMMEND_FAILURE = 'SHARE_RECOMMEND_FAILURE'
export const SHARE_CANCEL = 'SHARE_CANCEL'

// ITEMS
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'

// SAVED ITEMS (GraphQL as source)
export const ITEMS_SAVED_REQUEST = 'ITEMS_SAVED_REQUEST'
export const ITEMS_SAVED_SUCCESS = 'ITEMS_SAVED_SUCCESS'
export const ITEMS_SAVED_FAILURE = 'ITEMS_SAVED_FAILURE'
export const ITEMS_UPSERT_SUCCESS = 'ITEMS_UPSERT_SUCCESS'
export const ITEMS_UPSERT_INJECT = 'ITEMS_UPSERT_INJECT'

export const ITEMS_SAVED_SEARCH_REQUEST = 'ITEMS_SAVED_SEARCH_REQUEST'
export const ITEMS_SAVED_SEARCH_FAILURE = 'ITEMS_SAVED_SEARCH_FAILURE'
export const ITEMS_SAVED_SEARCH_SUCCESS = 'ITEMS_SAVED_SEARCH_SUCCESS'

export const ITEMS_SAVED_TAGGED_REQUEST = 'ITEMS_SAVED_TAGGED_REQUEST'
export const ITEMS_SAVED_TAGGED_FAILURE = 'ITEMS_SAVED_TAGGED_FAILURE'
export const ITEMS_SAVED_TAGGED_SUCCESS = 'ITEMS_SAVED_TAGGED_SUCCESS'

export const ITEMS_UNDELETE_SUCCESS = 'ITEMS_UNDELETE_SUCCESS'

export const MUTATION_UPSERT = 'MUTATION_UPSERT'
export const MUTATION_FAVORITE = 'MUTATION_FAVORITE'
export const MUTATION_UNFAVORITE = 'MUTATION_UNFAVORITE'
export const MUTATION_ARCHIVE = 'MUTATION_ARCHIVE'
export const MUTATION_UNARCHIVE = 'MUTATION_UNARCHIVE'
export const MUTATION_RE_ADD = 'MUTATION_RE_ADD'
export const MUTATION_UNDELETE = 'MUTATION_UNDELETE'
export const MUTATION_DELETE = 'MUTATION_DELETE'
export const MUTATION_DELETE_SUCCESS = 'MUTATION_DELETE_SUCCESS'

export const MUTATION_SUCCESS = 'MUTATION_SUCCESS'
export const MUTATION_FAILURE = 'MUTATION_FAILURE'
export const MUTATION_CANCEL = 'MUTATION_CANCEL'

export const MUTATION_BULK_FAVORITE = 'MUTATION_BULK_FAVORITE'
export const MUTATION_BULK_UNFAVORITE = 'MUTATION_BULK_UNFAVORITE'
export const MUTATION_BULK_ARCHIVE = 'MUTATION_BULK_ARCHIVE'
export const MUTATION_BULK_UNARCHIVE = 'MUTATION_BULK_UNARCHIVE'
export const MUTATION_BULK_RE_ADD = 'MUTATION_BULK_RE_ADD'
export const MUTATION_BULK_DELETE = 'MUTATION_BULK_DELETE'

export const MUTATION_BULK_CONFIRM = 'MUTATION_BULK_CONFIRM'
export const MUTATION_BULK_CANCEL = 'MUTATION_BULK_CANCEL'

export const MUTATION_BULK_TOGGLE= 'MUTATION_BULK_TOGGLE'
export const MUTATION_BULK_SELECT = 'MUTATION_BULK_SELECT'
export const MUTATION_BULK_DESELECT = 'MUTATION_BULK_DESELECT'
export const MUTATION_BULK_CLEAR = 'MUTATION_BULK_CLEAR'
export const MUTATION_BULK_FIRE_ACTION = 'MUTATION_BULK_FIRE_ACTION'
export const MUTATION_BULK_SET_CURRENT= 'MUTATION_BULK_SET_CURRENT'
export const MUTATION_BULK_ADD= 'MUTATION_BULK_ADD'
export const MUTATION_BULK_REMOVE= 'MUTATION_BULK_REMOVE'

export const MUTATION_BULK_BATCH_COMPLETE= 'MUTATION_BULK_BATCH_COMPLETE'
export const MUTATION_BULK_BATCH_BEGIN= 'MUTATION_BULK_BATCH_BEGIN'
export const MUTATION_BULK_BATCH_SUCCESS= 'MUTATION_BULK_BATCH_SUCCESS'
export const MUTATION_BULK_BATCH_FAILURE= 'MUTATION_BULK_BATCH_FAILURE'

// TAGGING
export const MUTATION_TAGGING = 'MUTATION_TAGGING'
export const MUTATION_BULK_TAGGING = 'MUTATION_BULK_TAGGING'

export const MUTATION_TAG_SELECT = 'MUTATION_TAG_SELECT'
export const MUTATION_TAG_SELECTION_CLEAR = 'MUTATION_TAG_SELECTION_CLEAR'

export const MUTATION_TAG_SUGGESTION_REQUEST = 'MUTATION_TAG_SUGGESTION_REQUEST'
export const MUTATION_TAG_SUGGESTION_SUCCESS = 'MUTATION_TAG_SUGGESTION_SUCCESS'
export const MUTATION_TAG_SUGGESTION_FAILURE = 'MUTATION_TAG_SUGGESTION_FAILURE'

export const MUTATION_TAG_REMOVE = 'MUTATION_TAG_REMOVE'
export const MUTATION_TAG_ADD = 'MUTATION_TAG_ADD'
export const MUTATION_TAG_CANCEL = 'MUTATION_TAG_CANCEL'
export const MUTATION_TAG_CONFIRM = 'MUTATION_TAG_CONFIRM'
export const MUTATION_TAG_SUCCESS = 'MUTATION_TAG_SUCCESS'


// SAVED ITEMS LIST
export const ITEMS_SAVED_PAGE_INFO_SUCCESS = 'ITEMS_SAVED_PAGE_INFO_SUCCESS'
export const ITEMS_SAVED_PAGE_INFO_FAILURE = 'ITEMS_SAVED_PAGE_INFO_FAILURE'
export const ITEMS_SAVED_PAGE_SET_FILTERS = 'ITEMS_SAVED_PAGE_SET_FILTERS'
export const ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST = 'ITEMS_SAVED_PAGE_SET_SORT_ORDER_REQUEST'
export const ITEMS_SAVED_PAGE_SET_SORT_ORDER = 'ITEMS_SAVED_PAGE_SET_SORT_ORDER'
export const ITEMS_SAVED_PAGE_SET_SORT_BY = 'ITEMS_SAVED_PAGE_SET_SORT_BY'
export const ITEM_SAVED_REMOVE_FROM_LIST = 'ITEM_SAVED_REMOVE_FROM_LIST'

export const LOAD_MORE_ITEMS = 'LOAD_MORE_ITEMS'
export const ITEMS_CLEAR_CURRENT = 'ITEMS_CLEAR_CURRENT'

export const ITEMS_SET_NO_IMAGE = 'ITEMS_SET_NO_IMAGE'

export const GET_ITEMS_UNREAD = 'GET_ITEMS_UNREAD'
export const GET_ITEMS_ARCHIVED = 'GET_ITEMS_ARCHIVED'
export const GET_ITEMS_FAVORITES = 'GET_ITEMS_FAVORITES'
export const GET_ITEMS_FAVORITES_UNREAD = 'GET_ITEMS_FAVORITES_UNREAD'
export const GET_ITEMS_FAVORITES_ARCHIVED = 'GET_ITEMS_FAVORITES_ARCHIVED'
export const GET_ITEMS_ANNOTATED = 'GET_ITEMS_ANNOTATED'
export const GET_ITEMS_ANNOTATED_UNREAD = 'GET_ITEMS_ANNOTATED_UNREAD'
export const GET_ITEMS_ANNOTATED_ARCHIVED = 'GET_ITEMS_ANNOTATED_ARCHIVED'
export const GET_ITEMS_ANNOTATED_FAVORITES = 'GET_ITEMS_ANNOTATED_FAVORITES'
export const GET_ITEMS_ARTICLES = 'GET_ITEMS_ARTICLES'
export const GET_ITEMS_ARTICLES_UNREAD = 'GET_ITEMS_ARTICLES_UNREAD'
export const GET_ITEMS_ARTICLES_ARCHIVED = 'GET_ITEMS_ARTICLES_ARCHIVED'
export const GET_ITEMS_ARTICLES_FAVORITES = 'GET_ITEMS_ARTICLES_FAVORITES'
export const GET_ITEMS_VIDEOS = 'GET_ITEMS_VIDEOS'
export const GET_ITEMS_VIDEOS_UNREAD = 'GET_ITEMS_VIDEOS_UNREAD'
export const GET_ITEMS_VIDEOS_ARCHIVED = 'GET_ITEMS_VIDEOS_ARCHIVED'
export const GET_ITEMS_VIDEOS_FAVORITES = 'GET_ITEMS_VIDEOS_FAVORITES'
export const GET_ITEMS_TAGS = 'GET_ITEMS_TAGS'
export const GET_ITEMS_TAGS_UNREAD = 'GET_ITEMS_TAGS_UNREAD'
export const GET_ITEMS_TAGS_ARCHIVED = 'GET_ITEMS_TAGS_ARCHIVED'
export const GET_ITEMS_TAGS_FAVORITES = 'GET_ITEMS_TAGS_FAVORITES'
export const SEARCH_SAVED_ITEMS = 'SEARCH_SAVED_ITEMS'
export const SEARCH_SAVED_ITEMS_UNREAD = 'SEARCH_SAVED_ITEMS_UNREAD'
export const SEARCH_SAVED_ITEMS_ARCHIVED = 'SEARCH_SAVED_ITEMS_ARCHIVED'
export const SEARCH_SAVED_ITEMS_FAVORITES = 'SEARCH_SAVED_ITEMS_FAVORITES'

export const USER_TAGS_REQUEST = 'USER_TAGS_REQUEST'
export const USER_TAGS_SUCCESS = 'USER_TAGS_SUCCESS'
export const USER_TAGS_FAILURE = 'USER_TAGS_FAILURE'

// LISTS ITEMS
export const ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST = 'ITEMS_LISTS_PAGE_SET_SORT_ORDER_REQUEST'
export const ITEMS_LISTS_PAGE_SET_SORT_ORDER = 'ITEMS_LISTS_PAGE_SET_SORT_ORDER'

export const ITEMS_CREATE_LIST_REQUEST = 'ITEMS_CREATE_LIST_REQUEST'
export const ITEMS_CREATE_LIST_CONFIRM = 'ITEMS_CREATE_LIST_CONFIRM'
export const ITEMS_CREATE_LIST_CANCEL = 'ITEMS_CREATE_LIST_CANCEL'
export const ITEMS_CREATE_LIST_FAILURE = 'ITEMS_CREATE_LIST_FAILURE'
export const ITEMS_CREATE_LIST_SUCCESS = 'ITEMS_CREATE_LIST_SUCCESS'
export const USER_SHAREABLE_LISTS_REQUEST = 'USER_SHAREABLE_LISTS_REQUEST'
export const USER_SHAREABLE_LISTS_REQUEST_SUCCESS = 'USER_SHAREABLE_LISTS_REQUEST_SUCCESS'
export const USER_SHAREABLE_LISTS_REQUEST_FAILURE = 'USER_SHAREABLE_LISTS_REQUEST_FAILURE'

export const ITEMS_SHAREABLE_LIST_REQUEST = 'ITEMS_SHAREABLE_LIST_REQUEST'
export const ITEMS_SHAREABLE_LIST_SUCCESS = 'ITEMS_SHAREABLE_LIST_SUCCESS'
export const ITEMS_SHAREABLE_LIST_FAILURE = 'ITEMS_SHAREABLE_LIST_FAILURE'

export const LIST_ADD_ITEM_REQUEST = 'LIST_ADD_ITEM_REQUEST'
export const LIST_ADD_ITEM_CONFIRM = 'LIST_ADD_ITEM_CONFIRM'
export const LIST_ADD_ITEM_CANCEL = 'LIST_ADD_ITEM_CANCEL'
export const LIST_ADD_ITEM_SUCCESS = 'LIST_ADD_ITEM_SUCCESS'
export const LIST_ADD_ITEM_FAILURE = 'LIST_ADD_ITEM_FAILURE'

export const LIST_DELETE_ITEM_REQUEST = 'LIST_DELETE_ITEM_REQUEST'
export const LIST_DELETE_ITEM_SUCCESS = 'LIST_DELETE_ITEM_SUCCESS'
export const LIST_DELETE_ITEM_FAILURE = 'LIST_DELETE_ITEM_FAILURE'

export const SHAREABLE_LIST_DELETE_REQUEST = 'SHAREABLE_LIST_DELETE_REQUEST'
export const SHAREABLE_LIST_DELETE_SUCCESS = 'SHAREABLE_LIST_DELETE_SUCCESS'
export const SHAREABLE_LIST_DELETE_FAILURE = 'SHAREABLE_LIST_DELETE_FAILURE'

// TODO - update these to all start with "list"
