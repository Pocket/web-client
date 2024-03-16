export async function getUser(cookie) {
  // Are we in production?
  const isDev = process.env.NODE_ENV !== 'production'

  // !! DANGER: If we are not in production ignore ssl errors
  // if (isDev) process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  // Aboslute paths are required accordng to nextjs if they are not rewritten
  const path = isDev
    ? `https://localhost.web-client.getpocket.com/api/user`
    : `https://getpocket.com/web-client-api/user`

  return fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: { Cookie: cookie, Origin: 'https://getpocket.com' }
  }).then((response) => response.json())
}
