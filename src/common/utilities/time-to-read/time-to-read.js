import { READING_WPM } from 'common/constants'

function timeDisplay(timeInMinutes, abbr) {
  const timeType = abbr ? 'min' : 'minute'
  return `${timeInMinutes} ${timeType}`
}

function getReadTime(word_count, abbr) {
  if (typeof parseInt(word_count) !== 'number') return null

  const timeInMinutes = Math.round(parseInt(word_count, 10) / READING_WPM)
  if (timeInMinutes < 1) return null
  return timeDisplay(timeInMinutes, abbr)
}

function getWatchTime(videos, abbr) {
  const timeInSeconds = videos ? videos[Object.keys(videos)[0]].length || 0 : 0

  if (typeof parseInt(timeInSeconds) !== 'number') return null

  if (timeInSeconds < 60) return null
  const timeInMinutes = Math.round(timeInSeconds / 60)
  return timeDisplay(timeInMinutes, abbr)
}

export function getTimeToRead({ word_count, has_video, videos }, abbr) {
  const isVideo = has_video === '2'
  return isVideo ? getWatchTime(videos, abbr) : getReadTime(word_count, abbr)
}
