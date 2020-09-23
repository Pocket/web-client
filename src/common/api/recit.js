import { request } from 'common/utilities/request/request'

export const getPublisherRecs = (itemId) => {
  return request({
    path: `/recit/module/syndicated_publisher/${itemId}`
  })
}

export const getPocketRecs = (itemId) => {
  return request({
    path: `/recit/module/syndicated_article/${itemId}`
  })
}
