// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemShort as Component } from '.'

// Mock Data
import itemsById from '@common/mock-data/in-state/shortsById.json'

// Types
import { Item } from '@common/types'

describe('renders ItemShort', () => {
  let rendered

  it('with defaults', () => {
    const itemToRender = Object.values(itemsById)[0] as Item

    rendered = render(<Component item={itemToRender} />)
    const renderedComponent = screen.getByTestId('item-short')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
