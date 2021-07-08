import { render } from 'test-utils'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'

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
    const { queryByCy } = render(<Avatar {...baseProps} />)
    expect(queryByCy('avatar-default-')).toBeInTheDocument()

    const tree = renderer
    .create(<Avatar {...baseProps} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders an image tag with src if props.src is provided', () => {
    const { getByRole } = render(<Avatar {...propsForImage} />)
    expect(getByRole('img')).toHaveAttribute('src', 'http://placekitten.com/150/150')

    const tree = renderer
    .create(<Avatar {...propsForImage} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
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
