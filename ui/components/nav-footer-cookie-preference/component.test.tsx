// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

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
