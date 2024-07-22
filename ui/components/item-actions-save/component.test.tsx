// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Components
import { ItemActionsSave as Component } from '.'

describe('renders ItemActionsSave', () => {
  it('with defaults', () => {
    const rendered = render(<Component id="abc123" />)
    const renderedComponent = screen.getByTestId('trigger-save')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })

  it('with actions', async () => {
    // Setup user for events
    const user = userEvent.setup()

    render(<Component id="abc123" />)
    const saveTrigger = screen.getByTestId('trigger-save')
    expect(saveTrigger).toBeInTheDocument()

    // Click the Trigger
    await act(() => user.click(saveTrigger))

    const menu = screen.getByTestId('save-menu')
    expect(menu).toBeInTheDocument()

    // Let's make sure the buttons have reset
    const savedTrigger = screen.queryByTestId('trigger-saved')
    const modifiedSaveButton = screen.queryByTestId('trigger-save')
    expect(savedTrigger).toBeInTheDocument()
    expect(modifiedSaveButton).not.toBeInTheDocument()
  })

  //save-menu-action-category
})
