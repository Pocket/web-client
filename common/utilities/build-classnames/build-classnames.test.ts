import { buildClassnames } from '.'

describe('buildClassnames function', () => {
  it('should return a single value if that is all that‘s provided', () => {
    const classNames = buildClassnames(['something'])
    expect(classNames).toBe('something')
  })

  it('should omit falsy values', () => {
    const classNames = buildClassnames(['something', null, false, false && 'bar', undefined, 0, ''])
    expect(classNames).toBe('something')
  })
  it('should ignore truthy values that don‘t make sense', () => {
    const classNames = buildClassnames(['something', true, 1, 'wicked'])
    expect(classNames).toBe('something wicked')
  })

  it('should ignore empty strings', () => {
    const classNames = buildClassnames([
      'something',
      '',
      'wicked',
      ' ',
      'this   ',
      '   way',
      '    ',
      'comes'
    ])
    expect(classNames).toBe('something wicked this way comes')
  })

  it('should handle conditionals', () => {
    const isNice = false
    const isOnItsWay = true
    const classNames = buildClassnames([
      'something',
      isNice && 'nice',
      'wicked',
      false ? 'cake' : null,
      isOnItsWay && 'comes'
    ])

    expect(classNames).toBe('something wicked comes')
  })
})
