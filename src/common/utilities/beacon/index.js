import queryString from 'query-string'
import { request } from '../request'

export const API_URL = process.env.POCKET_API_URL
  ? process.env.POCKET_API_URL
  : 'https://getpocket.com/v3'

/**
 * sendBeacon implements navigator beacon if it's supported in order to send
 * analytics reliably on page changes
 * @param {string} consumerKey Consumer key passed in from the consuming app
 * @param {Object} options Details about the request (path and query params)
 */
export function sendBeacon(consumerKey, options) {
  if (!options?.path) {
    throw new Error('options.path is required by request()')
  }

  // If we don't support beacon we resort to an async fetch
  if (!navigator?.beacon) return blockingRequest(consumerKey, options)

  const url = buildBeaconUrl(consumerKey, options)
  navigator.sendBeacon(url)
}

/**
 * blockingRequest makes a fetch request synchronously
 * @param {string} consumerKey Consumer key passed in from the consuming app
 * @param {Object} options Details about the request (path and query params)
 */
const blockingRequest = async function (consumerKey, options) {
  await request(consumerKey, options)
}

/**
 * buildBeaconUrl Appends consumer_key to the url to identify app with the API.
 * Also converts payload to form supported by beacon
 * @param {string} consumerKey Consumer key passed in from the consuming app
 * @param {Object} options Details about the request (path and query params)
 */
export function buildBeaconUrl(consumerKey, options) {
  const postData = options?.data || {}
  const queryParams = queryString.parse(queryString.extract(options.path))
  const fullParams = queryString.stringify(
    {
      // preserve any existing params in the options.path
      ...queryParams,
      ...postData,
      consumer_key: consumerKey,
    },
    { arrayFormat: 'bracket' }
  )

  const urlWithoutOriginalParams = options.path.split('?')[0]
  const fullUrl = `${API_URL}${urlWithoutOriginalParams}?${fullParams}`

  return fullUrl
}
