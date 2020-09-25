import { request } from 'common/utilities/request/request'

export const getPublisherRecs = (itemId) => {
  return request({
    path: `v3/recit/module/syndicated_publisher/${itemId}`
  })
}

export const getPocketRecs = (itemId) => {
  return request({
    path: `v3/recit/module/syndicated_article/${itemId}`
  })
}
