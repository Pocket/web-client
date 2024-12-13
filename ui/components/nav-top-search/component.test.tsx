// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { NavTopSearch as Component } from '.'

describe('renders NavTopSearch', () => {
  it('with defaults', async () => {
    const rendered = await render(<Component />, { wrapper })
    const renderedComponent = await screen.findByTestId('nav-top-search')

    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
