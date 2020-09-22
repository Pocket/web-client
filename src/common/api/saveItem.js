import { requestWithAuth } from './request'

/**
 * Save a url to your pocket account
 */
export const saveItem = (url, analytics) => {
  return requestWithAuth({
    path: '/send',
    data: {
      actions: [{ action: 'add', url, ...analytics }]
    }
  })
}
