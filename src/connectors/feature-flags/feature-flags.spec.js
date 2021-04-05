import assert from 'assert'

import { checkActive } from './feature-flags.state'

describe('Feature Flags', () => {
  describe('checkActive', function () {
    it('returns false if not assigned', function () {
      const eligible = checkActive(false, null)
      assert.ok(!eligible)
    })

    it('returns true if assigned with no variant', function () {
      const eligible = checkActive(true, null)
      assert.ok(eligible)
    })

    it('returns false if assigned with control variant', function () {
      const eligible = checkActive(true, 'control')
      assert.ok(!eligible)
    })

    it('returns false if assigned with control-like variant', function () {
      const eligible = checkActive(true, 'control.v.1.1')
      assert.ok(!eligible)
    })

    it('returns true if assigned with non-control variant', function () {
      const eligible = checkActive(true, 'rainbowKittens')
      assert.ok(eligible)
    })
  })
})
