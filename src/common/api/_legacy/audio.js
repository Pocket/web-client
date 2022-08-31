import { request } from 'common/utilities/request/request'

// https://github.com/Pocket/spec/blob/v3/browse/docs/getItemAudio.md
export const getItemAudio = ({ itemId }) => {
  return request({
    path: 'v3/getItemAudio',
    params: {
      version: 2,
      itemId
    },
    auth: true
  })
}
