import { format } from 'date-fns'
import { useEffect, useLayoutEffect } from 'react'

/**
 * URL WITH POCKET REDIRECT
 * @param {string} url Url to be wrapped in a pocket redirect
 */
export function urlWithPocketRedirect(url) {
  return `https://getpocket.com/redirect?url=${encodeURIComponent(url)}`
}

/**
 * GET IMAGE CACHE URL
 * @param {string} url Url of image we want to get from the image cache
 * @param {object} imageSize {width:value, height:value} @optional
 */
export function getImageCacheUrl(url, imageSize) {
  if (!url) return
  const { width = '', height = '' } = imageSize || {}
  const resizeParam = imageSize ? `${width}x${height}` : ''
  const encodedURL = encodeURIComponent(url.replace(/'/g, '%27'))
  const urlParam = `${encodedURL}`
  const cacheURL = 'https://pocket-image-cache.com' //direct'
  return `${cacheURL}/${resizeParam}/filters:no_upscale():format(jpg):extract_cover()/${urlParam}`
}

/**
 * GET PUBLISHED DATE
 * @param {unix timestamp} publishedAt Timestamp from the server
 */
export function getPublishedDate(publishedAt = null) {
  return format(new Date(publishedAt), 'MMMM d, yyyy')
}

/**
 * GET CURRENT UNIX TIME
 */
export function getCurrentUnixTime() {
  return Math.floor(Date.now() / 1000)
}

/**
 * NUMBER WITH COMMAS
 * @param {integer} num Number to add commas to for display
 */
export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * ARRAY TO OBJECT
 * Takes an array of objects and a key to look for inside those objects which
 * will be used as an identifier.  It builds a new parent object with each object
 * from the array as the value of the specified identifier:
 *
 * @example:
 * const arrayOfObjects = [{id: 'abcd123', data: 'something'}, {id: 'efg456', data: 'nothing'}]
 * arrayToObject(arrayOfObjects, id)
 *
 * returns: {
 *  abcd123: {id: 'abcd123', data: 'something'},
 *  efg456: {id: 'efg456', data: 'nothing'}
 * }
 *
 * @param {array} objectArray Array of objects
 * @param {string} key Name of key to use when converting to keyed object
 * @returns {object}: {key: {...}}
 */
export function arrayToObject(objectArray, key) {
  var arrayObject = {}
  for (var i = 0; i < objectArray.length; ++i) {
    if (objectArray[i] !== undefined && objectArray[i][key]) {
      arrayObject[objectArray[i][key]] = objectArray[i]
    }
  }
  return arrayObject
}

/**
 * DOMAIN FOR URL
 * Get the base domain for a given url
 * @param {url} url Url to get domain from
 * @return {string} parsed domain
 */
export function domainForUrl(url) {
  if (!url) return false
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
  )

  return match[1]
}

/**
 *  VALUE FROM COOKIE
 *  Get a value from a cookie, given a key
 * @param key {string} - the key to search the cookie for corresponding value
 * @param cookie {string} - the cookie which may contain the key
 * @returns {string|undefined|boolean} the value of the key in cookie, if it exists. Otherwise, undefined
 */
export function getValueFromCookie(key, cookie) {
  if (!cookie) return false

  return cookie
    ?.split('; ')
    ?.find((row) => row.startsWith(key))
    ?.split('=')[1]
}

const hasValue = (value) =>
  !(value === undefined || value === null || value === '')

/**
 *
 * @param o {object} - Object to filter
 * @param validatorFn - validator function that returns true or false whether a value is valid defaults to emptyCheck() above.
 * @returns {object} - object with only valid keys
 */
export function getObjectWithValidKeysOnly(o, validatorFn = hasValue) {
  return Object.keys(o).reduce((validObject, nextKey) => {
    const value = o[nextKey]

    if (validatorFn(value)) {
      return {
        ...validObject,
        [nextKey]: value
      }
    }

    return validObject
  }, {})
}

/**
 * Redirect server side requests in getInitialProps
 * @param {obj} res Response Object
 * @param {string} path location you wish to redirect to
 * @param {int} httpCode http code to pass on in the response
 */
export function redirect(res, path, httpCode = 301) {
  if (res) {
    res.writeHead(httpCode, { Location: path })
    res.end()
  }
  return {}
}

/**
 * UseLayout effect is required for SSR and useEffect is used client side
 * This function just picks the correct function based on existence of
 * `window` since that is not present in node
 */
const useCorrectEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useCorrectEffect
