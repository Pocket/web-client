// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { ItemArticleLayout as Component } from '.'

describe('renders ItemLayouts', () => {
  it('with defaults', () => {
    const rendered = render(<Component layoutType="lockup" />, { wrapper })
    const renderedComponent = screen.getByTestId('item-layout')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
