import dayjs from 'dayjs'

/**
 * GET PUBLISHED DATE
 * @param {unix timestamp} publishedAt Timestamp from the server
 */
export function getPublishedDate(publishedAt = null) {
  const date = new Date(publishedAt)
  return dayjs(date).format('MMMM D, YYYY')
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
  const timestamp = dayjs(val)
  const diff = now.diff(timestamp, 'hours')

  if (diff < 1) {
    return 'Less than an hour ago'
  } else if (diff === 1) {
    return `${diff} hour ago`
  } else if (diff < 24) {
    const date = diff
    return `${date} hours ago`
  } else if (diff < 24 * 14) {
    // 14 days
    const date = Math.round(diff / 24)
    return `${date} days ago`
  }

  const date = timestamp.format('MMM D, YYYY')
  return `${date}`
}

export function getTimeOfDay() {
  var morning = 4 // 4am
  var afternoon = 12 // noon
  var evening = 17 // 5pm
  var currentHour = parseFloat(dayjs().format('HH'))

  if (currentHour >= morning && currentHour < afternoon) {
    return 'morning'
  }
  else if (currentHour >= afternoon && currentHour < evening) {
    return 'afternoon'
  }
  return 'evening'
}
