import assert from 'assert'

import { enforceDefaultAvatar } from './global-nav'

describe('GlobalNavAvatar', () => {
  it('returns an empty string when passed a default avatar url we want to override', () => {
    assert.equal(enforceDefaultAvatar('https://mydomain.com/profile-images/profileBlue.png'), '')
  })

  it('passes through the avatar url, when that url contains no substring in the disallowed list', () => {
    const validUrl = 'https://mydomain.com/profile-images/good-times.jpg'

    assert.equal(enforceDefaultAvatar(validUrl), validUrl)
  })

  it('handles null and undefined by providing an empty string', () => {
    assert.equal(enforceDefaultAvatar(null), '')
    assert.equal(enforceDefaultAvatar(undefined), '')
  })
})
