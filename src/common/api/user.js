import { request } from 'common/utilities/request/request'

/**
 * create a new session guid
 */
export const createGuid = async () => {
  return request({
    path: '/guid'
  }).then(({ guid }) => guid)
}

/**
 * Get a user's information	server side
 */
export const getUserInfo = (cookie) => {
  const params = { hash: '9dJDjsla49la' }
  const path = '/v3/getuser'
  return request({ params, path })
}
