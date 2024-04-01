// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { NavTopAccountAuth as Component } from '.'

describe('renders NavTopAccountAuth', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('nav-top-account-auth')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
