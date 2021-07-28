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
 *
 * @param o {object} - Object to filter
 * @param validatorFn - validator function that returns true or false whether a value is valid defaults to emptyCheck() above.
 * @returns {object} - object with only valid keys
 */
export function getObjectWithValidKeysOnly(
  o,
  validatorFn = (value) =>
    !(value === undefined || value === null || value === '')
) {
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
 * Chunk - Let's you divide an array into an array of chunks
 * Extracted from https://github.com/lodash/lodash/blob/master/chunk.js
 * NOTE: If we start using lodash more widely, we can pull this direct from there
 * @param {array} array Array of items
 * @param {int} size Size of chunks
 */
export function chunk(array, size = 1) {
  const safeSize = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || safeSize < 1) return []

  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / safeSize))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += safeSize))
  }
  return result
}

/** FILTER SETTINGS
 * Helper function to filter server settings to match keys defined in initialState
 * @param {object} settings Settings as they were returned from the server
 * @param {object} initialState Initial state of settings to compare to
 */
export const filterSettings = (settings, initialState) => {
  if (!settings) return {}

  return Object.keys(settings)
    .filter(key => Object.keys(initialState).includes(key))
    .reduce((newObj, key) => {
      newObj[key] = settings[key]
      return newObj
    }, {})
}
