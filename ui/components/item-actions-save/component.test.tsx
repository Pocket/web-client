// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

// Components
import { ItemActionsSave as Component } from '.'

describe('renders ItemActionsSave', () => {
  it('with defaults', async () => {
    render(<Component id="abc123" />, { wrapper })
    const renderedComponent = await screen.findByTestId('trigger-save')

    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })

  it('with actions', async () => {
    render(<Component id="abc123" />, { wrapper })
    const saveTrigger = await screen.findByTestId('trigger-save')

    expect(saveTrigger).toBeInTheDocument()

    // Click the Trigger
    await userEvent.click(saveTrigger)

    const menu = await screen.findByTestId('save-menu')
    expect(menu).toBeInTheDocument()

    // Let's make sure the buttons have reset
    const savedTrigger = screen.queryByTestId('trigger-saved')
    const modifiedSaveButton = screen.queryByTestId('trigger-save')
    expect(savedTrigger).toBeInTheDocument()
    expect(modifiedSaveButton).not.toBeInTheDocument()
  })

  //save-menu-action-category
})
