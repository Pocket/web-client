import assert from 'assert'

import { checkActive } from './feature-flags.state'

describe('Feature Flags', () => {
  describe('checkActive', () => {
    it('returns false if not assigned', () => {
      const eligible = checkActive(false, null)
      assert.ok(!eligible)
    })

    it('returns true if assigned with no variant', () => {
      const eligible = checkActive(true, null)
      assert.ok(eligible)
    })

    it('returns false if assigned with control variant', () => {
      const eligible = checkActive(true, 'control')
      assert.ok(!eligible)
    })

    it('returns false if assigned with control-like variant', () => {
      const eligible = checkActive(true, 'control.v.1.1')
      assert.ok(!eligible)
    })

    it('returns true if assigned with non-control variant', () => {
      const eligible = checkActive(true, 'rainbowKittens')
      assert.ok(eligible)
    })
  })
})
