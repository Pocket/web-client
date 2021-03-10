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

export const getRecommendations = (itemId, count = 3) => {
  const lang = 'en' // Gotta be a good way to pass this in
  return request({
    path: 'v3/discover/recIt',
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId, // resolved_id
      locale_lang: lang,
      count,
      module: 'after_article_web'
    }),
    auth: true
  })
}

export const getHomeRecommendations = (itemId, count = 4) => {
  const lang = 'en' // Gotta be a good way to pass this in
  return request({
    path: 'v3/discover/recIt',
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId, // resolved_id
      locale_lang: lang,
      count,
      module: 'home_web'
    }),
    auth: true
  })
}
