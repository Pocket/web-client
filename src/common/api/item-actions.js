import { request } from 'common/utilities/request/request'

/**
 * Save a url to your pocket account
 */
export const sendItemActions = (actions) => {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({ actions, locale_lang: 'en-US' }),
    params: {},
    auth: true
  })
}
