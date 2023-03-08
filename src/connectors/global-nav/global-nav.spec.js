import { enforceDefaultAvatar } from './global-nav'

describe('GlobalNavAvatar', () => {
  xit('returns an empty string when passed a default avatar url we want to override', () => {
    expect(enforceDefaultAvatar('https://mydomain.com/profile-images/profileBlue.png')).toBe('')
  })

  xit('passes through the avatar url, when that url contains no substring in the disallowed list', () => {
    const validUrl = 'https://mydomain.com/profile-images/good-times.jpg'

    expect(enforceDefaultAvatar(validUrl)).toBe(validUrl)
  })

  xit('handles null and undefined by providing an empty string', () => {
    expect(enforceDefaultAvatar(null)).toBe('')
    expect(enforceDefaultAvatar(undefined)).toBe('')
  })
})
