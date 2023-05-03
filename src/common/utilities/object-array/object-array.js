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
  validatorFn = (value) => !(value === undefined || value === null || value === '')
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

export function arraysAreEqual(arrayOne, arrayTwo) {

  //If one is an array and the other is not they are not equal
  if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) return false

  // At this point they should both be arrays, let's check the contents
  const sortedArrayOne = arrayOne.sort()
  const sortedArrayTwo = arrayTwo.sort()

  const arraysContainTheSameValues =
    sortedArrayOne.length === sortedArrayTwo.length &&
    sortedArrayTwo.every((currentValue) => sortedArrayOne.includes(currentValue))

  return arraysContainTheSameValues
}

// Checks if a string exists in an array of strings regardless of letter casing
export function existsInArray(arr, val) {
  if (!Array.isArray(arr) || !val) return false

  return arr.some(name => name.toLowerCase() === val.toLowerCase())
}

// Reorders an array taking the item at the startIndex and moving it to the endIndex
// The original array is not modified
export function reorderArray(list, startIndex, endIndex) {
  if (startIndex === endIndex) return list
  if (startIndex < 0 || endIndex > list.length) return list

  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
