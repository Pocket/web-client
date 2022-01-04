import { request } from 'common/utilities/request/request'

/**
 * create a new session guid
 */
export const createGuid = async () => {
  return request({
    path: 'v3/guid'
  })
}

/**
 * Get a user's information	server side
 */
export const getUserInfo = (ssr, cookie) => {
  const params = { hash: '9dJDjsla49la' }
  const path = 'v3/getuser'
  return request({ params, path, auth: true, ssr, cookie })
}
