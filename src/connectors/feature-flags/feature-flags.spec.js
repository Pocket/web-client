import { checkActive } from './feature-flags.state'

describe('Feature Flags', () => {
  describe('checkActive', () => {
    it('returns false if not assigned', () => {
      const eligible = checkActive(false, null)
      expect(eligible).toBeFalsy()
    })

    it('returns true if assigned with no variant', () => {
      const eligible = checkActive(true, null)
      expect(eligible).toBeTruthy()
    })

    it('returns false if assigned with control variant', () => {
      const eligible = checkActive(true, 'control')
      expect(eligible).toBeFalsy()
    })

    it('returns false if assigned with control-like variant', () => {
      const eligible = checkActive(true, 'control.v.1.1')
      expect(eligible).toBeFalsy()
    })

    it('returns true if assigned with non-control variant', () => {
      const eligible = checkActive(true, 'rainbowKittens')
      expect(eligible).toBeTruthy()
    })
  })
})
