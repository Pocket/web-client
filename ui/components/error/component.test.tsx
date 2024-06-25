// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { Error as Component } from '.'

describe('renders Error', () => {
  it('with defaults', () => {
    const rendered = render(<Component/>)
    const renderedComponent = screen.getByTestId('error')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
