import queryString from 'query-string'
import { request } from 'common/utilities/request/request'
import { flatten } from 'q-flat'
export const API_URL = 'https://getpocket.com/v3'

/**
 * sendBeacon implements navigator beacon if it's supported in order to send
 * analytics reliably on page changes
 * @param {string} consumerKey Consumer key passed in from the consuming app
 * @param {Object} options Details about the request (path and query params)
 * !! NOTE: This is an oversimplification and slight abuse of sendBeacon
 * !! We may not need sendBeacon in this instance due to the fact that we may
 * !! still have full focus and sendBeacon is meant to be used on visibility changes
 * !! NOT fixing this much at this point due to the fact that we are soon dumping
 * !! LegacyAnalytics on the whole and any additional legacy needs can be handled
 * !! in the relevant repo
 */
export function sendBeacon(consumerKey, options) {
  if (!options?.path) throw new Error('options.path is required by request()')

  try {
    const url = buildBeaconUrl(consumerKey, options)
    // https://dev.to/xg/you-may-not-know-beacon-9ba
    const send = navigator && navigator.sendBeacon.bind(navigator)

    if (!send) throw new Error('Send Beacon Unavailable')

    send(url)
  } catch (err) {
    blockingRequest(consumerKey, options)
  }
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
  const postData = flatten(options?.data) || {}
  const queryParams = queryString.parse(queryString.extract(options.path))
  const fullParams = queryString.stringify(
    {
      // preserve any existing params in the options.path
      ...queryParams,
      ...postData,
      consumer_key: consumerKey
    },
    { arrayFormat: 'bracket' }
  )

  const urlWithoutOriginalParams = options.path.split('?')[0]
  const fullUrl = `${API_URL}${urlWithoutOriginalParams}?${fullParams}`

  return fullUrl
}
