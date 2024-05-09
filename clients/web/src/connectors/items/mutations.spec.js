import { itemSelector, itemDeselector } from './mutations-bulk.state'

const arrayOfItems = [1, 2, 3, 4, 5, 6]

describe('Bulk Mutations - Select Items', () => {
  it('should select a single item', () => {
    const selected = itemSelector(2, false, [], arrayOfItems)

    expect(selected.length).toBe(1)
    expect(selected[0]).toBe(2)
  })

  it('should add a selected id to the passed array', () => {
    const selected = itemSelector(3, false, [2], arrayOfItems)
    expect(selected.length).toBe(2)
    expect(selected[0]).toBe(2)
    expect(selected[1]).toBe(3)
  })

  it('should add a range of items when shift is used', () => {
    const selected = itemSelector(4, 2, [2], arrayOfItems)
    expect(selected.length).toBe(3)
    expect(selected[0]).toBe(2)
    expect(selected[1]).toBe(3)
    expect(selected[2]).toBe(4)
  })

  it('should select backwards', () => {
    const selected = itemSelector(1, 4, [4], arrayOfItems)
    expect(selected.length).toBe(4)
    expect(selected[0]).toBe(1)
    expect(selected[1]).toBe(2)
    expect(selected[2]).toBe(3)
    expect(selected[3]).toBe(4)
  })

  it('should maintain gaps in single selections', () => {
    const selected = itemSelector(4, false, [2], arrayOfItems)
    expect(selected.length).toBe(2)
    expect(selected[0]).toBe(2)
    expect(selected[1]).toBe(4)
  })

  it('should close gaps in selections that span deselected', () => {
    const selected = itemSelector(4, 1, [1, 3], arrayOfItems)
    expect(selected.length).toBe(4)
    expect(selected[0]).toBe(1)
    expect(selected[1]).toBe(2)
    expect(selected[2]).toBe(3)
    expect(selected[3]).toBe(4)
  })

  it('should maintain gaps in selections that do not span deselected', () => {
    const selected = itemSelector(4, 3, [1, 3], arrayOfItems)
    expect(selected.length).toBe(3)
    expect(selected[0]).toBe(1)
    expect(selected[1]).toBe(3)
    expect(selected[2]).toBe(4)
  })

  it('should maintain original order in our of order selections', () => {
    const selected = itemSelector(2, false, [1, 4], arrayOfItems)
    expect(selected.length).toBe(3)
    expect(selected[0]).toBe(1)
    expect(selected[1]).toBe(2)
    expect(selected[2]).toBe(4)
  })
})

describe('Bulk Mutations - De-Select Items', () => {
  it('should de-select a single item', () => {
    const selected = itemDeselector(2, false, [1, 2, 3], arrayOfItems)

    expect(selected.length).toBe(2)
    expect(selected[0]).toBe(1)
    expect(selected[1]).toBe(3)
  })

  it('should de-select a range of items', () => {
    const selected = itemDeselector(2, 1, [1, 2, 3], arrayOfItems)

    expect(selected.length).toBe(1)
    expect(selected[0]).toBe(3)
  })

  it('should maintain gaps in that are not spanned in deselection', () => {
    const selected = itemDeselector(2, 1, [1, 2, 4, 6], arrayOfItems)

    expect(selected.length).toBe(2)
    expect(selected[0]).toBe(4)
    expect(selected[1]).toBe(6)
  })

  it('should not select items in gaps during deselection', () => {
    const selected = itemDeselector(2, 6, [1, 2, 4, 6], arrayOfItems)

    expect(selected.length).toBe(1)
    expect(selected[0]).toBe(1)
  })
})
