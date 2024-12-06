// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { NavFooterCookiePreference as Component } from '.'

describe('renders NavFooterCookiePreference', () => {
  it('with defaults', () => {
    const rendered = render(<Component />, { wrapper })
    const renderedComponent = screen.getByTestId('nav-footer-cookie-preference')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
