// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { ItemArticleLayout as Component } from '.'

describe('renders ItemLayouts', () => {
  it('with defaults', () => {
    const rendered = render(<Component layoutType="lockup" />)
    const renderedComponent = screen.getByTestId('item-layout')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
