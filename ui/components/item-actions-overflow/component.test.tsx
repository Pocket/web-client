// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

// Components
import { ItemActionsOverflow as Component } from '.'

describe('renders ItemActionsMenu', () => {
  it('with defaults', async () => {
    render(<Component id="abc123" />, { wrapper })
    const renderedComponent = await screen.getByTestId('trigger-overflow')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })

  it('when opened', async () => {
    // Setup user for events
    const user = userEvent.setup()

    render(<Component id="abc123" />, { wrapper })
    const overflowTrigger = await screen.getByTestId('trigger-overflow')

    // Click the Trigger
    await user.click(overflowTrigger)

    const menu = screen.getByTestId('overflow-menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toMatchSnapshot()
  })
})
