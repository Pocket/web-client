import { request } from 'common/utilities/request/request'

/**
 * Save a url to your pocket account
 */
export const saveItem = (url, analytics) => {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'add', url, ...analytics }]
    }),
    auth: true
  })
}

/**
 * Save a collection of URLs
 */
export const saveItems = (urls) => {
  const actions = urls.map((url) => ({
    action: 'add',
    url
  }))

  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({ actions }),
    auth: true
  })
}
