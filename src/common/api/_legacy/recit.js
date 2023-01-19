import { request } from 'common/utilities/request/request'

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

export const getHomeRecommendations = (itemId, count = 6) => {
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
