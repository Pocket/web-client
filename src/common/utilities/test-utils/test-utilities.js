/**
 * Mock default event object that has some standard event things in it to prevent
 * handler functions from failing when simulating events
 * @type {Object}
 */
export const mockEvent = {
  target: {},
  preventDefault() {},
  stopPropagation() {}
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
      }
    }
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
