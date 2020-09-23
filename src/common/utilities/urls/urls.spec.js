import assert from 'assert'

import { urlWithPocketRedirect } from 'common/utilities'
import { getImageCacheUrl } from 'common/utilities'
import { domainForUrl } from 'common/utilities'
import { getTopLevelPath } from 'common/utilities'

describe('urlWithPocketRedirect', function () {
  it('returns a properly formatted pocket redirect url.', function () {
    const url = 'http://www.hasthelargehadroncolliderdestroyedtheworldyet.com'
    const redirect = urlWithPocketRedirect(url)

    assert.strictEqual(
      redirect,
      'https://getpocket.com/redirect?url=http%3A%2F%2Fwww.hasthelargehadroncolliderdestroyedtheworldyet.com'
    )
  })

  it('escapes problematic characters in the original url.', function () {
    const url = 'http://www.example.com?something=wicked&thiswaycomes'
    const redirect = urlWithPocketRedirect(url)

    assert.strictEqual(
      redirect,
      'https://getpocket.com/redirect?url=http%3A%2F%2Fwww.example.com%3Fsomething%3Dwicked%26thiswaycomes'
    )
  })
})

describe('getImageCacheUrl', function () {
  it('returns a properly formatted pocket image cache url.', function () {
    const url = 'https://i.picsum.photos/id/10/2500/1667.jpg'
    const imageCache = getImageCacheUrl(url)

    assert.strictEqual(
      imageCache,
      'https://pocket-image-cache.com//filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F10%2F2500%2F1667.jpg'
    )
  })

  it('escapes problematic characters in the original url.', function () {
    const url = 'https://i.picsum.photos/id/1012/3973/2639.jpg?grayscale' //eslint-disable-line
    const redirect = getImageCacheUrl(url)

    assert.strictEqual(
      redirect,
      'https://pocket-image-cache.com//filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1012%2F3973%2F2639.jpg%3Fgrayscale'
    )
  })

  it('sets width and height if they are optionally passed in', function () {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { width: 400, height: 250 })

    assert.strictEqual(
      redirect,
      'https://pocket-image-cache.com/400x250/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('sets only width if it is optionally passed in', function () {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { width: 400 })

    assert.strictEqual(
      redirect,
      'https://pocket-image-cache.com/400x/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('sets only height if it is optionally passed in', function () {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { height: 250 })

    assert.strictEqual(
      redirect,
      'https://pocket-image-cache.com/x250/filters:no_upscale():format(jpg):extract_cover()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })
})

describe('domainForUrl', function () {
  it('returns a domain with extra info stripped', function () {
    const domain = domainForUrl(
      'http://www.example.com/extraurl/other?param=12341234&otherParam=nopenope'
    )

    assert.strictEqual(domain, 'example.com')
  })

  it('returns handles https and http', function () {
    const secureDomain = domainForUrl('https://www.example.com')
    const regularDomain = domainForUrl('http://www.example.com')

    assert.strictEqual(secureDomain, 'example.com')
    assert.strictEqual(regularDomain, 'example.com')
  })

  it('returns handles top level domains properly', function () {
    const noTLD = domainForUrl('https://example.com')
    const wwwTLD = domainForUrl('http://www.example.com')
    const altTLD = domainForUrl('http://thegreatestshow.example.com')

    assert.strictEqual(noTLD, 'example.com')
    assert.strictEqual(wwwTLD, 'example.com')
    assert.strictEqual(altTLD, 'thegreatestshow.example.com')
  })

  it('returns false if no url is passed', function () {
    const falseUrl = domainForUrl()

    assert.ok(!falseUrl)
  })
})

describe('getTopLevelPath()', function () {
  it('returns top level path regardless of depth', () => {
    assert.equal(getTopLevelPath('/discover/syndicated-article'), 'discover')
    assert.equal(getTopLevelPath('/discover/topic'), 'discover')
    assert.equal(getTopLevelPath('/'), '')
  })
})
