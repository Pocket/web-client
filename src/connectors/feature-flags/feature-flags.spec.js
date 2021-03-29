import assert from 'assert'

import { isOldEnough } from './feature-flags.state'
import { isNewUser } from './feature-flags.state'

describe('Feature Flags', () => {
  describe('isNewUser', function () {
    it('returns false if birth is before start', function () {
      const start = '2021-03-22 19:30:00'
      const birth = '2021-03-21 19:30:00'
      const eligible = isNewUser({ start, birth })
      assert.ok(!eligible)
    })

    it('returns true if start is before birth', function () {
      const birth = '2021-03-22 19:30:00'
      const start = '2021-03-21 19:30:00'
      const eligible = isNewUser({ start, birth })
      assert.ok(eligible)
    })
  })

  describe('isOldEnough', function () {
    it('returns false if account is not old enough', function () {
      const start = '2021-03-22 19:30:00'
      const birth = '2021-03-21 19:30:00'
      const accountAge = 7 // in days
      const eligible = isOldEnough({ start, birth, accountAge })
      assert.ok(!eligible)
    })

    it('returns true account is older than offset', function () {
      const start = '2021-03-22 19:30:00'
      const birth = '2020-03-22 19:30:00'
      const accountAge = 364 // in days
      const eligible = isOldEnough({ start, birth, accountAge })
      assert.ok(eligible)
    })
  })
})
