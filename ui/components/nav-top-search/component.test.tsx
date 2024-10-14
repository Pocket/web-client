// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

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
