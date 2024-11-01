// Define a type for the key, ensuring it's a key of T
type KeyOfType<T> = keyof T

// Define a type for the array items, where T must have a key K of type string or number
type ArrayItem<T, K extends KeyOfType<T>> = Partial<T> & Record<K, string | number>

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
export function arrayToObject<T, K extends KeyOfType<T>>(
  objectArray: ArrayItem<T, K>[],
  key: K
): ObjectMap<T> {
  return objectArray.reduce((result, item) => {
    // Extract the key value from the current item
    const keyValue = item[key]

    // Ensure the key value is defined before adding to the result
    if (keyValue !== undefined) {
      // Use the key value as a string to index the result object
      result[String(keyValue)] = item as T
    }
    return result
  }, {} as ObjectMap<T>)
}
