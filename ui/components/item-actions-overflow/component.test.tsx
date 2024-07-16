// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

// Components
import { ItemActionsOverflow as Component } from '.'

describe('renders ItemActionsMenu', () => {
  it('with defaults', () => {
    const rendered = render(<Component />)
    const renderedComponent = screen.getByTestId('item-actions-menu')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
