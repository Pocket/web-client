// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { NavTopSearch as Component } from '.'

describe('renders NavTopSearch', () => {
  it('with defaults', () => {
    const rendered = render(<Component />, { wrapper })
    const renderedComponent = screen.getByTestId('nav-top-search')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
