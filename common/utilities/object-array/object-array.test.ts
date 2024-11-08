import { arrayToObject } from './'

describe('arrayToObject', () => {
  it('converts an array of objects to an object using the specified key', () => {
    const arrayOfObjects = [
      { id: 1, odd_id_name: 1001, title: 'flour' },
      { id: 2, odd_id_name: 1002, title: 'salt' },
      { id: 3, odd_id_name: 1003, title: 'yeast' }
    ]

    const result = arrayToObject(arrayOfObjects, 'odd_id_name')
    expect(result).toStrictEqual({
      '1001': { id: 1, odd_id_name: 1001, title: 'flour' },
      '1002': { id: 2, odd_id_name: 1002, title: 'salt' },
      '1003': { id: 3, odd_id_name: 1003, title: 'yeast' }
    })
  })

  it('skips objects that are missing the specified key', () => {
    const arrayOfObjects = [
      { id: 1, odd_id_name: 1001, title: 'flour' },
      { id: 2, title: 'salt' }, // Missing 'odd_id_name'
      { id: 3, odd_id_name: 1003, title: 'yeast' }
    ]

    const result = arrayToObject(arrayOfObjects, 'odd_id_name')
    expect(result).toStrictEqual({
      '1001': { id: 1, odd_id_name: 1001, title: 'flour' },
      '1003': { id: 3, odd_id_name: 1003, title: 'yeast' }
    })
  })

  it('skips objects with non-string/number values for the specified key', () => {
    const arrayOfObjects = [
      { id: 1, odd_id_name: 1001, title: 'flour' },
      { id: 2, odd_id_name: null, title: 'salt' }, // Invalid key type
      { id: 3, odd_id_name: 1003, title: 'yeast' }
    ]

    const result = arrayToObject(arrayOfObjects, 'odd_id_name')
    expect(result).toStrictEqual({
      '1001': { id: 1, odd_id_name: 1001, title: 'flour' },
      '1003': { id: 3, odd_id_name: 1003, title: 'yeast' }
    })
  })

  it('returns an empty object when given an empty array', () => {
    const result = arrayToObject([], 'odd_id_name')
    expect(result).toStrictEqual({})
  })

  it('returns an empty object if none of the items have the specified key', () => {
    const arrayOfObjects: Record<string, unknown>[] = [
      { id: 1, title: 'flour' },
      { id: 2, title: 'salt' },
      { id: 3, title: 'yeast' }
    ]

    const result = arrayToObject(arrayOfObjects, 'odd_id_name')
    expect(result).toStrictEqual({})
  })
})
