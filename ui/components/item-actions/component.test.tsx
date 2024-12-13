// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { ItemActions as Component } from '.'

describe('renders ItemActions', () => {
  it('with defaults', async () => {
    render(<Component id="abc123" />, { wrapper })

    await screen.getByTestId('item-actions')

    expect(screen.getByTestId('item-actions')).toBeInTheDocument()
    expect(screen.getByTestId('item-actions')).toMatchSnapshot()
  })
})
