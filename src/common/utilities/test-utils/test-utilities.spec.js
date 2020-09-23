import assert from 'assert'
import { testIdAttribute, testIdSelector, mockEvent } from './test-utilities'

describe('testIdAttribute()', () => {
  it('returns an object with property "data-test-id" with correct value in the "test" environment', () => {
    // the default process.env.NODE_ENV value while running unit tests is "test"
    const result = testIdAttribute('my-id')

    assert.equal(result['data-test-id'], 'my-id')
  })

  it('returns an object with property "data-test-id" with correct value in dev tools environments', () => {
    const curDevToolsFlag = process.env.SHOW_DEV

    // set SHOW_DEV flag to "included" to indicate dev tools environment
    process.env.SHOW_DEV = 'included'
    const result = testIdAttribute('my-id')

    assert.equal(result['data-test-id'], 'my-id')
    process.env.SHOW_DEV = curDevToolsFlag
  })

  it('returns undefined if the environment is not a testing or dev environment', () => {
    // keep track of the current env value so we can reset after the test
    const curEnv = process.env.NODE_ENV

    process.env.NODE_ENV = 'not-test'
    process.env.SHOW_DEV = ''
    const result = testIdAttribute('my-id')

    assert.equal(result, undefined)
    process.env.NODE_ENV = curEnv
  })
})

describe('testIdSelector()', () => {
  it('returns a string with a DOM selector to find the corresponding data-test-id attribute', () => {
    const result = testIdSelector('my-id')

    assert.equal(result, '[data-test-id="my-id"]')
  })

  it('inserts a search qualifier into the data attribute if one is provided', () => {
    const result = testIdSelector('my-id', '*')

    assert.equal(result, '[data-test-id*="my-id"]')
  })

  it('throws an error if an invalid qualifier is provided', () => {
    assert.throws(() => {
      testIdSelector('my-id', '#')
    })
  })
})

describe('mockEvent', () => {
  it('provides an object with common default event properties', () => {
    assert(typeof mockEvent.target === 'object')
    assert(typeof mockEvent.preventDefault === 'function')
    assert(typeof mockEvent.stopPropagation === 'function')
  })
})
