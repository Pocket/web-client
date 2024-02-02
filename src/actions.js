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

// Topics
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
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
export const SESS_GUID_HYDRATE = 'SESS_GUID_HYDRATE'

export const USER_SEARCH_RECENT_GET = 'USER_SEARCH_RECENT_GET'
export const USER_SEARCH_RECENT_SET = 'USER_SEARCH_RECENT_SET'
export const USER_SEARCH_RECENT_SAVE = 'USER_SEARCH_RECENT_SAVE'
export const USER_SEARCH_RECENT_ADD = 'USER_SEARCH_RECENT_ADD'

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
export const VARIANTS_SAVE = 'VARIANTS_SAVE'

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
export const HOME_CONTENT_REQUEST = 'HOME_CONTENT_REQUEST'
export const HOME_CONTENT_SUCCESS = 'HOME_CONTENT_SUCCESS'
export const HOME_CONTENT_FAILURE = 'HOME_CONTENT_FAILURE'

export const HOME_SAVE_REQUEST = 'HOME_SAVE_REQUEST'

export const HOME_REC_REQUEST_PROMOTE = 'HOME_REC_REQUEST_PROMOTE'
export const HOME_REC_REQUEST_DEMOTE = 'HOME_REC_REQUEST_DEMOTE'
export const HOME_REC_PROMOTE = 'HOME_REC_PROMOTE'
export const HOME_REC_DEMOTE = 'HOME_REC_DEMOTE'

// Explore Home
export const DISCOVER_HYDRATE = 'DISCOVER_HYDRATE'

// Topic List
export const TOPICLIST_SET_ACTIVE = 'TOPICLIST_SET_ACTIVE'

// Topic Pages
export const TOPIC_HYDRATE = 'TOPIC_HYDRATE'

// Collections
export const COLLECTIONS_HYDRATE = 'COLLECTIONS_HYDRATE'

// Collection stories
export const COLLECTION_STORIES_HYDRATE = 'COLLECTION_STORIES_HYDRATE'

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

export const COPY_ITEM_URL = 'COPY_ITEM_URL'

export const ITEMS_REPORT_REQUEST = 'ITEMS_REPORT_REQUEST'
export const ITEMS_REPORT_CONFIRM = 'ITEMS_REPORT_CONFIRM'
export const ITEMS_REPORT_CANCEL = 'ITEMS_REPORT_CANCEL'
export const ITEMS_REPORT_SUCCESS = 'ITEMS_REPORT_SUCCESS'
export const ITEMS_REPORT_FAILURE = 'ITEMS_REPORT_FAILURE'

export const TOAST_CLEAR = 'TOAST_CLEAR'
export const TOAST_CLEAR_ALL = 'TOAST_CLEAR_ALL'
export const TOAST_TEST_MESSAGE = 'TOAST_TEST_MESSAGE'

// Reader: Client API
export const READ_ITEM_REQUEST = 'READ_ITEM_REQUEST'
export const READ_ITEM_SUCCESS = 'READ_ITEM_SUCCESS'
export const READ_ITEM_FAILURE = 'READ_ITEM_FAILURE'

export const READ_SET_HIGHLIGHTS = 'READ_SET_HIGHLIGHTS'

export const HIGHLIGHT_SAVE_REQUEST = 'HIGHLIGHT_SAVE_REQUEST'
export const HIGHLIGHT_SAVE_SUCCESS = 'HIGHLIGHT_SAVE_SUCCESS'
export const HIGHLIGHT_SAVE_FAILURE = 'HIGHLIGHT_SAVE_FAILURE'

export const HIGHLIGHT_DELETE_REQUEST = 'HIGHLIGHT_DELETE_REQUEST'
export const HIGHLIGHT_DELETE_SUCCESS = 'HIGHLIGHT_DELETE_SUCCESS'
export const HIGHLIGHT_DELETE_FAILURE = 'HIGHLIGHT_DELETE_FAILURE'

// Reader: Settings
export const HYDRATE_DISPLAY_SETTINGS = 'HYDRATE_DISPLAY_SETTINGS'
export const UPDATE_LINE_HEIGHT = 'UPDATE_LINE_HEIGHT'
export const UPDATE_COLUMN_WIDTH = 'UPDATE_COLUMN_WIDTH'
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE'
export const UPDATE_FONT_TYPE = 'UPDATE_FONT_TYPE'
export const TOGGLE_READER_SIDEBAR = 'TOGGLE_READER_SIDEBAR'
export const READER_CLEAR_DELETION = 'READER_CLEAR_DELETION'
export const PINNED_TOPICS_SET = 'PINNED_TOPICS_SET'

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

// Share
export const SHARE_REQUEST = 'SHARE_REQUEST'
export const SHARE_CANCEL = 'SHARE_CANCEL'
export const SHARE_MASTODON = 'SHARE_MASTODON'

// ITEMS
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'
export const ITEMS_UPDATE = 'ITEMS_UPDATE'

// SAVED ITEMS (GraphQL as source)
export const ITEMS_SAVED_REQUEST = 'ITEMS_SAVED_REQUEST'
export const ITEMS_SAVED_SUCCESS = 'ITEMS_SAVED_SUCCESS'
export const ITEMS_SAVED_FAILURE = 'ITEMS_SAVED_FAILURE'
export const ITEMS_UPSERT_SUCCESS = 'ITEMS_UPSERT_SUCCESS'
export const ITEMS_UPSERT_INJECT = 'ITEMS_UPSERT_INJECT'

export const ITEMS_SAVED_UPDATE_REQUEST = 'ITEMS_SAVED_UPDATE_REQUEST'
export const ITEMS_SAVED_UPDATE_SUCCESS = 'ITEMS_SAVED_UPDATE_SUCCESS'
export const ITEMS_SAVED_UPDATE_FAILURE = 'ITEMS_SAVED_UPDATE_FAILURE'

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
export const MUTATION_REFRESH= 'MUTATION_REFRESH'

export const MUTATION_SUCCESS = 'MUTATION_SUCCESS'
export const MUTATION_FAILURE = 'MUTATION_FAILURE'

export const MUTATION_BULK_FAVORITE = 'MUTATION_BULK_FAVORITE'
export const MUTATION_BULK_UNFAVORITE = 'MUTATION_BULK_UNFAVORITE'
export const MUTATION_BULK_ARCHIVE = 'MUTATION_BULK_ARCHIVE'
export const MUTATION_BULK_UNARCHIVE = 'MUTATION_BULK_UNARCHIVE'
export const MUTATION_BULK_RE_ADD = 'MUTATION_BULK_RE_ADD'
export const MUTATION_BULK_DELETE = 'MUTATION_BULK_DELETE'

export const MUTATION_BULK_CONFIRM = 'MUTATION_BULK_CONFIRM'
export const MUTATION_BULK_CANCEL = 'MUTATION_BULK_CANCEL'

export const MUTATION_BULK_SELECT = 'MUTATION_BULK_SELECT'
export const MUTATION_BULK_DESELECT = 'MUTATION_BULK_DESELECT'
export const MUTATION_BULK_CLEAR = 'MUTATION_BULK_CLEAR'
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
export const LOAD_PREVIOUS_ITEMS = 'LOAD_PREVIOUS_ITEMS'
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
export const USER_TAGS_UPDATE = 'USER_TAGS_UPDATE'

// LISTS ITEMS
export const LIST_CHECK_PILOT_STATUS_REQUEST = 'LIST_CHECK_PILOT_STATUS_REQUEST'
export const LIST_CHECK_PILOT_STATUS_SUCCESS = 'LIST_CHECK_PILOT_STATUS_SUCCESS'
export const LIST_CHECK_PILOT_STATUS_FAILURE = 'LIST_CHECK_PILOT_STATUS_FAILURE'

export const LIST_PAGE_SET_SORT_ORDER_REQUEST = 'LIST_PAGE_SET_SORT_ORDER_REQUEST'
export const LIST_PAGE_SET_SORT_ORDER = 'LIST_PAGE_SET_SORT_ORDER'

export const LIST_CREATE_REQUEST = 'LIST_CREATE_REQUEST'
export const LIST_CREATE_CONFIRM = 'LIST_CREATE_CONFIRM'
export const LIST_CREATE_CANCEL = 'LIST_CREATE_CANCEL'
export const LIST_CREATE_FAILURE = 'LIST_CREATE_FAILURE'
export const LIST_CREATE_SUCCESS = 'LIST_CREATE_SUCCESS'

export const LIST_BULK_CREATE_REQUEST = 'LIST_BULK_CREATE_REQUEST'

export const LIST_ALL_REQUEST = 'LIST_ALL_REQUEST'
export const LIST_ALL_REQUEST_SUCCESS = 'LIST_ALL_REQUEST_SUCCESS'
export const LIST_ALL_REQUEST_FAILURE = 'LIST_ALL_REQUEST_FAILURE'

export const LIST_INDIVIDUAL_REQUEST = 'LIST_INDIVIDUAL_REQUEST'
export const LIST_INDIVIDUAL_SUCCESS = 'LIST_INDIVIDUAL_SUCCESS'
export const LIST_INDIVIDUAL_FAILURE = 'LIST_INDIVIDUAL_FAILURE'

export const LIST_RECENT_REQUEST = 'LIST_RECENT_REQUEST'
export const LIST_RECENT_SUCCESS = 'LIST_RECENT_SUCCESS'
export const LIST_RECENT_FAILURE = 'LIST_RECENT_FAILURE'

export const LIST_ITEMS_SUCCESS = 'LIST_ITEMS_SUCCESS'
export const LIST_ITEMS_UPDATE = 'LIST_ITEMS_UPDATE'
export const LIST_ITEMS_SET_NO_IMAGE = 'LIST_ITEMS_SET_NO_IMAGE'

export const LIST_ADD_ITEM_REQUEST = 'LIST_ADD_ITEM_REQUEST'
export const LIST_ADD_ITEM_CONFIRM = 'LIST_ADD_ITEM_CONFIRM'
export const LIST_ADD_ITEM_CANCEL = 'LIST_ADD_ITEM_CANCEL'
export const LIST_ADD_ITEM_SUCCESS = 'LIST_ADD_ITEM_SUCCESS'
export const LIST_ADD_ITEM_FAILURE = 'LIST_ADD_ITEM_FAILURE'

export const LIST_BULK_ADD_ITEM_REQUEST = 'LIST_BULK_ADD_ITEM_REQUEST'

export const LIST_DELETE_ITEM_REQUEST = 'LIST_DELETE_ITEM_REQUEST'
export const LIST_DELETE_ITEM_SUCCESS = 'LIST_DELETE_ITEM_SUCCESS'
export const LIST_DELETE_ITEM_FAILURE = 'LIST_DELETE_ITEM_FAILURE'

export const LIST_UPDATE_REQUEST = 'LIST_UPDATE_REQUEST'
export const LIST_UPDATE_CONFIRM = 'LIST_UPDATE_CONFIRM'
export const LIST_UPDATE_CANCEL = 'LIST_UPDATE_CANCEL'
export const LIST_UPDATE_SUCCESS = 'LIST_UPDATE_SUCCESS'
export const LIST_UPDATE_FAILURE = 'LIST_UPDATE_FAILURE'

export const LIST_UPDATE_STATUS_REQUEST = 'LIST_UPDATE_STATUS_REQUEST'
export const LIST_UPDATE_STATUS_SUCCESS = 'LIST_UPDATE_STATUS_SUCCESS'
export const LIST_UPDATE_STATUS_FAILURE = 'LIST_UPDATE_STATUS_FAILURE'

export const LIST_ITEM_ADD_NOTE_REQUEST = 'LIST_ITEM_ADD_NOTE_REQUEST'
export const LIST_ITEM_ADD_NOTE_CONFIRM = 'LIST_ITEM_ADD_NOTE_CONFIRM'
export const LIST_ITEM_ADD_NOTE_CANCEL = 'LIST_ITEM_ADD_NOTE_CANCEL'
export const LIST_ITEM_ADD_NOTE_SUCCESS = 'LIST_ITEM_ADD_NOTE_SUCCESS'
export const LIST_ITEM_ADD_NOTE_FAILURE = 'LIST_ITEM_ADD_NOTE_FAILURE'

export const LIST_ITEM_EDIT_NOTE_REQUEST = 'LIST_ITEM_EDIT_NOTE_REQUEST'
export const LIST_ITEM_EDIT_NOTE_SUCCESS = 'LIST_ITEM_EDIT_NOTE_SUCCESS'
export const LIST_ITEM_EDIT_NOTE_FAILURE = 'LIST_ITEM_EDIT_NOTE_FAILURE'

export const LIST_ITEMS_REORDER_REQUEST = 'LIST_ITEMS_REORDER_REQUEST'
export const LIST_ITEMS_REORDER_SUCCESS = 'LIST_ITEMS_REORDER_SUCCESS'
export const LIST_ITEMS_REORDER_FAILURE = 'LIST_ITEMS_REORDER_FAILURE'

export const LIST_DELETE_REQUEST = 'LIST_DELETE_REQUEST'
export const LIST_DELETE_CONFIRM = 'LIST_DELETE_CONFIRM'
export const LIST_DELETE_CANCEL = 'LIST_DELETE_CANCEL'
export const LIST_DELETE_SUCCESS = 'LIST_DELETE_SUCCESS'
export const LIST_DELETE_FAILURE = 'LIST_DELETE_FAILURE'

export const LIST_ITEM_NOTE_DELETE_REQUEST = 'LIST_ITEM_NOTE_DELETE_REQUEST'
export const LIST_ITEM_NOTE_DELETE_CONFIRM = 'LIST_ITEM_NOTE_DELETE_CONFIRM'
export const LIST_ITEM_NOTE_DELETE_CANCEL = 'LIST_ITEM_NOTE_DELETE_CANCEL'
export const LIST_ITEM_NOTE_DELETE_SUCCESS = 'LIST_ITEM_NOTE_DELETE_SUCCESS'
export const LIST_ITEM_NOTE_DELETE_FAILURE = 'LIST_ITEM_NOTE_DELETE_FAILURE'

export const LIST_SHARE_REQUEST = 'LIST_SHARE_REQUEST'
export const LIST_SHARE_CANCEL = 'LIST_SHARE_CANCEL'
export const LIST_SHARE_MASTODON = 'LIST_SHARE_MASTODON'
