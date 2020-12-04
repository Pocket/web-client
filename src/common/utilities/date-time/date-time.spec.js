import assert from 'assert'
import dayjs from 'dayjs'
import { getPublishedDate, timeRelativeToNow } from 'common/utilities'

describe('getPublishedDate', function () {
  it('returns a properly formatted date', function () {
    const timestamp = '4/1/2019'
    const publishedDate = getPublishedDate(timestamp)

    assert.strictEqual(publishedDate, 'April 1, 2019')
  })
})

describe('timeRelativeToNow', function () {
  it('less than an hour ago', function () {
    const timestamp = dayjs().subtract(45, 'minute')

    const timeFromNow = timeRelativeToNow(timestamp)

    assert.strictEqual(timeFromNow, 'Less than an hour ago')
  })

  it('exactly one hour', function() {
    const timestamp = dayjs().subtract(60, 'minute')

    const timeFromNow = timeRelativeToNow(timestamp)

    assert.strictEqual(timeFromNow, '1 hour ago')
  })

  it('hours ago', function () {
    const howLongAgo = 6
    const timestamp = dayjs().subtract(howLongAgo, 'hour')

    const timeFromNow = timeRelativeToNow(timestamp)

    assert.strictEqual(timeFromNow, `${howLongAgo} hours ago`)
  })

  it('14 day time window', function () {
    const howLongAgo = 24 * 12 // 12 days
    const timestamp = dayjs().subtract(howLongAgo, 'hour')

    const timeFromNow = timeRelativeToNow(timestamp)

    assert.strictEqual(timeFromNow, `${howLongAgo} days ago`)
  })

  it('pure date', function () {
    const timestamp = dayjs().subtract(6, 'month')

    const timeFromNow = timeRelativeToNow(timestamp)

    assert.strictEqual(timeFromNow, timestamp.format('MMM D, YYYY'))
  })
})
