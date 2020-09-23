import { request } from 'common/utilities/request/request'

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
