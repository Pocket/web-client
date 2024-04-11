// Test Utilities
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Components
import { Item as Component } from '.'

describe('renders Item', () => {
  it('with defaults', () => {
    const rendered = render(<Component id="1" />)
    const renderedComponent = screen.getByTestId('item')
    expect(renderedComponent).toBeInTheDocument()
    expect(rendered.container).toMatchSnapshot()
  })
})
