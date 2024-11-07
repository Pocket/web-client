// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { localeWrapper as wrapper } from '@config/jest/wrapper'

// Components
import { ItemArticle as Component } from '.'

// Mock Data
import previewData from '@common/mock-data/in-state/previewData.json'

// Types
import { Item } from '@common/types'

describe('renders Item', () => {
  it('with expected data', () => {
    const itemToRender = Object.values(previewData)[0] as Item
    const rendered = render(<Component item={itemToRender} />, { wrapper })
    const renderedComponent = screen.getByTestId('item')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
