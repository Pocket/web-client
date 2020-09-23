import { format } from 'date-fns'

/**
 * GET PUBLISHED DATE
 * @param {unix timestamp} publishedAt Timestamp from the server
 */
export function getPublishedDate(publishedAt = null) {
  return format(new Date(publishedAt), 'MMMM d, yyyy')
}

/**
 * GET CURRENT UNIX TIME
 */
export function getCurrentUnixTime() {
  return Math.floor(Date.now() / 1000)
}
