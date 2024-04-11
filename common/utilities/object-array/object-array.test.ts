import { arrayToObject } from './'

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
    const modifiedArrayOfObjects = [
      { intro: 'Power of:' },
      ...arrayOfObjects,
      { outro: 'Powdered Toast Man!' }
    ]
    const keyObjectFromArray = arrayToObject(modifiedArrayOfObjects, 'odd_id_name')
    expect(keyObjectFromArray).toStrictEqual(expectedObjectFromArray)
  })
})
