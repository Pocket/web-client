import { render, fireEvent } from 'test-utils'
import '@testing-library/jest-dom'

import { AvatarButton } from './avatar-button'

describe('Avatar', () => {
  const baseProps = {
    size: '123px',
    label: 'view your kitties'
  }

  it('Applies a title attribute to the button if props.label is provided', () => {
    const { getByTitle } = render(<AvatarButton {...baseProps} />)
    expect(getByTitle('view your kitties')).toBeInTheDocument()
  })

  it('Calls the props.onClick callback when the button is clicked', () => {
    const handleClick = jest.fn()
    const { getByTitle } = render(<AvatarButton {...baseProps} onClick={handleClick} />)
    fireEvent.click(getByTitle('view your kitties'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies a css class name to the button element if props.className is provided', () => {
    const { getByTitle } = render(<AvatarButton {...baseProps} className="pickles" />)
    expect(getByTitle('view your kitties')).toHaveClass('pickles')
  })
})
