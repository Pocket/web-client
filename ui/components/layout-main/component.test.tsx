// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { LayoutMain as Component } from '.'

describe('renders LayoutMain', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('layout-main')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
