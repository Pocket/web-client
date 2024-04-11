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
export function arrayToObject<T extends Record<K, any>, K extends string>(
  objectArray: Array<Partial<T> | object>, // Use Partial<T> or object to allow flexibility
  key: K
): Record<string, T> {
  const result: Record<string, T> = {}
  objectArray.forEach((item) => {
    if (typeof item === 'object' && item !== null && key in item) {
      const keyValue = (item as T)[key]
      if (
        keyValue !== undefined &&
        (typeof keyValue === 'string' || typeof keyValue === 'number')
      ) {
        result[keyValue] = item as T
      }
    }
  })
  return result
}
