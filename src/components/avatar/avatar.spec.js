import { render } from '@config/jest'
import '@testing-library/jest-dom'

import Avatar from './avatar'

describe('Avatar', () => {
  const baseProps = {
    size: '123px'
  }

  const propsForImage = {
    src: 'http://placekitten.com/150/150',
    altText: 'kitties!',
    className: 'tiger-stripes'
  }

  it('Sets the width & height styles of the avatar element to the size provided', () => {
    const { container } = render(<Avatar {...baseProps} />)
    expect(container.firstChild).toHaveStyle('width: 123px; height: 123px')
  })

  it('Renders a default icon if props.src isn’t provided', () => {
    const { queryByTestId } = render(<Avatar {...baseProps} />)
    expect(queryByTestId('avatar-default-')).toBeInTheDocument()
  })

  it('Renders an image tag with src if props.src is provided', () => {
    const { getByRole } = render(<Avatar {...propsForImage} />)
    expect(getByRole('img')).toHaveAttribute('src', 'http://placekitten.com/150/150')
  })

  it('Includes alt text on the image tag if props.altText is provided', () => {
    const { getByRole } = render(<Avatar {...propsForImage} />)
    expect(getByRole('img')).toHaveAttribute('alt', 'kitties!')
  })

  it('applies a css class name to the outer node if props.className is provided', () => {
    const { container } = render(<Avatar {...propsForImage} />)
    expect(container.firstChild).toHaveClass('tiger-stripes')
  })
})
