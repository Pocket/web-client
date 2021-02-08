import assert from 'assert'
import { mockEvent } from './test-utilities'

describe('mockEvent', () => {
  it('provides an object with common default event properties', () => {
    assert(typeof mockEvent.target === 'object')
    assert(typeof mockEvent.preventDefault === 'function')
    assert(typeof mockEvent.stopPropagation === 'function')
  })
})
