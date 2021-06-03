import { request } from 'common/utilities/request/request'

/**
 * Delete an item from your pocket account
 */
export const removeItem = (item_id) => {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'delete', item_id }]
    }),
    auth: true
  })
}

export const removeItemByUrl = (url) => {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'delete', url }]
    }),
    auth: true
  })
}
