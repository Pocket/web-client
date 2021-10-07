import { sendBeacon } from 'common/utilities/beacon'

const ANALYTICS_API_PATH = '/pv'

/**
 * Track an analytics event with a request to our in-house analytics API. This
 * API will soon be deprecated in favor of a third party platform, and so this
 * function should only be used for replicating existing tracking calls.
 *
 * @param   {String}  consumerKey     Consumer key that identifies the frontend app
 * @param   {Object|Array}  [params]  Optional key/value pairs to send as the event payload.
 *                                    Can be an object, or an array of objects for multiple events.
 *
 * @return  {Promise}                 Async call is returned as a promise
 */
export function legacyAnalyticsTrack(consumerKey, params) {
  let analyticsParams

  if (params) {
    if (Array.isArray(params)) {
      analyticsParams = { actions: params }
    } else if (typeof params === 'object') {
      // the analytics API expects an array so if we only received a single event
      // (params object), convert it to an array
      analyticsParams = { actions: [params] }
    }
  }

  const options = {
    path: ANALYTICS_API_PATH,
    data: analyticsParams
  }

  return sendBeacon(consumerKey, options)
}

export function gtagTrack() {}
