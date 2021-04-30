import { INTERNAL_DOMAINS } from 'common/constants'
import { CONTENT_OPEN_DESTINATION_INTERNAL } from './content-open'
import { CONTENT_OPEN_DESTINATION_EXTERNAL } from './content-open'

export const getLinkOpenTarget = (link, isSyndicated = false) => {
  const isInternalRead = /^\/read\/[\w\d]+/.test(link)
  const targetURL = isInternalRead ? `https://getpocket.com${link}` : link
  const url = new URL(targetURL)
  const isInternal = INTERNAL_DOMAINS.includes(url.hostname)

  if (isSyndicated) return CONTENT_OPEN_DESTINATION_INTERNAL
  if (isInternal) return CONTENT_OPEN_DESTINATION_INTERNAL

  return CONTENT_OPEN_DESTINATION_EXTERNAL
}
