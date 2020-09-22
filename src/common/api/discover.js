import { request } from './request'

/**
 * Get the explore home feed
 */
export const getExploreFeed = () => {
  return request({
    path: '/discover',
    data: {
      count: 20
    }
  })
}
