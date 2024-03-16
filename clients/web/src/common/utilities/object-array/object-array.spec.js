import { arrayToObject } from 'common/utilities/object-array/object-array'
import { getObjectWithValidKeysOnly } from 'common/utilities/object-array/object-array'
import { arraysAreEqual } from 'common/utilities/object-array/object-array'
import { existsInArray } from 'common/utilities/object-array/object-array'
import { reorderArray } from 'common/utilities/object-array/object-array'

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
    expect(nonArrays).toBeFalsy()
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

describe('existsInArray', () => {
  const stringArray = ['one', 'two', 'three', 'four']

  it('returns false if non-array is passed in', () => {
    const nonArray = existsInArray(42, 'two')
    expect(nonArray).toBeFalsy()
  })

  it('returns false if value passed in is null or undefined', () => {
    const nonArray = existsInArray(stringArray)
    expect(nonArray).toBeFalsy()
  })

  it(`returns false if the value doesn't exist in the array`, () => {
    const unEqualArrays = existsInArray(stringArray, 'cheese')
    expect(unEqualArrays).toBeFalsy()
  })

  it('returns true if the value exists in the array (cases match)', () => {
    const unEqualArrays = existsInArray(stringArray, 'two')
    expect(unEqualArrays).toBeTruthy()
  })

  it(`returns true if the value exists in the array (cases don't match)`, () => {
    const unEqualArrays = existsInArray(stringArray, 'TWO')
    expect(unEqualArrays).toBeTruthy()
  })
})

describe('reorderArray', () => {
  const startingList = ['a', 'b', 'c', 'd']

  it('should reorder the given list when startIndex is less than endIndex', () => {
    const startIndex = 1
    const endIndex = 3
    const expected = ['a', 'c', 'd', 'b']

    const result = reorderArray(startingList, startIndex, endIndex)

    expect(result).toEqual(expected)
  })

  it('should reorder the given list when startIndex is greater than endIndex', () => {
    const startIndex = 3
    const endIndex = 1
    const expected = ['a', 'd', 'b', 'c']

    const result = reorderArray(startingList, startIndex, endIndex)

    expect(result).toEqual(expected)
  })

  it('should not modify the given list when startIndex and endIndex are equal', () => {
    const startIndex = 2
    const endIndex = 2

    const result = reorderArray(startingList, startIndex, endIndex)

    expect(result).toEqual(startingList)
  })

  it('should not modify the given list when startIndex or endIndex are out of bounds', () => {
    const startIndex = -1
    const endIndex = 4

    const result = reorderArray(startingList, startIndex, endIndex)

    expect(result).toEqual(startingList)
  })
})
