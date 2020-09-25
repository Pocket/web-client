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
