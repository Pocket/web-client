import { request } from 'common/utilities/request/request'

export function renameStoredTag({ new_tag, old_tag }) {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'tag_rename', new_tag, old_tag }]
    })
  }).then((response) => response)
}

export function deleteStoredTag(tag) {
  return request({
    path: 'v3/send',
    method: 'POST',
    body: JSON.stringify({
      actions: [{ action: 'tag_delete', tag }]
    }),
    auth: true
  }).then((response) => response)
}
