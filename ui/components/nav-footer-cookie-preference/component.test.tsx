// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { NavFooterCookiePreference as Component } from '.'

describe('renders NavFooterCookiePreference', () => {
  it('with defaults', async () => {
    const rendered = render(<Component />, { wrapper })
    const renderedComponent = await screen.findByTestId('nav-footer-cookie-preference')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
