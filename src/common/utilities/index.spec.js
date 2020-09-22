import assert from 'assert'

import { urlWithPocketRedirect } from 'common/utilities'
import { getImageCacheUrl } from 'common/utilities'
import { getPublishedDate } from 'common/utilities'
import { numberWithCommas } from 'common/utilities'
import { arrayToObject } from 'common/utilities'
import { domainForUrl } from 'common/utilities'
import { getValueFromCookie } from 'common/utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities'

describe('Utilities', function () {
  describe('urlWithPocketRedirect', function () {
    it('returns a properly formatted pocket redirect url.', function () {
      const url = 'http://www.hasthelargehadroncolliderdestroyedtheworldyet.com'
      const redirect = urlWithPocketRedirect(url)

      assert.equal(
        redirect,
        'https://getpocket.com/redirect?url=http%3A%2F%2Fwww.hasthelargehadroncolliderdestroyedtheworldyet.com'
      )
    })

    it('escapes problematic characters in the original url.', function () {
      const url = 'http://www.example.com?something=wicked&thiswaycomes'
      const redirect = urlWithPocketRedirect(url)

      assert.equal(
        redirect,
        'https://getpocket.com/redirect?url=http%3A%2F%2Fwww.example.com%3Fsomething%3Dwicked%26thiswaycomes'
      )
    })
  })

  describe('getImageCacheUrl', function () {
    it('returns a properly formatted pocket image cache url.', function () {
      const url = 'https://i.picsum.photos/id/10/2500/1667.jpg'
      const imageCache = getImageCacheUrl(url)

      assert.equal(
        imageCache,
        'https://pocket-image-cache.com//filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F10%2F2500%2F1667.jpg'
      )
    })

    it('escapes problematic characters in the original url.', function () {
      const url = 'https://i.picsum.photos/id/1012/3973/2639.jpg?grayscale' //eslint-disable-line
      const redirect = getImageCacheUrl(url)

      assert.equal(
        redirect,
        'https://pocket-image-cache.com//filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1012%2F3973%2F2639.jpg%3Fgrayscale'
      )
    })

    it('sets width and height if they are optionally passed in', function () {
      const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
      const redirect = getImageCacheUrl(url, { width: 400, height: 250 })

      assert.equal(
        redirect,
        'https://pocket-image-cache.com/400x250/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
      )
    })

    it('sets only width if it is optionally passed in', function () {
      const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
      const redirect = getImageCacheUrl(url, { width: 400 })

      assert.equal(
        redirect,
        'https://pocket-image-cache.com/400x/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
      )
    })

    it('sets only height if it is optionally passed in', function () {
      const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
      const redirect = getImageCacheUrl(url, { height: 250 })

      assert.equal(
        redirect,
        'https://pocket-image-cache.com/x250/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
      )
    })
  })

  describe('getPublishedDate', function () {
    it('returns a properly formatted date', function () {
      const timestamp = '4/1/2019'
      const publishedDate = getPublishedDate(timestamp)

      assert.equal(publishedDate, 'April 1, 2019')
    })
  })

  describe('numberWithCommas', function () {
    it('returns a US formatted number with commas', function () {
      const number = numberWithCommas(1000000000000)

      assert.equal(number, '1,000,000,000,000')
    })
  })

  describe('arrayToObject', function () {
    beforeEach(function () {
      this.currentTest.arrayOfObjects = [
        { id: 1, odd_id_name: 1001, title: 'flour' },
        { id: 2, odd_id_name: 1002, title: 'salt' },
        { id: 3, odd_id_name: 1003, title: 'yeast' },
        { id: 4, odd_id_name: 1004, title: 'water' },
        { id: 5, odd_id_name: 1005, title: 'toaster' }
      ]

      this.currentTest.expectedObjectFromArray = {
        1001: { id: 1, odd_id_name: 1001, title: 'flour' },
        1002: { id: 2, odd_id_name: 1002, title: 'salt' },
        1003: { id: 3, odd_id_name: 1003, title: 'yeast' },
        1004: { id: 4, odd_id_name: 1004, title: 'water' },
        1005: { id: 5, odd_id_name: 1005, title: 'toaster' }
      }
    })

    it('returns an object with key/value pairs based on passed in id.', function () {
      const keyObjectFromArray = arrayToObject(
        this.test.arrayOfObjects,
        'odd_id_name'
      )

      assert.deepEqual(keyObjectFromArray, this.test.expectedObjectFromArray)
    })

    it('ignores un-keyed data.', function () {
      const modifiedArrayOfObjects = [
        'Power of:',
        ...this.test.arrayOfObjects,
        'Powdered Toast Man!'
      ]

      const keyObjectFromArray = arrayToObject(
        modifiedArrayOfObjects,
        'odd_id_name'
      )

      assert.deepEqual(keyObjectFromArray, this.test.expectedObjectFromArray)
    })
  })

  describe('domainForUrl', function () {
    it('returns a domain with extra info stripped', function () {
      const domain = domainForUrl(
        'http://www.example.com/extraurl/other?param=12341234&otherParam=nopenope'
      )

      assert.equal(domain, 'example.com')
    })

    it('returns handles https and http', function () {
      const secureDomain = domainForUrl('https://www.example.com')
      const regularDomain = domainForUrl('http://www.example.com')

      assert.equal(secureDomain, 'example.com')
      assert.equal(regularDomain, 'example.com')
    })

    it('returns handles top level domains properly', function () {
      const noTLD = domainForUrl('https://example.com')
      const wwwTLD = domainForUrl('http://www.example.com')
      const altTLD = domainForUrl('http://thegreatestshow.example.com')

      assert.equal(noTLD, 'example.com')
      assert.equal(wwwTLD, 'example.com')
      assert.equal(altTLD, 'thegreatestshow.example.com')
    })

    it('returns false if no url is passed', function () {
      const falseUrl = domainForUrl()

      assert.ok(!falseUrl)
    })
  })

  describe('getValueFromCookie', function () {
    let cookie =
      '_ga=GA1.2.1552524631.1591215754; __gads=ID=576d62229deac15a:T=1586371189:S=ALNI_MYSP8dttIOPF14OUPP9Qrnu0zA5sw; _pubcid=31994e7d-8c5a-4dad-9bfd-8c696a714580; next-i18next=en; sess_guid=c94TqA6fgafh5j13drd216dxaNp4gd5bs7cC5brf17fejrk2a1376z31u33EV916; _gid=GA1.2.40394450.1591627765; _gat=1'

    it('returns a value from the cookie, when the given `key` is present', function () {
      const foundValue = getValueFromCookie('sess_guid', cookie)

      assert.equal(
        foundValue,
        'c94TqA6fgafh5j13drd216dxaNp4gd5bs7cC5brf17fejrk2a1376z31u33EV916'
      )
    })

    it('returns undefined from the cookie, when the given `key` is NOT present', function () {
      const foundValue = getValueFromCookie('nonexistent_key', cookie)

      assert.equal(foundValue, undefined)
    })

    it('returns false when cookie is not provided', function () {
      const foundValue = getValueFromCookie('nonexistent_key', undefined)
      assert.equal(foundValue, false)
    })
  })
})

describe('getObjectWithValidKeysOnly', function () {
  it('strips object keys whose values are undefined or null by default', function () {
    const originalObject = {
      valid: 'hello there',
      invalid1: null,
      invalid2: undefined
    }
    const filteredObject = getObjectWithValidKeysOnly(originalObject) // no specific validator function passed
    assert.deepEqual(filteredObject, {
      valid: 'hello there'
    })
  })

  it('can validate with a custom validator function', function () {
    const originalObject = {
      one: 'https://getpocket.com',
      two: 'https://pocket.com',
      three: 'http://app.getpocket.com'
    }

    const myValidatorFunction = (url) => url === 'https://pocket.com'
    const filteredObject = getObjectWithValidKeysOnly(
      originalObject,
      myValidatorFunction
    )
    assert.deepEqual(filteredObject, { two: 'https://pocket.com' })
  })
})
