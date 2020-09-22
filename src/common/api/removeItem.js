import { requestWithAuth } from './request'

/**
 * Delete an item from your pocket account
 */
export const removeItem = (item_id) => {
  return requestWithAuth({
    path: '/send',
    data: {
      actions: [{ action: 'delete', item_id }]
    }
  })
}
