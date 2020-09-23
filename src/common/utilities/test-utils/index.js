/**
 * Returns an object with a data attribute key with id value that can be used to
 * apply as a prop on an element. Use the object spread operator to apply to an
 * element, like <div {...testIdAttribute('foo')}>, which will result in the div
 * having an attribute data-test-id="foo". The object is only returned if the
 * environment is not prod. The data attribute can be used to identify elements
 * in our tests.
 * @param  {String} id  id for element
 * @return {Object}     Object where key is the data attribute name, and the
 *                      value is the id.
 */
export function testIdAttribute(id) {
  if (process.env.NODE_ENV === 'test' || process.env.SHOW_DEV === 'included') {
    return { 'data-test-id': id }
  }
  return undefined
}

/**
 * Given a test id, returns a CSS attribute selector which will find the element
 * with that id. Useful with enzyme's `find()` function, or cypress' `cy.get()`
 *
 * @param   {String}  id         Test id of the element, it's data-test-id attribute value.
 * @param   {String}  qualifier  Query qualifier: ^ = starts with, * = matches any, $ = ends with.
 *                               See document.querySelector API.
 *
 * @return  {String}             The formatted test id attribute for use as a DOM selector.
 *                               e.g. [data-test-id*="article-card-"] which will match any
 *                               test id beggining with "article-card-".
 */
export function testIdSelector(id, qualifier = '') {
  if (qualifier && !['^', '*', '$'].includes(qualifier)) {
    throw new Error(
      `used an invalid qualifier for testIdSelector: "${qualifier}" (from ${id})`
    )
  }
  return `[data-test-id${qualifier}="${id}"]`
}

/**
 * Mock default event object that has some standard event things in it to prevent
 * handler functions from failing when simulating events
 * @type {Object}
 */
export const mockEvent = {
  target: {},
  preventDefault() {},
  stopPropagation() {},
}

/**
 * Create a mock response object based on what the fetch API would pass to its
 * Promise resolution.
 *
 * @param   {Object}   data    Any data that would be returned as parsed JSON
 * @param   {Boolean}  isFail  Set to true to indicate it's a failed request, which
 *                             will provide appropriate response values
 *
 * @return  {Object}          Mock response object to pass to Promise resolution
 */
export function createMockFetchResponse(data, isFail = false) {
  const response = {
    headers: {
      get(headerName) {
        return this[headerName]
      },
    },
  }

  if (data) {
    response.json = () => {
      return data
    }
  }

  if (isFail) {
    response.ok = false
    response.statusText = 'fetch error status text'
  } else {
    response.ok = true
  }

  return response
}
