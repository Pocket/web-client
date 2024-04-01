// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { NavTop as Component } from '.'

describe('renders NavTop', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('nav-top')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
