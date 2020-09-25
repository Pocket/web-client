import { request } from 'common/utilities/request/request'

/**
 * Save a url to your pocket account
 */
export const saveItem = (url, analytics) => {
  return request({
    path: 'v3/send',
    params: {
      actions: [{ action: 'add', url, ...analytics }]
    },
    auth: true
  })
}
