import { once } from './index'
import assert from 'assert'
import sinon from 'sinon'

describe('once', () => {
  it('only runs its wrapped function one time', () => {
    const childFunc = sinon.spy()
    const initChildfunc = once(childFunc)

    initChildfunc()
    initChildfunc()
    initChildfunc()
    initChildfunc()

    assert.equal(childFunc.callCount, 1)
  })
  it('correctly passes arguments to its child function', () => {
    const exampleParam = 42
    const childFunc = sinon.spy()
    const initChildfunc = once(childFunc)

    initChildfunc(42)

    assert(childFunc.calledWith(exampleParam))
  })
})
