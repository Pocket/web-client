// Test Utilities
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

// Components
import { ItemShort as Component } from '.'

// Mock Data
import itemsById from '@common/mock-data/in-state/shortsById.json'

// Types
import { Item } from '@common/types'

describe('renders ItemShort', () => {
  it('with defaults', async () => {
    const itemToRender = Object.values(itemsById)[0] as Item

    await act(() => {
      render(<Component item={itemToRender} />)
    })

    const renderedComponent = screen.getByTestId('item-short')
    expect(renderedComponent).toBeInTheDocument()
    expect(renderedComponent).toMatchSnapshot()
  })
})
