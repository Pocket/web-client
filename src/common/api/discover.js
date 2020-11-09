import { request } from 'common/utilities/request/request'

/**
 * Get the explore home feed
 */
export const getDiscoverFeed = (ssr) => {
  return request({
    path: 'v3/discover',
    ssr,
    params: {
      count: 20
    }
  })
}
