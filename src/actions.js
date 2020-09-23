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
