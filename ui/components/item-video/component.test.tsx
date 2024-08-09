// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemVideo as Component } from '.'

// Mock Data
import itemsById from '@common/mock-data/in-state/videosById.json'

// Types
import { Item } from '@common/types'

describe('renders ItemVideo', () => {
  it('with defaults', () => {
    const itemToRender = Object.values(itemsById)[0] as Item
    const rendered = render(<Component item={itemToRender} />)
    const renderedComponent = screen.getByTestId('item-video')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
