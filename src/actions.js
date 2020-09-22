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
