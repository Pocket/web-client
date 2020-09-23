import assert from 'assert'
import { getPublishedDate } from 'common/utilities'

describe('getPublishedDate', function () {
  it('returns a properly formatted date', function () {
    const timestamp = '4/1/2019'
    const publishedDate = getPublishedDate(timestamp)

    assert.strictEqual(publishedDate, 'April 1, 2019')
  })
})
