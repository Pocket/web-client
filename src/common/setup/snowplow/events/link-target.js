import { INTERNAL_DOMAINS } from 'common/constants'
import { CONTENT_OPEN_DESTINATION_INTERNAL } from './content-open'
import { CONTENT_OPEN_DESTINATION_EXTERNAL } from './content-open'

export const getLinkOpenTarget = (link, isSyndicated = false) => {
  const url = new URL(link)
  const isInternal = INTERNAL_DOMAINS.includes(url.hostname)

  if (isSyndicated) return CONTENT_OPEN_DESTINATION_INTERNAL
  if (isInternal) return CONTENT_OPEN_DESTINATION_INTERNAL

  return CONTENT_OPEN_DESTINATION_EXTERNAL
}
