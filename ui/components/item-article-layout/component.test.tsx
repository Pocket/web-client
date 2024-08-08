// Test Utilities
import { render, screen } from '@config/jest'
import '@testing-library/jest-dom'

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
