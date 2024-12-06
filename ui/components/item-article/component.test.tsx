// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'

import { render, screen } from '@testing-library/react'

// Mock Data
import previewData from '@common/mock-data/in-state/previewData.json'

// Components
import { ItemArticle as Component } from '.'

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
