/**
 * Get a set of collections
 * @param {int} (optional @default 3) count Number of collection sets to return
 */
export function getCollectionSet(count = 3) {
  const path = `/web-client-api/getCollections?count=${count}`
  return fetch(path)
    .then((response) => response.json())
    .catch((error) => error)
}
