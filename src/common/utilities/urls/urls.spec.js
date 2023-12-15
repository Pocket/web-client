import { urlWithPocketRedirect } from './urls'
import { getImageCacheUrl } from './urls'
import { domainForUrl } from './urls'
import { getTopLevelPath } from './urls'
import { replaceUTM } from './urls'
import { isValidHttpUrl } from './urls'

describe('urlWithPocketRedirect', () => {
  it('returns a properly formatted pocket redirect url.', () => {
    const url = 'http://www.hasthelargehadroncolliderdestroyedtheworldyet.com'
    const redirect = urlWithPocketRedirect(url)

    expect(redirect).toBe(
      'https://getpocket.com/redirect?url=http%3A%2F%2Fwww.hasthelargehadroncolliderdestroyedtheworldyet.com'
    )
  })

  it('escapes problematic characters in the original url.', () => {
    const url = 'http://www.example.com?something=wicked&thiswaycomes'
    const redirect = urlWithPocketRedirect(url)

    expect(redirect).toBe(
      'https://getpocket.com/redirect?url=http%3A%2F%2Fwww.example.com%3Fsomething%3Dwicked%26thiswaycomes'
    )
  })
})

describe('getImageCacheUrl', () => {
  it('returns a properly formatted pocket image cache url.', () => {
    const url = 'https://i.picsum.photos/id/10/2500/1667.jpg'
    const imageCache = getImageCacheUrl(url)

    expect(imageCache).toBe(
      'https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F10%2F2500%2F1667.jpg'
    )
  })

  it('escapes problematic characters in the original url.', () => {
    const url = 'https://i.picsum.photos/id/1012/3973/2639.jpg?grayscale' //eslint-disable-line
    const redirect = getImageCacheUrl(url)

    expect(redirect).toBe(
      'https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1012%2F3973%2F2639.jpg%3Fgrayscale'
    )
  })

  it('sets width and height if they are optionally passed in', () => {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { width: 400, height: 250 })

    expect(redirect).toBe(
      'https://pocket-image-cache.com/400x250/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('sets only width if it is optionally passed in', () => {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { width: 400 })

    expect(redirect).toBe(
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('sets only height if it is optionally passed in', () => {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { height: 250 })

    expect(redirect).toBe(
      'https://pocket-image-cache.com/x250/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('sets the format if it is optionally passed in', () => {
    const url = 'https://i.picsum.photos/id/1015/6000/4000.jpg'
    const redirect = getImageCacheUrl(url, { height: 250 }, 'png')

    expect(redirect).toBe(
      'https://pocket-image-cache.com/x250/filters:format(png):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('does not encode the image if it has been encoded already', () => {
    const url =
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    const redirect = getImageCacheUrl(url)

    expect(redirect).toBe(
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('updates optional params of an already encoded image', () => {
    const url =
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    const redirect = getImageCacheUrl(url, { height: 500 }, 'png')

    expect(redirect).toBe(
      'https://pocket-image-cache.com/x500/filters:format(png):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('does not add extra dimensions from previously encoded images', () => {
    const url =
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    const redirect = getImageCacheUrl(url, { height: 600 }, 'png')

    expect(redirect).toBe(
      'https://pocket-image-cache.com/x600/filters:format(png):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('does does not use dimensions if none exist or are passed in', () => {
    const url =
      'https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    const redirect = getImageCacheUrl(url)

    expect(redirect).toBe(
      'https://pocket-image-cache.com//filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })

  it('does preserves dimensions from previously encoded images if no image size is passed in', () => {
    const url =
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    const redirect = getImageCacheUrl(url)

    expect(redirect).toBe(
      'https://pocket-image-cache.com/400x/filters:format(jpg):extract_focal()/https%3A%2F%2Fi.picsum.photos%2Fid%2F1015%2F6000%2F4000.jpg'
    )
  })
})

describe('domainForUrl', () => {
  it('returns a domain with extra info stripped', () => {
    const domain = domainForUrl(
      'http://www.example.com/extraurl/other?param=12341234&otherParam=nopenope'
    )
    expect(domain).toBe('example.com')
  })

  it('returns handles https and http', () => {
    const secureDomain = domainForUrl('https://www.example.com')
    const regularDomain = domainForUrl('http://www.example.com')

    expect(secureDomain).toBe('example.com')
    expect(regularDomain).toBe('example.com')
  })

  it('returns handles top level domains properly', () => {
    const noTLD = domainForUrl('https://example.com')
    const wwwTLD = domainForUrl('http://www.example.com')
    const altTLD = domainForUrl('http://thegreatestshow.example.com')

    expect(noTLD).toBe('example.com')
    expect(wwwTLD).toBe('example.com')
    expect(altTLD).toBe('thegreatestshow.example.com')
  })

  it('returns false if no url is passed', () => {
    const falseUrl = domainForUrl()
    expect(falseUrl).toBeFalsy()
  })
})

describe('getTopLevelPath', () => {
  it('returns top level path regardless of depth', () => {
    expect(getTopLevelPath('/discover/syndicated-article')).toBe('discover')
    expect(getTopLevelPath('/discover/topic')).toBe('discover')
    expect(getTopLevelPath('/')).toBe('')
  })
})

describe('replaceUTM', () => {
  const url = 'http://www.isithalloweenyet.com/?candy=no&utm_source=isitchristmas&utm_campaign=jacks+takeover' //prettier-ignore
  const craigslist =
    'https://monterey.craigslist.org/grd/d/king-city-doe-boer-goats/7340745902.html'
  it('should strip out utm codes without crushing other query params', () => {
    expect(replaceUTM(url)).toBe('http://www.isithalloweenyet.com/?candy=no')
  })

  it('should add utm source if passed', () => {
    expect(replaceUTM(url, 'pocket')).toBe(
      'http://www.isithalloweenyet.com/?candy=no&utm_source=pocket'
    )
  })

  it('should leave craigslist alone', () => {
    expect(replaceUTM(craigslist, 'pocket')).toBe(craigslist)
  })
})

describe('isValidHttpUrl', () => {
  it('should return true when passed a valid url', () => {
    expect(isValidHttpUrl('https://getpocket.com')).toBe(true)
  })

  it('should return false if url is passed without http/https', () => {
    expect(isValidHttpUrl('www.getpocket.com')).toBeFalsy()
  })

  it('should return false if a non url is passed', () => {
    expect(isValidHttpUrl('💪')).toBeFalsy()
  })

  it('should return false if no url is passed', () => {
    expect(isValidHttpUrl()).toBeFalsy()
  })
})
