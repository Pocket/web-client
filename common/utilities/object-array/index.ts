// Define the output type as a record with string keys and T values
type ObjectMap<T> = Record<string, T>

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

export function arrayToObject<T>(objectArray: T[], key: keyof T): ObjectMap<T> {
  return objectArray.reduce((result, item) => {
    const keyValue = item[key]

    // Ensure the key exists and is a valid type (string or number)
    if (
      keyValue !== undefined &&
      keyValue !== null &&
      (typeof keyValue === 'string' || typeof keyValue === 'number')
    ) {
      result[String(keyValue)] = item
    }

    // Skip items without a valid key value
    return result
  }, {} as ObjectMap<T>)
}
