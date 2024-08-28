// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { SettingTheme as Component } from '.'

describe('renders SettingTheme', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('setting-theme')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
