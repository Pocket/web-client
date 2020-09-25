import { request } from 'common/utilities/request/request'

/**
 * Get the explore home feed
 */
export const getDiscoverFeed = () => {
  return request({
    path: 'v3/discover',
    params: {
      count: 20
    }
  })
}
