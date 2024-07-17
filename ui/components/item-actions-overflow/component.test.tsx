// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Components
import { ItemActionsOverflow as Component } from '.'

describe('renders ItemActionsMenu', () => {
  it('with defaults', () => {
    const rendered = render(<Component id="abc123" />)
    const renderedComponent = screen.getByTestId('trigger-overflow')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })

  it('when opened', async () => {
    // Setup user for events
    const user = userEvent.setup()

    render(<Component id="abc123" />)
    const overflowTrigger = screen.getByTestId('trigger-overflow')

    // Click the Trigger
    await act(() => user.click(overflowTrigger))

    const menu = screen.getByTestId('overflow-menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toMatchSnapshot()
  })
})
