import { numberWithCommas } from 'common/utilities'

describe('numberWithCommas', () => {
  it('returns a US formatted number with commas', () => {
    const number = numberWithCommas(1000000000000)
    expect(number).toBe('1,000,000,000,000')
  })
})
