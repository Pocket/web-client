// Test Utilities
import '@testing-library/jest-dom'
import { localeWrapper as wrapper } from '@config/jest/wrapper'
import { render, screen } from '@testing-library/react'

// Components
import { ItemActions as Component } from '.'

describe('renders ItemActions', () => {
  it('with defaults', () => {
    const rendered = render(<Component id="abc123" />, { wrapper })
    const renderedComponent = screen.getByTestId('item-actions')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
