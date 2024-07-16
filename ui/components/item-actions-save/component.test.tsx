// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { ItemActionsSave as Component } from '.'

describe('renders ItemActionsSave', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('item-actions-save')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
