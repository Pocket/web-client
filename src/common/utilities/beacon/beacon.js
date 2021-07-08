import queryString from 'query-string'

export const API_URL = process.env.POCKET_API_URL
  ? process.env.POCKET_API_URL
  : 'https://getpocket.com/v3'

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
      consumer_key: consumerKey
    },
    { arrayFormat: 'bracket' }
  )

  const urlWithoutOriginalParams = options.path.split('?')[0]
  const fullUrl = `${API_URL}${urlWithoutOriginalParams}?${fullParams}`

  return fullUrl
}
