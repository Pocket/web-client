export const getBrazeToken = (userId) => {
  const body = JSON.stringify({ userId })

  return fetch('/web-client-api/braze', { method: 'POST', body })
    .then(response => response.json())
}
