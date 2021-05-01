import queryString from 'query-string'
import { CONSUMER_KEY } from 'common/constants'
import { GRAPHQL_URL } from 'common/constants'
import { API_URL } from 'common/constants'

/**
 * @param {Object} requestInfo Information about the request
 * @param {Object={}} requestInfo.params Additional params to pass through
 * @param {string} requestInfo.path The endpoint to hit
 * @param {string=GET} requestInfo.method Request method to use
 */
export const request = ({
  api_url = API_URL,
  params = {},
  path,
  method = 'GET',
  body,
  auth,
  ssr,
  cookie
}) => {
  const credentials = 'include'
  const apiToUse = api_url

  /**
   * Build a full url with properly appended query params
   * @param enable_cors {num} This tells the web server to use cookies vs oAuth
   * @param consumer_key {string} This is specific to the web-client
   */
  const queryParams = queryString.stringify({
    ...params,
    enable_cors: 1,
    consumer_key: CONSUMER_KEY
  })
  const endpoint = `${apiToUse}/${path}?${queryParams}`

  /**
   * Set proper headers for the request
   * @option clientHeaders - These make sure our response is returned in JSON
   *
   * @option ssrHeaders - These append a passed in cookie and origin since
   * that  is not set automatically on the server
   */
  const clientHeaders = {
    'Content-Type': 'application/json',
    'X-Accept': 'application/json; charset=UTF8'
  }
  const ssrHeaders = { Cookie: cookie, Origin: 'https://getpocket.com' }
  const headers = ssr ? ssrHeaders : clientHeaders

  // The Promise returned from fetch() won’t reject on HTTP error status even if
  // the response is an HTTP 404 or 500. Instead, it will resolve normally
  // (with ok status set to false), and it will only reject on network failure
  // or if anything prevented the request from completing.
  // To that end, we catch errors here to pass them on without malformed
  // json parsing errors
  return fetch(endpoint, {
    credentials,
    method,
    headers,
    body
  })
    .then((response) => handleErrors(response, auth))
    .then((response) => response.json())
    .catch((error) => error)
}

function handleErrors(response, auth) {
  if (!auth) return response

  // On a bad request we should reject the promise and pass on the status
  if (!response.ok) return Promise.reject({ xErrorCode: response.status })

  // If we have an x-error we should reject and pass on the codes
  const xErrorCode = response.headers.get('x-error-code')
  const xError = response.headers.get('x-error')
  if (xErrorCode) return Promise.reject({ xErrorCode, xError })

  // If all else we re returning the response to be parsed
  return response
}

export const requestGQL = (data) => {
  return request({
    api_url: GRAPHQL_URL,
    path: 'graphql',
    method: 'POST',
    body: JSON.stringify(data)
  })
}
