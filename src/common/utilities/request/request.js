import queryString from 'query-string'
import { CONSUMER_KEY, API_URL } from 'common/constants'

/**
 * @param {Object} requestInfo Information about the request
 * @param {Object={}} requestInfo.params Additional params to pass through
 * @param {string} requestInfo.path The endpoint to hit
 * @param {string=GET} requestInfo.method Request method to use
 */
export const request = ({
  params = {},
  path,
  method = 'GET',
  body,
  cookie,
  auth
}) => {
  const queryParams = queryString.stringify({
    ...params,
    consumer_key: CONSUMER_KEY,
    enable_cors: 1
  })

  const endpoint = `${API_URL}/${path}?${queryParams}`

  const headers = {
    Origin: 'https://getpocket.com',
    'User-Agent': `Pocket;web;client;${process.env.BUILD_ID}`
  }

  if (cookie) headers.Cookie = cookie

  // The Promise returned from fetch() won’t reject on HTTP error status even if
  // the response is an HTTP 404 or 500. Instead, it will resolve normally
  // (with ok status set to false), and it will only reject on network failure
  // or if anything prevented the request from completing.
  // To that end, we catch errors here to pass them on without malformed
  // json parsing errors
  return fetch(endpoint, {
    method,
    headers,
    body,
    credentials: 'include'
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
