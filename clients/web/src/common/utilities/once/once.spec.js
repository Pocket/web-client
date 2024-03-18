import { once } from './once'

describe('once', () => {
  it('only runs its wrapped function one time', () => {
    const testFunction = jest.fn()
    const runChildFunction = once(testFunction)

    runChildFunction()
    runChildFunction()
    runChildFunction()
    runChildFunction()

    expect(testFunction).toBeCalledTimes(1)
  })

  it('correctly passes arguments to its child function', () => {
    const exampleParam = 42
    const testFunction = jest.fn()
    const runChildFunction = once(testFunction)

    runChildFunction(exampleParam)

    expect(testFunction).toBeCalledWith(exampleParam)
  })
})
