import dayjs from 'dayjs'
import { getPublishedDate } from 'common/utilities/date-time/date-time'
import { timeRelativeToNow } from 'common/utilities/date-time/date-time'

describe('getPublishedDate', () => {
  it('returns a properly formatted date', () => {
    const timestamp = '4/1/2019'
    const publishedDate = getPublishedDate(timestamp)

    expect(publishedDate).toBe('April 1, 2019')
  })
})

describe('timeRelativeToNow', () => {
  it('less than an hour ago', () => {
    const timestamp = dayjs().subtract(45, 'minute')
    const timeFromNow = timeRelativeToNow(timestamp)
    expect(timeFromNow).toBe('Less than an hour ago')
  })

  it('exactly one hour', () => {
    const timestamp = dayjs().subtract(60, 'minute')
    const timeFromNow = timeRelativeToNow(timestamp)
    expect(timeFromNow).toBe('1 hour ago')
  })

  it('hours ago', () => {
    const howLongAgo = 6
    const timestamp = dayjs().subtract(howLongAgo, 'hour')
    const timeFromNow = timeRelativeToNow(timestamp)
    expect(timeFromNow).toBe(`${howLongAgo} hours ago`)
  })

  it('14 day time window', () => {
    const howLongAgo = 24 * 12 // 12 days
    const timestamp = dayjs().subtract(howLongAgo, 'hour')
    const timeFromNow = timeRelativeToNow(timestamp)
    expect(timeFromNow).toBe(`${howLongAgo / 24} days ago`)
  })

  it('pure date', () => {
    const timestamp = dayjs().subtract(6, 'month')
    const timeFromNow = timeRelativeToNow(timestamp)
    expect(timeFromNow).toBe(timestamp.format('MMM D, YYYY'))
  })
})
