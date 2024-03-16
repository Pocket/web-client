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
