/**
 * Get the latest client version
 */
export function getClientVersion() {
  const path = `/web-client-api/getClientVersion`
  return fetch(path)
    .then((response) => response.json())
    .catch((error) => error)
}
