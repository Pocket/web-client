// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemVideo as Component } from '.'

// State
import { useItemDisplay } from '@common/state/item-display'

// Mock Data
import itemsById from '@common/mock-data/in-state/videosById.json'

// Types
import { Item } from '@common/types'

describe('renders ItemSound', () => {
  const initialStoreState = useItemDisplay.getState()
  beforeEach(() => {
    useItemDisplay.setState(initialStoreState, true)
  })

  it('with defaults', () => {
    useItemDisplay.setState({ itemsById }, true)

    const itemToRender = Object.values(itemsById)[0] as Item
    const rendered = render(<Component id={itemToRender.id} />)
    const renderedComponent = screen.getByTestId('item-short')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
