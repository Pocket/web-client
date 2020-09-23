import assert from 'assert'
import { getValueFromCookie } from 'common/utilities'

describe('getValueFromCookie', function () {
  let cookie =
    '_ga=GA1.2.1552524631.1591215754; __gads=ID=576d62229deac15a:T=1586371189:S=ALNI_MYSP8dttIOPF14OUPP9Qrnu0zA5sw; _pubcid=31994e7d-8c5a-4dad-9bfd-8c696a714580; next-i18next=en; sess_guid=c94TqA6fgafh5j13drd216dxaNp4gd5bs7cC5brf17fejrk2a1376z31u33EV916; _gid=GA1.2.40394450.1591627765; _gat=1'

  it('returns a value from the cookie, when the given `key` is present', function () {
    const foundValue = getValueFromCookie('sess_guid', cookie)

    assert.strictEqual(
      foundValue,
      'c94TqA6fgafh5j13drd216dxaNp4gd5bs7cC5brf17fejrk2a1376z31u33EV916'
    )
  })

  it('returns undefined from the cookie, when the given `key` is NOT present', function () {
    const foundValue = getValueFromCookie('nonexistent_key', cookie)

    assert.strictEqual(foundValue, undefined)
  })

  it('returns false when cookie is not provided', function () {
    const foundValue = getValueFromCookie('nonexistent_key', undefined)
    assert.strictEqual(foundValue, false)
  })
})
