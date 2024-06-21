// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { NavFooterTheme as Component } from '.'

describe('renders NavFooterTheme', () => {
  it('with defaults', () => {
    const rendered = render(<Component/>)
    const renderedComponent = screen.getByTestId('nav-footer-theme')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
