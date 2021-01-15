import queryString from 'query-string'
import { CONSUMER_KEY, API_URL, OAUTH_URL } from 'common/constants'
import { parseCookies } from 'nookies'
import crypto from 'crypto'
import { localStore } from 'common/utilities/browser-storage/browser-storage'

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
  ssr
}) => {
  const useOAuth = localStore.getItem('useOAuth') === 'true'
  // !! THIS TEMPORARY 12/14/2020
  // This is all meant to allow for feature branch auth via oAuth while keeping
  // cookie based auth on local dev and production
  // !! THIS SHOULD BE REMOVED IN 2077 When auth is fixed
  const oAuthParameters = useOAuth ? generateOAuthParameters(auth) : {}
  const credentials = useOAuth ? 'omit' : 'include'
  const apiToUse = useOAuth ? OAUTH_URL : api_url

  const corsParameters = {}
  if (!ssr) corsParameters.enable_cors = 1

  const queryParams = queryString.stringify({
    ...params,
    ...corsParameters,
    consumer_key: CONSUMER_KEY,
    ...oAuthParameters
  })

  const endpoint = `${apiToUse}/${path}?${queryParams}`

  const headers = {
    Origin: 'https://getpocket.com',
    'Content-Type': 'application/json',
    'X-Accept': 'application/json; charset=UTF8'
  }

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

function generateOAuthParameters(auth) {
  if (!auth || !document) return {}
  const cookies = parseCookies()
  const { pkt_access_token } = cookies

  if (!pkt_access_token) return {}

  const salt = 'It will take more than a doctor to prescribe a remedy'
  const oauth_timestamp = Date.now()
  const oauth_nonce = randomAlphaNumeric(16)
  const sig = oauth_timestamp + oauth_nonce + pkt_access_token + salt
  const sig_hash = crypto.createHash('md5').update(sig).digest('hex')

  return {
    access_token: pkt_access_token,
    oauth_timestamp,
    oauth_nonce,
    sig_hash
  }
}

function randomAlphaNumeric(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
