import { render, fireEvent } from 'test-utils'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'

import { AvatarButton } from './avatar-button'

describe('Avatar', () => {
  const baseProps = {
    size: '123px',
    label: 'view your kitties'
  }

  it('Applies a title attribute to the button if props.label is provided', () => {
    const { getByTitle } = render(<AvatarButton {...baseProps} />)
    expect(getByTitle('view your kitties')).toBeInTheDocument()

    const tree = renderer
    .create(<AvatarButton {...baseProps} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Calls the props.onClick callback when the button is clicked', () => {
    const handleClick = jest.fn()
    const { getByTitle } = render(<AvatarButton {...baseProps} onClick={handleClick} />)
    fireEvent.click(getByTitle('view your kitties'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies a css class name to the button element if props.className is provided', () => {
    const classProps = {
      ...baseProps,
      className: 'pickles'
    }
    const { getByTitle } = render(<AvatarButton {...classProps} />)
    expect(getByTitle('view your kitties')).toHaveClass('pickles')

    const tree = renderer
    .create(<AvatarButton {...classProps} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
