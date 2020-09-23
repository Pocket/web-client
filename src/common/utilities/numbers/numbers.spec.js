import assert from 'assert'
import { numberWithCommas } from 'common/utilities'

describe('numberWithCommas', function () {
  it('returns a US formatted number with commas', function () {
    const number = numberWithCommas(1000000000000)

    assert.strictEqual(number, '1,000,000,000,000')
  })
})
