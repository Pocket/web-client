import { useEffect, useLayoutEffect } from 'react'

/**
 * UseLayout effect is required for SSR and useEffect is used client side
 * This function just picks the correct function based on existence of
 * `window` since that is not present in node
 */
export const useCorrectEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
