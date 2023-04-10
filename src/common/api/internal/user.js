export async function getUser(access_token) {
  // Are we in production?
  const isDev = process.env.NODE_ENV !== 'production'

  // !! DANGER: If we are not in production ignore ssl errors
  // !! DO NOT MERGE WITH THIS LINE UNCOMMENTED.
  // if (isDev) process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  // On dev we want to hit the non-rewritten api endpoin
  const path = isDev
    ? `https://localhost.web-client.getpocket.com/api/user?access_token=${access_token}`
    : `/web-client-api/user?access_token=${access_token}`

  return fetch(path).then((response) => response.json())
}
