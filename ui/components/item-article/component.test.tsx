// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemArticle as Component } from '.'

// State
import { useItemDisplay } from '@common/state/item-display'

// Mock Data
import itemsById from '@common/mock-data/in-state/itemsById.json'

// Types
import { Item } from '@common/types'

describe('renders Item', () => {
  const initialStoreState = useItemDisplay.getState()
  beforeEach(() => {
    useItemDisplay.setState(initialStoreState, true)
  })

  it('with expected data', () => {
    // Setting up display for items
    useItemDisplay.setState({ itemsById }, true)

    const itemToRender = Object.values(itemsById)[0] as Item
    const rendered = render(<Component id={itemToRender.id} />)
    const renderedComponent = screen.getByTestId('item')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
