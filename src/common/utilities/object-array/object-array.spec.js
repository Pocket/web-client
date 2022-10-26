import { arrayToObject } from 'common/utilities'
import { getObjectWithValidKeysOnly } from 'common/utilities'
import { arraysAreEqual } from 'common/utilities/object-array/object-array'

describe('arrayToObject', () => {
  const arrayOfObjects = [
    { id: 1, odd_id_name: 1001, title: 'flour' },
    { id: 2, odd_id_name: 1002, title: 'salt' },
    { id: 3, odd_id_name: 1003, title: 'yeast' },
    { id: 4, odd_id_name: 1004, title: 'water' },
    { id: 5, odd_id_name: 1005, title: 'toaster' }
  ]

  const expectedObjectFromArray = {
    1001: { id: 1, odd_id_name: 1001, title: 'flour' },
    1002: { id: 2, odd_id_name: 1002, title: 'salt' },
    1003: { id: 3, odd_id_name: 1003, title: 'yeast' },
    1004: { id: 4, odd_id_name: 1004, title: 'water' },
    1005: { id: 5, odd_id_name: 1005, title: 'toaster' }
  }

  it('returns an object with key/value pairs based on passed in id.', () => {
    const keyObjectFromArray = arrayToObject(arrayOfObjects, 'odd_id_name')
    expect(keyObjectFromArray).toStrictEqual(expectedObjectFromArray)
  })

  it('ignores un-keyed data.', () => {
    const modifiedArrayOfObjects = ['Power of:', ...arrayOfObjects, 'Powdered Toast Man!']
    const keyObjectFromArray = arrayToObject(modifiedArrayOfObjects, 'odd_id_name')
    expect(keyObjectFromArray).toStrictEqual(expectedObjectFromArray)
  })
})

describe('getObjectWithValidKeysOnly', () => {
  it('strips object keys whose values are undefined or null by default', () => {
    const originalObject = {
      valid: 'hello there',
      invalid1: null,
      invalid2: undefined
    }
    const filteredObject = getObjectWithValidKeysOnly(originalObject) // no specific validator function passed
    expect(filteredObject).toStrictEqual({
      valid: 'hello there'
    })
  })

  it('can validate with a custom validator function', () => {
    const originalObject = {
      one: 'https://getpocket.com',
      two: 'https://pocket.com',
      three: 'http://app.getpocket.com'
    }

    const myValidatorFunction = (url) => url === 'https://pocket.com'
    const filteredObject = getObjectWithValidKeysOnly(originalObject, myValidatorFunction)
    expect(filteredObject).toStrictEqual({ two: 'https://pocket.com' })
  })
})

describe('arraysAreEqual', () => {
  it('returns false if non-arrays are sent in', () => {
    const nonArrays = arraysAreEqual(1, 4)
    expect(nonArrays).toBeTruthy()
  })

  it('returns false if one of the values are not arrays', () => {
    const secondIsArray = arraysAreEqual(1, [])
    expect(secondIsArray).toBeFalsy()

    const firstIsArray = arraysAreEqual([], undefined)
    expect(firstIsArray).toBeFalsy()
  })

  it('returns false the values are arrays that do not match', () => {
    const unEqualArrays = arraysAreEqual(['horse', 'rider'], [])
    expect(unEqualArrays).toBeFalsy()
  })

  it('returns true if the array has the same values', () => {
    const unEqualArrays = arraysAreEqual(['horse'], ['horse'])
    expect(unEqualArrays).toBeTruthy()
  })

  it('returns false if one array has extra values', () => {
    const unEqualArrays = arraysAreEqual(['horse'], ['horse', 'rider'])
    expect(unEqualArrays).toBeFalsy()
  })
})