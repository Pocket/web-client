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
