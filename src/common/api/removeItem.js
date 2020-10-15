import { request } from 'common/utilities/request/request'

/**
 * Delete an item from your pocket account
 */
export const removeItem = (item_id) => {
  return request({
    path: 'v3/send',
    params: {
      actions: [{ action: 'delete', item_id }]
    },
    auth: true
  })
}
