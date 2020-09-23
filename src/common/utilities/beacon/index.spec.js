import assert from 'assert'

import { buildBeaconUrl } from './index'

describe('beacon', () => {
  describe('buildBeaconUrl', () => {
    it('build a url with proper query params', () => {
      const options = {
        path: '/pv',
        data: { soda: ['Dr Pepper', 'Coca Cola', 'Fanta'], size: 'x-large' },
      }
      const url = buildBeaconUrl('abcd1234', options)

      assert.equal(
        url,
        'https://getpocket.com/v3/pv?consumer_key=abcd1234&size=x-large&soda[]=Dr%20Pepper&soda[]=Coca%20Cola&soda[]=Fanta'
      )
    })
  })
})
