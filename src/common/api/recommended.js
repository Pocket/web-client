import { request } from 'common/utilities/request/request'

// https://github.com/Pocket/spec/blob/v3/browse/docs/getProfileFeed.md
export const getFeedByUser = (profile, count = 25, offset = 0) => {
  return request({
    path: 'v3/getProfileFeed',
    params: {
      version: 5,
      profile_key: profile,
      count,
      offset
    },
    auth: true
  })
}
