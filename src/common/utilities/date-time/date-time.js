import { format } from 'date-fns'
import dayjs from 'dayjs'

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


export function timeRelativeToNow(val) {
  if (!val) {
    return null
  }

  const now = dayjs()
  const ts = dayjs(val)
  const diff = now.diff(ts, 'hours')

  if (diff < 1) {
    return 'Less than an hour ago'
  } else if (diff === 1) {
    return `${diff} hour ago`
  } else if (diff < 24) {
    let date = diff
    return `${date} hours ago`
  } else if (diff < 24 * 14) { // 14 days
    let date = diff
    return `${date} days ago`
  }

  let date = ts.format('MMM D, YYYY')
  return `${date}`
}
