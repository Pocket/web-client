import { render, fireEvent } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Button } from './button'

describe('Button', () => {
  it('defaults to a "primary" style', () => {
    const { getByRole } = render(<Button>Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('primary')
  })

  it('applies a "secondary" style if prop variant="secondary"', () => {
    const { getByRole } = render(<Button variant="secondary">Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('secondary')
  })

  it('applies a "brand" style if prop variant="brand"', () => {
    const { getByRole } = render(<Button variant="brand">Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('brand')
  })

  it('applies an "inline" style if prop variant="inline"', () => {
    const { getByRole } = render(<Button variant="inline">Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('inline')
  })

  it('applies a "large" style if prop size="large"', () => {
    const { getByRole } = render(<Button size="large">Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('large')
  })

  it('applies a "small" style if prop size="small"', () => {
    const { getByRole } = render(<Button size="small">Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('small')
  })

  it('applies a "tiny" style if prop size="tiny"', () => {
    const { getByRole } = render(<Button size="tiny">Moar Cats</Button>)
    expect(getByRole('button')).toHaveClass('tiny')
  })

  it('applies a "disabled" style if props.disabled is true', () => {
    const { getByRole } = render(<Button disabled>Moar Cats</Button>)
    expect(getByRole('button')).toBeDisabled('disabled')
  })

  it('returns a button element by default', () => {
    const { getByRole } = render(<Button>Moar Cats</Button>)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('returns a anchor element if an href is provided, using the href value', () => {
    const { getByRole } = render(<Button href="http:/moarcats.com">Moar Cats</Button>)
    const buttonAsLink = getByRole('link')
    expect(buttonAsLink).toHaveAttribute('href', 'http:/moarcats.com')
  })

  it('will call on onClick function like a normal button if I pass one as a prop', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(
      <Button href="http:/moarcats.com" onClick={handleClick}>
        Moar Cats
      </Button>
    )
    const button = getByRole('link')
    // Click button
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })
})
